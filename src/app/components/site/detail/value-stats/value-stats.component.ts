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
  selector: "app-value-stats",
  templateUrl: "./value-stats.component.html",
  styleUrls: ["./value-stats.component.css"],
})
export class ValueStatsComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("value-sentiment-chart", { static: false })
  valueSentimentChart: ChartComponent;
  public valueSentimentChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.valueSentimentChartOptions = {
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
    await this.setValueSentimentChart();
  }

  async setValueSentimentChart() {
    try {
      var data = [
        this.restaurant.value_stats.positive,
        this.restaurant.value_stats.neutral,
        this.restaurant.value_stats.negative,
      ];

      this.valueSentimentChartOptions = {
        ...this.valueSentimentChartOptions,
        ...{
          series: data,
          labels: ["Positive", "Neutral", "Negative"],
          title: {
            text: "Value chart",
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
