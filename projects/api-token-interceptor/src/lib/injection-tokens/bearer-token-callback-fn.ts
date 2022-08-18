import { InjectionToken } from '@angular/core';

/**
 * {@link https://angular.io/api/core/InjectionToken Injection token} for providing the callback returning the bearer token to {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/api-token.interceptor.ts ApiTokenInterceptor}.
 *
 * @type {InjectionToken<() => string>}
 */
export const BEARER_TOKEN_CALLBACK_FN: InjectionToken<() => string> =
  new InjectionToken<() => string>('BEARER_TOKEN_CALLBACK_FN');
