import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailComponent } from "./detail.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { RouterModule } from "@angular/router";
import { RestaurantInfoComponent } from "./restaurant-info/restaurant-info.component";
import { ServiceChartComponent } from "./service-chart/service-chart.component";
import { ValueChartComponent } from "./value-chart/value-chart.component";
import { FoodChartComponent } from "./food-chart/food-chart.component";
import { VaderChartComponent } from "./vader-chart/vader-chart.component";
import { WordnetChartComponent } from "./wordnet-chart/wordnet-chart.component";
import { OverviewChartComponent } from "./overview-chart/overview-chart.component";
import { ReviewHeatmapComponent } from "./review-heatmap/review-heatmap.component";
import { ReviewListComponent } from "./review-list/review-list.component";
import { FoodStatsComponent } from './food-stats/food-stats.component';
import { ServiceStatsComponent } from './service-stats/service-stats.component';
import { ValueStatsComponent } from './value-stats/value-stats.component';
import { VaderStatsComponent } from './vader-stats/vader-stats.component';
import { WordnetStatsComponent } from './wordnet-stats/wordnet-stats.component';

@NgModule({
  declarations: [
    DetailComponent,
    RestaurantInfoComponent,
    ServiceChartComponent,
    ValueChartComponent,
    FoodChartComponent,
    VaderChartComponent,
    WordnetChartComponent,
    OverviewChartComponent,
    ReviewHeatmapComponent,
    ReviewListComponent,
    FoodStatsComponent,
    ServiceStatsComponent,
    ValueStatsComponent,
    VaderStatsComponent,
    WordnetStatsComponent,
  ],
  imports: [CommonModule, RouterModule, NgApexchartsModule],
})
export class DetailModule {}
