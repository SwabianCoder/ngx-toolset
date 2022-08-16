import { InjectionToken } from '@angular/core';

export const LAZY_DIALOG_CONTAINER_STYLES: InjectionToken<{
  [klass: string]: any;
}> =
  new InjectionToken<{
    [klass: string]: any;
}>('LAZY_DIALOG_CONTAINER_STYLES');
