import { InjectionToken } from '@angular/core';

export const BEARER_TOKEN_CALLBACK_FN: InjectionToken<() => string> = new InjectionToken<() => string>(
  'BEARER_TOKEN_CALLBACK_FN'
);
