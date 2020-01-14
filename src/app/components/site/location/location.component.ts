import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent {
  constructor(
    private dialogRef: MatDialogRef<LocationComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.locations);
  }

  private select(location_id) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    this.dialogRef.close();
    this.router.navigateByUrl(`list/${location_id}/${month}/${year}`);
  }
}
