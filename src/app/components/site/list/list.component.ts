import { Component, OnInit } from "@angular/core";
import "style-loader!leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { ILocation } from "src/app/interfaces/location.interface";
import { FormBuilder } from "@angular/forms";
import { ICluster } from "src/app/interfaces/cluster.interface";

interface Dropdown {
  value: number;
  text: string;
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  filterForm;
  layerGroup: L.LayerGroup;
  locationId: string;
  month: number;
  months: Dropdown[];
  year: number;
  years: Dropdown[];
  map: L.Map;
  marker: L.Marker;
  location: ILocation;
  clusters: ICluster[];
  limit: number = 20;
  page: number = 1;
  totalPages: number = 0;
  totalCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.filterForm = this.formBuilder.group({
      filterMonth: "",
      filterYear: "",
    });

    this.locationId = this.route.snapshot.paramMap.get("location_id");
    this.month = +this.route.snapshot.paramMap.get("month");
    this.year = +this.route.snapshot.paramMap.get("year");

    this.clusters = [];
    this.months = [
      { value: 1, text: "January" },
      { value: 2, text: "February" },
      { value: 3, text: "March" },
      { value: 4, text: "April" },
      { value: 5, text: "May" },
      { value: 6, text: "June" },
      { value: 7, text: "July" },
      { value: 8, text: "August" },
      { value: 9, text: "September" },
      { value: 10, text: "October" },
      { value: 11, text: "November" },
      { value: 12, text: "December" },
    ];
    this.years = [];

    for (let i = 2014; i <= new Date().getFullYear(); i++) {
      this.years.push({ text: i.toString(), value: i });
    }
  }

  async ngOnInit() {
    await this.getLocation(this.locationId);
    await this.getClusters(
      this.locationId,
      this.month,
      this.year,
      this.limit,
      this.page
    );
    await this.markRestaurants(this.clusters);
  }

  async getLocation(location_id: string) {
    try {
      const response = await this.apiService.getLocationById(location_id);

      this.location = {
        name: response.name,
        location_id: response.location_id,
        latitude: response.latitude,
        longitude: response.longitude,
      };

      await this.initMap(this.location.latitude, this.location.longitude);
    } catch (error) {
      console.log(error);
    }
  }

  async initMap(latitude: number, longitude: number) {
    this.map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
    });

    const tiles = await L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution: "Kawulo Map",
      }
    );

    await tiles.addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
  }

  async getClusters(
    location_id: string,
    month: number,
    year: number,
    limit: number,
    page: number
  ) {
    try {
      const response = await this.apiService.getRestaurantClusters(
        location_id,
        month,
        year,
        limit,
        page
      );

      this.clusters = response.pages.active.map((d) => d);
      this.page = page;
      this.totalPages = response.total_pages;
      this.totalCount = response.total_count;
    } catch (err) {
      console.log(err);
    }
  }

  async markRestaurants(clusters: ICluster[]) {
    this.layerGroup.clearLayers();
    this.layerGroup = L.layerGroup().addTo(this.map);

    const icons = [
      "../../../assets/images/marker/restaurant-marker-red.png",
      "../../../assets/images/marker/restaurant-marker-yellow.png",
      "../../../assets/images/marker/restaurant-marker-blue.png",
    ];

    clusters.map((c) => {
      this.marker = new L.Marker(
        [+c.restaurant.latitude, +c.restaurant.longitude],
        {
          title: c.restaurant.name,
          icon: L.icon({ iconUrl: icons[c.cluster], iconSize: [40, 50] }),
        }
      );

      this.marker.addTo(this.layerGroup);
    });
  }

  async setFilter(formValue) {
    const selectedMonth = formValue.filterMonth;
    const selectedYear = formValue.filterYear;

    await this.router.navigateByUrl(
      `list/${this.locationId}/${selectedMonth}/${selectedYear}`
    );
    await this.getClusters(
      this.locationId,
      selectedMonth,
      selectedYear,
      this.limit,
      this.page
    );
    await this.markRestaurants(this.clusters);
    this.month = selectedMonth;
    this.year = selectedYear;
  }

  async onPageChange(page: number) {
    await this.getClusters(
      this.locationId,
      this.month,
      this.year,
      this.limit,
      page
    );
    await this.markRestaurants(this.clusters);
  }
}
