import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { LAZY_DIALOG_CONTAINER_STYLES } from '../../injection-tokens';

@Component({
  selector: 'ngx-toolset-lazy-dialog-container',
  templateUrl: './lazy-dialog-container.component.html',
})
export class LazyDialogContainerComponent {
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  public dialogContainer!: ViewContainerRef;

  public constructor(
    @Inject(LAZY_DIALOG_CONTAINER_STYLES)
    public readonly dialogContainerStyles: Readonly<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [klass: string]: any;
    }>
  ) {}
}
