import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import {
  API_URL_REGEX,
  BEARER_TOKEN_CALLBACK_FN,
} from './injection-tokens';

/**
 * The apiTokenInterceptor is responsible for adding an Authorization HTTP header to HTTP requests sent via {@link https://angular.io/guide/http Angular HttpClient} if their request URL matches the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/injection-tokens/api-url-regex.ts API_URL_REGEX} value.
 *
 * @param {HttpRequest<unknown>} req - An HTTP request
 * @param {HttpHandlerFn} next - An HTTP handler function
 */
export const apiTokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const apiUrlRegex = inject(API_URL_REGEX);
  const bearerTokenCallback = inject(BEARER_TOKEN_CALLBACK_FN);
  const urlMatch = apiUrlRegex.test(req.url);

  if (urlMatch) {
    const token = bearerTokenCallback();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
