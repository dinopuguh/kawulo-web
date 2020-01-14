import { Component, AfterViewInit, OnInit, OnChanges } from "@angular/core";
import "style-loader!leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { AxiosService } from "src/app/api/axios.service";
import { ILocation } from "src/app/interface/location.interface";
import { CLUSTER_RESTAURANT_API_URL } from "src/app/api/config";
import { FormBuilder } from "@angular/forms";

interface Dropdown {
  value: number;
  text: number;
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements AfterViewInit, OnInit {
  filterForm;
  private location_id: string;
  private month: number;
  private months: Dropdown[];
  private year: number;
  private years: Dropdown[];
  private map: L.Map;
  private marker: L.Marker;
  private location: ILocation;
  private clusters: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private axiosService: AxiosService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

    this.filterForm = this.formBuilder.group({
      filterMonth: "",
      filterYear: ""
    });

    this.location_id = this.route.snapshot.paramMap.get("location_id");
    this.month = +this.route.snapshot.paramMap.get("month");
    this.year = +this.route.snapshot.paramMap.get("year");

    this.clusters = [];
    this.months = [];
    this.years = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push({ text: i, value: i });
    }
    for (let i = 2014; i <= 2020; i++) {
      this.years.push({ text: i, value: i });
    }
  }

  async ngOnInit() {
    await this.getLocation(this.location_id);
    await this.getClusters(this.location_id, this.month, this.year).then(() =>
      this.markRestaurants(this.clusters)
    );

    if (this.clusters.length > 0) {
      console.log("True");
      await this.markRestaurants(this.clusters);
    } else {
      console.log("False");
    }
  }

  ngAfterViewInit(): void {
    const tiles = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution: "Kawulo Map"
      }
    );

    tiles.addTo(this.map);
  }

  async getLocation(location_id: string) {
    this.apiService.getLocationById(location_id).subscribe(
      res => {
        this.location = {
          name: res.name,
          location_id: res.location_id,
          latitude: res.latitude,
          longitude: res.longitude
        };
      },
      err => {
        console.log(err);
      },
      () => {
        this.initMap(this.location.latitude, this.location.longitude);
      }
    );
  }

  async initMap(latitude, longitude) {
    this.map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13
    });

    const tiles = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution: "Kawulo Map"
      }
    );

    tiles.addTo(this.map);
  }

  private updateMap(latitude, longitude): void {
    this.map.panTo(new L.LatLng(latitude, longitude));
  }

  async getClusters(location_id, month, year) {
    const url = `${CLUSTER_RESTAURANT_API_URL}${location_id}/${month}/${year}`;

    try {
      this.clusters = await this.axiosService.get<any[]>({
        url
      });

      console.log(this.clusters);
    } catch (err) {
      console.log(err);
    }

    // this.apiService.getRestaurantClusters(location_id, 10, 2016).subscribe(
    //   res => {
    //     this.clusters = res;
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   () => {
    //     console.log("Completed");
    //   }
    // );
  }

  async markRestaurants(clusters: any[]) {
    const icons = [
      "../../../assets/images/marker/restaurant-marker-red.png",
      "../../../assets/images/marker/restaurant-marker-yellow.png",
      "../../../assets/images/marker/restaurant-marker-blue.png"
    ];

    clusters.map(c => {
      this.marker = new L.Marker(
        [+c.restaurant.latitude, +c.restaurant.longitude],
        {
          title: c.restaurant.name,
          icon: L.icon({ iconUrl: icons[c.new_cluster], iconSize: [40, 50] })
        }
      );

      this.marker.addTo(this.map);

      console.log(c);
    });
  }

  private async setFilter(formValue) {
    console.log(formValue);

    const selectedMonth = formValue.filterMonth;
    const selectedYear = formValue.filterYear;

    await this.router.navigateByUrl(
      `list/${this.location_id}/${selectedMonth}/${selectedYear}`
    );
    await this.getClusters(this.location_id, selectedMonth, selectedYear).then(
      () => {
        this.markRestaurants(this.clusters);
      }
    );
  }
}
