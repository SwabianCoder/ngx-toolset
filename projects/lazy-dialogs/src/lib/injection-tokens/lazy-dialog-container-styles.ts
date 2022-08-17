import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for receiving the dialog container styles in the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/lazy-dialogs/src/lib/components/lazy-dialog-container/lazy-dialog-container.component.ts LazyDialogContainerComponent}.
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
