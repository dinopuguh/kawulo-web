import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/site/home/home.component";
import { ListComponent } from "./components/site/list/list.component";
import { DetailComponent } from "./components/site/detail/detail.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "list/:location_id/:month/:year", component: ListComponent },
  { path: "detail", component: DetailComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
