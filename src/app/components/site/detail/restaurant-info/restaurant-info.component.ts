import { Component, OnInit, Input } from "@angular/core";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";

@Component({
  selector: "app-restaurant-info",
  templateUrl: "./restaurant-info.component.html",
  styleUrls: ["./restaurant-info.component.css"],
})
export class RestaurantInfoComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;

  constructor() {}

  ngOnInit() {}
}
