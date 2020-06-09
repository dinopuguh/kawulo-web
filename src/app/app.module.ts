import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { ListComponent } from "./components/site/list/list.component";
import { DetailComponent } from "./components/site/detail/detail.component";
import { HttpClientModule } from "@angular/common/http";
import { NbDialogModule } from "@nebular/theme";
import { HomeModule } from "./components/site/home/home.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailModule } from "./components/site/detail/detail.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ListComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbDialogModule.forRoot(),
    NgbPaginationModule,
    HomeModule,
    DetailModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
