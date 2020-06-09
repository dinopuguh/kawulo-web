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
  selector: "app-vader-stats",
  templateUrl: "./vader-stats.component.html",
  styleUrls: ["./vader-stats.component.css"],
})
export class VaderStatsComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("vader-sentiment-chart", { static: false })
  vaderSentimentChart: ChartComponent;
  public vaderSentimentChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.vaderSentimentChartOptions = {
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
    await this.setVaderSentimentChart();
  }

  async setVaderSentimentChart() {
    try {
      var data = [
        this.restaurant.vader_stats.positive,
        this.restaurant.vader_stats.neutral,
        this.restaurant.vader_stats.negative,
      ];

      this.vaderSentimentChartOptions = {
        ...this.vaderSentimentChartOptions,
        ...{
          series: data,
          labels: ["Positive", "Neutral", "Negative"],
          title: {
            text: "Vader chart",
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
