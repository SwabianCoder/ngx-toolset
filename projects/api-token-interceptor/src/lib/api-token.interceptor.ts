import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_REGEX, BEARER_TOKEN_CALLBACK_FN } from './injection-tokens';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  public constructor(
    @Inject(API_URL_REGEX) private readonly apiUrlRegex: RegExp,
    @Inject(BEARER_TOKEN_CALLBACK_FN)
    private readonly bearerTokenCallback: () => string
  ) {}

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

    // eslint-disable-next-line no-console
    console.log('Log: ', JSON.stringify(request.headers));

    return next.handle(request);
  }
}
