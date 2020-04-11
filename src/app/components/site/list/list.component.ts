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
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  filterForm;
  private locationId: string;
  private month: number;
  private months: Dropdown[];
  private year: number;
  private years: Dropdown[];
  private map: L.Map;
  private marker: L.Marker;
  private location: ILocation;
  private clusters: ICluster[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.filterForm = this.formBuilder.group({
      filterMonth: "",
      filterYear: ""
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
      { value: 12, text: "December" }
    ];
    this.years = [];

    for (let i = 2014; i <= new Date().getFullYear(); i++) {
      this.years.push({ text: i.toString(), value: i });
    }
  }

  async ngOnInit() {
    await this.getLocation(this.locationId);
    await this.getClusters(this.locationId, this.month, this.year);
    await this.markRestaurants(this.clusters);
  }

  async getLocation(location_id: string) {
    try {
      const response = await this.apiService.getLocationById(location_id);

      this.location = {
        Name: response.Name,
        LocationId: response.LocationId,
        Latitude: response.Latitude,
        Longitude: response.Longitude
      };

      await this.initMap(this.location.Latitude, this.location.Longitude);
    } catch (error) {
      console.log(error);
    }
  }

  async initMap(latitude: number, longitude: number) {
    this.map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13
    });

    const tiles = await L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution: "Kawulo Map"
      }
    );

    await tiles.addTo(this.map);
  }

  async getClusters(location_id: string, month: number, year: number) {
    try {
      const response = await this.apiService.getRestaurantClusters(
        location_id,
        month,
        year
      );

      this.clusters = response;
    } catch (err) {
      console.log(err);
    }
  }

  async markRestaurants(clusters: ICluster[]) {
    const icons = [
      "../../../assets/images/marker/restaurant-marker-red.png",
      "../../../assets/images/marker/restaurant-marker-yellow.png",
      "../../../assets/images/marker/restaurant-marker-blue.png"
    ];

    clusters.map(c => {
      this.marker = new L.Marker(
        [+c.Restaurant.Latitude, +c.Restaurant.Longitude],
        {
          title: c.Restaurant.Name,
          icon: L.icon({ iconUrl: icons[c.Cluster], iconSize: [40, 50] })
        }
      );

      this.marker.addTo(this.map);
    });
  }

  private async setFilter(formValue) {
    const selectedMonth = formValue.filterMonth;
    const selectedYear = formValue.filterYear;

    await this.router.navigateByUrl(
      `list/${this.locationId}/${selectedMonth}/${selectedYear}`
    );
    await this.getClusters(this.locationId, selectedMonth, selectedYear);
    await this.markRestaurants(this.clusters);
    this.month = selectedMonth;
    this.year = selectedYear;
  }
}
