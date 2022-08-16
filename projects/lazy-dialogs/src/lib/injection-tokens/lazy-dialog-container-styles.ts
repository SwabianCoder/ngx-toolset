import { InjectionToken } from '@angular/core';

/**
 * Injection token for receiving the dialog container styles in the @type {LazyDialogContainerComponent}.
 *
 * @type {InjectionToken<{
  [klass: string]: any;
}>}
 */
export const LAZY_DIALOG_CONTAINER_STYLES: InjectionToken<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [klass: string]: any;
}> = new InjectionToken<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [klass: string]: any;
}>('LAZY_DIALOG_CONTAINER_STYLES');
