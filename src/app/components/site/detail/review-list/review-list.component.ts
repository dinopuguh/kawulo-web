import { Component, OnInit, Input } from "@angular/core";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";
import * as moment from "moment";

@Component({
  selector: "app-review-list",
  templateUrl: "./review-list.component.html",
  styleUrls: ["./review-list.component.css"],
})
export class ReviewListComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;

  constructor() {}

  ngOnInit() {}

  counter(i: number) {
    return new Array(i);
  }

  getDateFromNow(value: string) {
    const reviewDate = moment(value, "YYYY-MM-DDTHH:mm:ssZ");

    return reviewDate.fromNow();
  }
}
