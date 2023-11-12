import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for providing the Regex of the API URL to {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/api-token.interceptor.ts ApiTokenInterceptor}.
 *
 * @type {InjectionToken<RegExp>}
 */
export const API_URL_REGEX: InjectionToken<RegExp> = new InjectionToken<RegExp>(
  'API_URL_REGEX',
);
