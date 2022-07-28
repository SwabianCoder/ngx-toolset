import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiTokenInterceptorConfig } from './interfaces';
import { API_TOKEN_INTERCEPTOR_CONFIG } from './injection-tokens';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  public constructor(
    @Inject(API_TOKEN_INTERCEPTOR_CONFIG)
    private readonly config: ApiTokenInterceptorConfig
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlMatch = this.config.apiUrlRegex.test(request.url);

    if (urlMatch) {
      const token = this.config.bearerTokenCallback();
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
