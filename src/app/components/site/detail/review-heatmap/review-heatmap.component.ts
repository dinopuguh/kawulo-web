import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ChartComponent,
} from "ng-apexcharts";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";

export type HeatmapChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: "app-review-heatmap",
  templateUrl: "./review-heatmap.component.html",
  styleUrls: ["./review-heatmap.component.css"],
})
export class ReviewHeatmapComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @ViewChild("review-heatmap", { static: false })
  reviewHeatmap: ChartComponent;
  public reviewHeatmapOptions: Partial<HeatmapChartOptions>;

  constructor() {
    this.reviewHeatmapOptions = {
      series: [],
      chart: {
        height: 500,
        width: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#008FFB"],
      title: {
        text: "Review Heatmap",
      },
    };
  }

  async ngOnInit() {
    await this.setReviewHeatmap();
  }

  async setReviewHeatmap() {
    try {
      var currentYear = new Date().getFullYear();
      var startYear = currentYear - 6;

      this.reviewHeatmapOptions = {
        ...this.reviewHeatmapOptions,
        ...{
          series: [
            {
              name: "Dec",
              data: this.getHeatmapData(12, startYear, currentYear),
            },
            {
              name: "Nov",
              data: this.getHeatmapData(11, startYear, currentYear),
            },
            {
              name: "Oct",
              data: this.getHeatmapData(10, startYear, currentYear),
            },
            {
              name: "Sep",
              data: this.getHeatmapData(9, startYear, currentYear),
            },
            {
              name: "Aug",
              data: this.getHeatmapData(8, startYear, currentYear),
            },
            {
              name: "Jul",
              data: this.getHeatmapData(7, startYear, currentYear),
            },
            {
              name: "Jun",
              data: this.getHeatmapData(6, startYear, currentYear),
            },
            {
              name: "May",
              data: this.getHeatmapData(5, startYear, currentYear),
            },
            {
              name: "Apr",
              data: this.getHeatmapData(4, startYear, currentYear),
            },
            {
              name: "Mar",
              data: this.getHeatmapData(3, startYear, currentYear),
            },
            {
              name: "Feb",
              data: this.getHeatmapData(2, startYear, currentYear),
            },
            {
              name: "Jan",
              data: this.getHeatmapData(1, startYear, currentYear),
            },
          ],
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  getHeatmapData(month, startYear, currentYear) {
    var i = startYear;
    var series = [];

    while (i <= currentYear) {
      var count = 0;
      this.restaurant.heatmap.forEach((heatmap) => {
        if (heatmap.year == i && heatmap.month == month) {
          count = heatmap.count;
        }
      });
      series.push({
        x: i,
        y: count,
      });
      i++;
    }

    return series;
  }
}
