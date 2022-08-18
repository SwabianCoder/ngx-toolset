import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for providing the Regex of date strings of HTTP response body to {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/response-body-date-parse.interceptor.ts ResponseBodyDateParseInterceptor}.
 *
 * @type {InjectionToken<RegExp>}
 */
export const DATE_STRING_REGEX: InjectionToken<RegExp> =
  new InjectionToken<RegExp>('DATE_STRING_REGEX');
