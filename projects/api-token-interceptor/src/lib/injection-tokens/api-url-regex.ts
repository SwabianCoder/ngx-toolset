import { InjectionToken } from '@angular/core';

export const API_URL_REGEX: InjectionToken<RegExp> = new InjectionToken<RegExp>(
  'API_URL_REGEX'
);
