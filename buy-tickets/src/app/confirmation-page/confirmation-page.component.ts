import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

import { IConfirmationData } from "../interfaces/confirmation-data.interface";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPageComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationData,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
