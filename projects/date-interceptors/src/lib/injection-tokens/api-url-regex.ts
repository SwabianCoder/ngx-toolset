import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for providing the Regex of the API URL to {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/request-body-date-format.interceptor.ts RequestBodyDateFormatInterceptor} and {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/response-body-date-parse.interceptor.ts ResponseBodyDateParseInterceptor}.
 *
 * @type {InjectionToken<RegExp>}
 */
export const API_URL_REGEX: InjectionToken<RegExp> = new InjectionToken<RegExp>(
  'API_URL_REGEX'
);
