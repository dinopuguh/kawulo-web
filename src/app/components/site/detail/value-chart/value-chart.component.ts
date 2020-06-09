import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexAnnotations,
  ApexChart,
  ApexFill,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent,
} from "ng-apexcharts";
import { IPredictionResponse } from "src/app/interfaces/prediction.interface";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";
import { round } from "src/helpers/round.helpers";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  fill: ApexFill;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-value-chart",
  templateUrl: "./value-chart.component.html",
  styleUrls: ["./value-chart.component.css"],
})
export class ValueChartComponent implements OnInit {
  @Input() restaurant: IRestaurantDetail;
  @Input() prediction: IPredictionResponse;
  @ViewChild("value-chart", { static: false }) valueChart: ChartComponent;
  public valueChartOptions: Partial<ChartOptions>;

  constructor() {
    this.valueChartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "area",
      },
      annotations: {
        xaxis: [],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },
      xaxis: {
        range: 20,
      },
      yaxis: {
        decimalsInFloat: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
    };
  }

  ngOnInit() {
    this.setValueChart();
  }

  setValueChart() {
    try {
      var values: number[] = [];
      var predictions: number[] = [];
      var dates: string[] = [];

      this.prediction.predictions.forEach((prediction) => {
        predictions.push(prediction.value);
        dates.push(prediction.month + "/" + prediction.year);
      });

      var firstMonth = this.prediction.predictions[0].month;
      var firstYear = this.prediction.predictions[0].year;

      this.restaurant.temporal.forEach((temporal) => {
        if (temporal.year > firstYear) {
          values.push(temporal.value);
        } else if (temporal.year == firstYear && temporal.month >= firstMonth) {
          values.push(temporal.value);
        }
      });

      this.valueChartOptions = {
        ...this.valueChartOptions,
        ...{
          series: [
            {
              name: "Actual",
              data: values,
            },
            {
              name: "Prediction",
              data: predictions,
            },
          ],
          labels: dates,
          title: {
            text: `Value Timeseries (Error: ${round(
              this.prediction.error.value_error * 100,
              2
            )}%)`,
            align: "left",
          },
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
}
