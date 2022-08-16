import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { LAZY_DIALOG_CONTAINER_STYLES } from '../../injection-tokens';

/**
 * The lazy dialog container (aka dialog background overlay).
 *
 * @export
 * @class LazyDialogContainerComponent
 * @typedef {LazyDialogContainerComponent}
 */
@Component({
  selector: 'ngx-toolset-lazy-dialog-container',
  templateUrl: './lazy-dialog-container.component.html',
})
export class LazyDialogContainerComponent {
  /**
   * The container reference of the .dialogContainer element.
   *
   * @public
   * @type {!ViewContainerRef}
   */
  @ViewChild('dialogContainer', { read: ViewContainerRef })
  public dialogContainer!: ViewContainerRef;

  /**
   * Creates an instance of LazyDialogContainerComponent.
   *
   * @constructor
   * @public
   * @param {Readonly<{
        [klass: string]: any;
      }>} The dialog container's CSS styles.
   */
  public constructor(
    @Inject(LAZY_DIALOG_CONTAINER_STYLES)
    public readonly dialogContainerStyles: Readonly<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [klass: string]: any;
    }>
  ) {}
}
