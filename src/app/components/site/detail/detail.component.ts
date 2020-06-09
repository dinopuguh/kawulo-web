import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";
import { IPredictionResponse } from "src/app/interfaces/prediction.interface";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  restaurant: IRestaurantDetail;
  prediction: IPredictionResponse;
  restaurantId: string;
  month: number;
  year: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.restaurantId = this.route.snapshot.paramMap.get("restaurant_id");
    this.month = +this.route.snapshot.paramMap.get("month");
    this.year = +this.route.snapshot.paramMap.get("year");
  }

  async ngOnInit() {
    await this.getRestaurantDetail();
    await this.getPrediction();
  }

  async getRestaurantDetail() {
    try {
      const response = await this.apiService.getRestaurantDetail(
        this.restaurantId,
        this.month,
        this.year
      );

      this.restaurant = response;

      console.log(this.restaurant);
    } catch (error) {
      console.log(error);
    }
  }

  async getPrediction() {
    try {
      const response = await this.apiService.getPredictions(
        this.restaurantId,
        0.5,
        0.8
      );

      this.prediction = response;

      console.log(this.prediction);
    } catch (error) {
      console.log(error);
    }
  }
}
