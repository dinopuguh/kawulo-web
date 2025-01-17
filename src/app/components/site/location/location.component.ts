import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ILocation } from "src/app/interfaces/location.interface";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent {
  constructor(
    private dialogRef: MatDialogRef<LocationComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ILocation[]
  ) {
    console.log(data);
  }

  async select(location_id) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    await this.dialogRef.close();
    await this.router.navigateByUrl(`list/${location_id}/${month}/${year}`);
  }
}
