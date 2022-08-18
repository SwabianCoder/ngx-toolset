import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_REGEX, BEARER_TOKEN_CALLBACK_FN } from './injection-tokens';

/**
 * The ApiTokenInterceptor is responsible for adding an Authorization HTTP header to HTTP requests sent via {@link https://angular.io/guide/http Angular HttpClient} if their request URL matches the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/injection-tokens/api-url-regex.ts API_URL_REGEX} value.
 *
 * @export
 * @class ApiTokenInterceptor
 * @typedef {ApiTokenInterceptor}
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of ApiTokenInterceptor.
   *
   * @constructor
   * @public
   * @param {Readonly<RegExp>} apiUrlRegex
   * @param {() => string} bearerTokenCallback
   */
  public constructor(
    @Inject(API_URL_REGEX) private readonly apiUrlRegex: Readonly<RegExp>,
    @Inject(BEARER_TOKEN_CALLBACK_FN)
    private readonly bearerTokenCallback: () => string
  ) {}

  /**
   * Adds an Authorization HTTP header to HTTP requests sent via {@link https://angular.io/guide/http Angular HttpClient} if their request URL matches the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/injection-tokens/api-url-regex.ts API_URL_REGEX} value.
   *
   * @public
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<unknown>>}
   */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlMatch = this.apiUrlRegex.test(request.url);

    if (urlMatch) {
      const token = this.bearerTokenCallback();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
