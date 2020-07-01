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
  selector: "app-wordnet-stats",
  templateUrl: "./wordnet-stats.component.html",
  styleUrls: ["./wordnet-stats.component.css"],
})
export class WordnetStatsComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("wordnet-sentiment-chart", { static: false })
  wordnetSentimentChart: ChartComponent;
  public wordnetSentimentChartOptions: Partial<DonutChartOptions>;

  constructor() {
    this.wordnetSentimentChartOptions = {
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
    await this.setWordnetSentimentChart();
  }

  async setWordnetSentimentChart() {
    try {
      var data = [
        this.restaurant.wordnet_stats.positive,
        this.restaurant.wordnet_stats.neutral,
        this.restaurant.wordnet_stats.negative,
      ];

      this.wordnetSentimentChartOptions = {
        ...this.wordnetSentimentChartOptions,
        ...{
          series: data,
          labels: ["Positive", "Neutral", "Negative"],
          title: {
            text: "Wordnet chart",
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
