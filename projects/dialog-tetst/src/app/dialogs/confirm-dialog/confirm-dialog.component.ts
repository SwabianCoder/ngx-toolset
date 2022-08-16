import { Component } from '@angular/core';
import { LazyDialogRef } from 'projects/lazy-dialogs/src/public-api';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  public title!: string;
  public description!: string;

  constructor(private dialogRef: LazyDialogRef<any>){
    this.title = dialogRef.data.title;
    this.description = dialogRef.data.description;
  }

  public onCancelClicked(): void {
    this.dialogRef.close({ confirmed: false });
  }

  public onConfirmClicked(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
