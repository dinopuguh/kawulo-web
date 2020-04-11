import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
  ApexYAxis
} from "ng-apexcharts";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"]
})
export class DetailComponent implements OnInit {
  private restaurant: IRestaurantDetail;
  private restaurantId: string;
  private month: number;
  private year: number;

  @ViewChild("rating-chart", { static: false }) ratingChart: ChartComponent;
  public ratingChartOptions: Partial<ChartOptions>;

  @ViewChild("rating-chart", { static: false }) sentimentChart: ChartComponent;
  public sentimentChartOptions: Partial<ChartOptions>;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.restaurantId = this.route.snapshot.paramMap.get("restaurant_id");
    this.month = +this.route.snapshot.paramMap.get("month");
    this.year = +this.route.snapshot.paramMap.get("year");
    this.ratingChartOptions = {
      series: [
        {
          name: "service",
          data: []
        },
        {
          name: "value",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      annotations: {
        xaxis: []
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      grid: {
        padding: {
          right: 30,
          left: 20
        }
      },
      title: {
        text: "Rating Timeseries",
        align: "left"
      },
      labels: [],
      xaxis: {
        range: 20
      },
      yaxis: {
        decimalsInFloat: 2
      }
    };

    this.sentimentChartOptions = {
      ...this.ratingChartOptions,
      ...{
        title: {
          text: "Sentiment Timeseries"
        }
      }
    };
  }

  async ngOnInit() {
    await this.getRestaurantDetail();
    await this.setRatingChart();
    await this.setSentimentChart();
  }

  counter(i: number) {
    return new Array(i);
  }

  getDateFromNow(value: string) {
    const reviewDate = moment(value, "YYYY-MM-DDTHH:mm:ssZ");

    return reviewDate.fromNow();
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

  async setRatingChart() {
    try {
      var services: number[] = [];
      var values: number[] = [];
      var foods: number[] = [];
      var dates: string[] = [];

      this.restaurant.Temporal.forEach(temporal => {
        services.push(temporal.Service);
        values.push(temporal.Value);
        foods.push(temporal.Food);
        dates.push(temporal.Month + "/" + temporal.Year);
      });

      services.push(this.restaurant.Prediction.Service);
      values.push(this.restaurant.Prediction.Value);
      foods.push(this.restaurant.Prediction.Food);
      dates.push(
        this.restaurant.Prediction.Month + "/" + this.restaurant.Prediction.Year
      );

      this.ratingChartOptions = {
        ...this.ratingChartOptions,
        ...{
          series: [
            {
              name: "Service",
              data: services
            },
            {
              name: "Value",
              data: values
            },
            {
              name: "Food",
              data: foods
            }
          ],
          labels: dates,
          annotations: {
            xaxis: [
              {
                x: dates[dates.length - 2],
                x2: dates[dates.length - 1],
                fillColor: "#B3F7CA",
                opacity: 0.4,
                label: {
                  borderColor: "#B3F7CA",
                  style: {
                    fontSize: "10px",
                    color: "#fff",
                    background: "#00E396"
                  },
                  offsetY: -10,
                  text: "Prediction"
                }
              }
            ]
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  }

  async setSentimentChart() {
    try {
      var vaders: number[] = [];
      var wordnets: number[] = [];
      var dates: string[] = [];

      this.restaurant.Temporal.forEach(temporal => {
        vaders.push(temporal.Vader);
        wordnets.push(temporal.Wordnet);

        const dateString = temporal.Month + "/" + temporal.Year;

        dates.push(dateString);
      });

      vaders.push(this.restaurant.Prediction.Vader);
      wordnets.push(this.restaurant.Prediction.Wordnet);
      dates.push(
        this.restaurant.Prediction.Month + "/" + this.restaurant.Prediction.Year
      );

      this.sentimentChartOptions = {
        ...this.sentimentChartOptions,
        ...{
          series: [
            {
              name: "Vader",
              data: vaders
            },
            {
              name: "Wordnet",
              data: wordnets
            }
          ],
          labels: dates,
          annotations: {
            xaxis: [
              {
                x: dates[dates.length - 2],
                x2: dates[dates.length - 1],
                fillColor: "#B3F7CA",
                opacity: 0.4,
                label: {
                  borderColor: "#B3F7CA",
                  style: {
                    fontSize: "10px",
                    color: "#fff",
                    background: "#00E396"
                  },
                  offsetY: -10,
                  text: "Prediction"
                }
              }
            ]
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  }
}
