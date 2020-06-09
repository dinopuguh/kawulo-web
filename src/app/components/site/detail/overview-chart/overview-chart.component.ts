import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ChartComponent,
} from "ng-apexcharts";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";

export type StackedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: "app-overview-chart",
  templateUrl: "./overview-chart.component.html",
  styleUrls: ["./overview-chart.component.css"],
})
export class OverviewChartComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("sentiment-chart", { static: false })
  sentimentChart: ChartComponent;
  public sentimentChartOptions: Partial<StackedChartOptions>;

  constructor() {
    this.sentimentChartOptions = {
      series: [],
      chart: {
        type: "bar",
        width: 350,
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Overview Chart",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " reviews";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    };
  }

  async ngOnInit() {
    await this.setSentimentChart();
  }

  async setSentimentChart() {
    try {
      var data = [
        {
          name: "Positive",
          data: [
            this.restaurant.service_stats.positive,
            this.restaurant.value_stats.positive,
            this.restaurant.food_stats.positive,
            this.restaurant.vader_stats.positive,
            this.restaurant.wordnet_stats.positive,
          ],
        },
        {
          name: "Neutral",
          data: [
            this.restaurant.service_stats.neutral,
            this.restaurant.value_stats.neutral,
            this.restaurant.food_stats.neutral,
            this.restaurant.vader_stats.neutral,
            this.restaurant.wordnet_stats.neutral,
          ],
        },
        {
          name: "Negative",
          data: [
            this.restaurant.service_stats.negative,
            this.restaurant.value_stats.negative,
            this.restaurant.food_stats.negative,
            this.restaurant.vader_stats.negative,
            this.restaurant.wordnet_stats.negative,
          ],
        },
      ];

      this.sentimentChartOptions = {
        ...this.sentimentChartOptions,
        ...{
          series: data,
          xaxis: {
            categories: ["Service", "Value", "Food", "Vader", "Wordnet"],
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
