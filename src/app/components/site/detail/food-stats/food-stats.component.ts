import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexTheme,
  ApexResponsive,
  ApexTitleSubtitle,
  ChartComponent,
} from "ng-apexcharts";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  theme: ApexTheme;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-food-stats",
  templateUrl: "./food-stats.component.html",
  styleUrls: ["./food-stats.component.css"],
})
export class FoodStatsComponent implements OnInit {
  @Input()
  restaurant: IRestaurantDetail;
  @ViewChild("food-sentiment-chart", { static: false })
  foodSentimentChart: ChartComponent;
  public foodSentimentChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.foodSentimentChartOptions = {
      series: [],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
    };
  }

  async ngOnInit() {
    await this.setFoodSentimentChart();
  }

  async setFoodSentimentChart() {
    try {
      var data = [
        this.restaurant.food_stats.positive,
        this.restaurant.food_stats.neutral,
        this.restaurant.food_stats.negative,
      ];

      this.foodSentimentChartOptions = {
        ...this.foodSentimentChartOptions,
        ...{
          series: data,
          labels: ["Positive", "Neutral", "Negative"],
          title: {
            text: "Food chart",
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
