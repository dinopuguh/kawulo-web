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
  ApexYAxis,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTheme,
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend,
} from "ng-apexcharts";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { IRestaurantDetail } from "src/app/interfaces/restaurant.interface";
import { IPredictionResponse } from "src/app/interfaces/prediction.interface";
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

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  theme: ApexTheme;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

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

export type HeatmapChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  restaurant: IRestaurantDetail;
  prediction: IPredictionResponse;
  restaurantId: string;
  month: number;
  year: number;

  @ViewChild("service-chart", { static: false }) serviceChart: ChartComponent;
  public serviceChartOptions: Partial<ChartOptions>;

  @ViewChild("value-chart", { static: false }) valueChart: ChartComponent;
  public valueChartOptions: Partial<ChartOptions>;

  @ViewChild("food-chart", { static: false }) foodChart: ChartComponent;
  public foodChartOptions: Partial<ChartOptions>;

  @ViewChild("vader-chart", { static: false }) vaderChart: ChartComponent;
  public vaderChartOptions: Partial<ChartOptions>;

  @ViewChild("wordnet-chart", { static: false }) wordnetChart: ChartComponent;
  public wordnetChartOptions: Partial<ChartOptions>;

  @ViewChild("service-sentiment-chart", { static: false })
  serviceSentimentChart: ChartComponent;
  public serviceSentimentChartOptions: Partial<DonutChartOptions>;

  @ViewChild("value-sentiment-chart", { static: false })
  valueSentimentChart: ChartComponent;
  public valueSentimentChartOptions: Partial<DonutChartOptions>;

  @ViewChild("food-sentiment-chart", { static: false })
  foodSentimentChart: ChartComponent;
  public foodSentimentChartOptions: Partial<DonutChartOptions>;

  @ViewChild("vader-sentiment-chart", { static: false })
  vaderSentimentChart: ChartComponent;
  public vaderSentimentChartOptions: Partial<DonutChartOptions>;

  @ViewChild("wordnet-sentiment-chart", { static: false })
  wordnetSentimentChart: ChartComponent;
  public wordnetSentimentChartOptions: Partial<DonutChartOptions>;

  @ViewChild("sentiment-chart", { static: false })
  sentimentChart: ChartComponent;
  public sentimentChartOptions: Partial<StackedChartOptions>;

  @ViewChild("review-heatmap", { static: false })
  reviewHeatmap: ChartComponent;
  public reviewHeatmapOptions: Partial<HeatmapChartOptions>;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.restaurantId = this.route.snapshot.paramMap.get("restaurant_id");
    this.month = +this.route.snapshot.paramMap.get("month");
    this.year = +this.route.snapshot.paramMap.get("year");
    this.serviceChartOptions = {
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
          enabled: true,
        },
      },
    };

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

    this.valueChartOptions = { ...this.serviceChartOptions };
    this.foodChartOptions = { ...this.serviceChartOptions };
    this.vaderChartOptions = { ...this.serviceChartOptions };
    this.wordnetChartOptions = { ...this.serviceChartOptions };

    this.valueSentimentChartOptions = { ...this.serviceSentimentChartOptions };
    this.foodSentimentChartOptions = { ...this.serviceSentimentChartOptions };
    this.vaderSentimentChartOptions = { ...this.serviceSentimentChartOptions };
    this.wordnetSentimentChartOptions = {
      ...this.serviceSentimentChartOptions,
    };
  }

  async ngOnInit() {
    await this.getRestaurantDetail();
    await this.getPrediction();
    await this.setServiceChart();
    await this.setValueChart();
    await this.setFoodChart();
    await this.setVaderChart();
    await this.setWordnetChart();
    await this.setServiceSentimentChart();
    await this.setValueSentimentChart();
    await this.setFoodSentimentChart();
    await this.setVaderSentimentChart();
    await this.setWordnetSentimentChart();
    await this.setSentimentChart();
    await this.setReviewHeatmap();
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

  async getPrediction() {
    try {
      const response = await this.apiService.getPredictions(
        this.restaurantId,
        0.5,
        0.8
      );

      this.prediction = response;

      console.log(this.prediction);
    } catch (error) {
      console.log(error);
    }
  }

  async setServiceChart() {
    try {
      var services: number[] = [];
      var predictions: number[] = [];
      var dates: string[] = [];

      this.prediction.predictions.forEach((prediction) => {
        predictions.push(prediction.service);
        dates.push(prediction.month + "/" + prediction.year);
      });

      var firstMonth = this.prediction.predictions[0].month;
      var firstYear = this.prediction.predictions[0].year;

      this.restaurant.temporal.forEach((temporal) => {
        if (temporal.year > firstYear) {
          services.push(temporal.service);
        } else if (temporal.year == firstYear && temporal.month >= firstMonth) {
          services.push(temporal.service);
        }
      });

      this.serviceChartOptions = {
        ...this.serviceChartOptions,
        ...{
          series: [
            {
              name: "Actual",
              data: services,
            },
            {
              name: "Prediction",
              data: predictions,
            },
          ],
          labels: dates,
          title: {
            text: `Service Timeseries (Error: ${round(
              this.prediction.error.service_error * 100,
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

  async setValueChart() {
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

  async setFoodChart() {
    try {
      var foods: number[] = [];
      var predictions: number[] = [];
      var dates: string[] = [];

      this.prediction.predictions.forEach((prediction) => {
        predictions.push(prediction.food);
        dates.push(prediction.month + "/" + prediction.year);
      });

      var firstMonth = this.prediction.predictions[0].month;
      var firstYear = this.prediction.predictions[0].year;

      this.restaurant.temporal.forEach((temporal) => {
        if (temporal.year > firstYear) {
          foods.push(temporal.food);
        } else if (temporal.year == firstYear && temporal.month >= firstMonth) {
          foods.push(temporal.food);
        }
      });

      this.foodChartOptions = {
        ...this.foodChartOptions,
        ...{
          series: [
            {
              name: "Actual",
              data: foods,
            },
            {
              name: "Prediction",
              data: predictions,
            },
          ],
          labels: dates,
          title: {
            text: `Food Timeseries (Error: ${round(
              this.prediction.error.food_error * 100,
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

  async setVaderChart() {
    try {
      var vaders: number[] = [];
      var predictions: number[] = [];
      var dates: string[] = [];

      this.prediction.predictions.forEach((prediction) => {
        predictions.push(prediction.vader);
        dates.push(prediction.month + "/" + prediction.year);
      });

      var firstMonth = this.prediction.predictions[0].month;
      var firstYear = this.prediction.predictions[0].year;

      this.restaurant.temporal.forEach((temporal) => {
        if (temporal.year > firstYear) {
          vaders.push(temporal.vader);
        } else if (temporal.year == firstYear && temporal.month >= firstMonth) {
          vaders.push(temporal.vader);
        }
      });

      this.vaderChartOptions = {
        ...this.vaderChartOptions,
        ...{
          series: [
            {
              name: "Actual",
              data: vaders,
            },
            {
              name: "Prediction",
              data: predictions,
            },
          ],
          labels: dates,
          title: {
            text: `Vader Timeseries (Error: ${round(
              this.prediction.error.vader_error * 100,
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

  async setWordnetChart() {
    try {
      var wordnets: number[] = [];
      var predictions: number[] = [];
      var dates: string[] = [];

      this.prediction.predictions.forEach((prediction) => {
        predictions.push(prediction.wordnet);
        dates.push(prediction.month + "/" + prediction.year);
      });

      var firstMonth = this.prediction.predictions[0].month;
      var firstYear = this.prediction.predictions[0].year;

      this.restaurant.temporal.forEach((temporal) => {
        if (temporal.year > firstYear) {
          wordnets.push(temporal.wordnet);
        } else if (temporal.year == firstYear && temporal.month >= firstMonth) {
          wordnets.push(temporal.wordnet);
        }
      });

      this.wordnetChartOptions = {
        ...this.wordnetChartOptions,
        ...{
          series: [
            {
              name: "Actual",
              data: wordnets,
            },
            {
              name: "Prediction",
              data: predictions,
            },
          ],
          labels: dates,
          title: {
            text: `Wordnet Timeseries (Error: ${round(
              this.prediction.error.wordnet_error * 100,
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
          theme: {
            monochrome: {
              enabled: true,
              color: "#00E396",
            },
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
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
          theme: {
            monochrome: {
              enabled: true,
            },
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
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
          theme: {
            monochrome: {
              enabled: true,
              color: "#00E396",
            },
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
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
          theme: {
            monochrome: {
              enabled: true,
            },
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
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
