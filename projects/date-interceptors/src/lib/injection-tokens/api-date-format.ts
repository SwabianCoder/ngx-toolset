import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for providing the format of date strings of HTTP request body to {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/request-body-date-format.interceptor.ts RequestBodyDateFormatInterceptor}.
 *
 * @type {InjectionToken<string>}
 */
export const API_DATE_FORMAT: InjectionToken<string> =
  new InjectionToken<string>('API_DATE_FORMAT');
