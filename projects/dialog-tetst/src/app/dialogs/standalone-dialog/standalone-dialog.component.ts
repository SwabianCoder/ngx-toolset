import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyDialogRef } from 'projects/lazy-dialogs/src/public-api';

@Component({
  selector: 'app-standalone-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone-dialog.component.html',
  styleUrls: ['./standalone-dialog.component.scss']
})
export class StandaloneDialogComponent {
  constructor(private dialogRef: LazyDialogRef<unknown>){}

  public onParams(params?: any): void {
   
  }
}
