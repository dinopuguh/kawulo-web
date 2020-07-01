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
  isLoadingDetail: boolean = false;
  isLoadingPrediction: boolean = false;
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
      this.isLoadingDetail = true;
      const response = await this.apiService.getRestaurantDetail(
        this.restaurantId,
        this.month,
        this.year,
      );

      this.restaurant = response;
      this.isLoadingDetail = false;
    } catch (error) {
      console.log(error);
    }
  }

  async getPrediction() {
    try {
      this.isLoadingPrediction = true;
      const response = await this.apiService.getPredictions(
        this.restaurantId,
        0.5,
        0.8,
      );

      this.prediction = response;
      this.isLoadingPrediction = false;
    } catch (error) {
      console.log(error);
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
