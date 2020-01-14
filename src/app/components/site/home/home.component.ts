import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ApiService } from "src/app/api/api.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LocationComponent } from "../location/location.component";
import { ILocation } from "src/app/interface/location.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  searchForm;
  private locations: any[];

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

  onSubmit(formValue) {
    console.log(formValue.query);

    this.apiService.getLocations(formValue.query).subscribe(
      res => {
        // console.log(res);
        this.openDialog(res);
      },
      err => {
        console.log(err);
      }
    );
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
