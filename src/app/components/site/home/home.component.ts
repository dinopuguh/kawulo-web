import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ApiService } from "src/app/api/api.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LocationComponent } from "../location/location.component";
import { ILocation } from "src/app/interfaces/location.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  searchForm;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.searchForm = this.formBuilder.group({
      query: ""
    });
  }

  ngOnInit() {}

  async onSubmit(formValue) {
    try {
      const response = await this.apiService.getLocations(formValue.query);

      this.openDialog(response);
    } catch (error) {
      console.error(error);
    }
  }

  private openDialog(locations: ILocation[]): void {
    console.log(locations);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: "0",
      left: "0"
    };

    this.dialog.open(LocationComponent, {
      data: {
        locations
      }
    });
  }
}
