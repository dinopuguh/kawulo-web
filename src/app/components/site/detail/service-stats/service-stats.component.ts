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
  selector: "app-service-stats",
  templateUrl: "./service-stats.component.html",
  styleUrls: ["./service-stats.component.css"],
})
export class ServiceStatsComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("service-sentiment-chart", { static: false })
  serviceSentimentChart: ChartComponent;
  public serviceSentimentChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.serviceSentimentChartOptions = {
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
    await this.setServiceSentimentChart();
  }

  async setServiceSentimentChart() {
    try {
      var data = [
        this.restaurant.service_stats.positive,
        this.restaurant.service_stats.neutral,
        this.restaurant.service_stats.negative,
      ];

      this.serviceSentimentChartOptions = {
        ...this.serviceSentimentChartOptions,
        ...{
          series: data,
          labels: ["Positive", "Neutral", "Negative"],
          title: {
            text: "Service chart",
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
