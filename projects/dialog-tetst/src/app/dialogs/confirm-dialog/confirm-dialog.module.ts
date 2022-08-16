import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { DialogBaseModule } from '../dialog-base/dialog-base.module';
import { ModuleWithLazyDialog } from 'projects/lazy-dialogs/src/public-api';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    DialogBaseModule,
  ],
})
export class ConfirmDialogModule extends ModuleWithLazyDialog<ConfirmDialogComponent> {
  public getDialog(): typeof ConfirmDialogComponent {
    return ConfirmDialogComponent;
  }
}
