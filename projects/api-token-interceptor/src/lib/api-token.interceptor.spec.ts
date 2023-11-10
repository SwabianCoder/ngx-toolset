import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { firstValueFrom, Observable, of } from 'rxjs';

import { createSpyObject } from '@ngneat/spectator';

import { apiTokenInterceptor } from './api-token.interceptor';
import { API_URL_REGEX, BEARER_TOKEN_CALLBACK_FN } from './injection-tokens';

describe('apiTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiTokenInterceptor(req, next));
  const dummyRequest = createSpyObject(HttpRequest<unknown>);
  dummyRequest.castToWritable().headers = new HttpHeaders();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL_REGEX, useValue: /^https:\/\/test-url.com/ },
        {
          provide: BEARER_TOKEN_CALLBACK_FN,
          useValue: (): string => 'dummyToken',
        },
      ],
    });
  });

  // eslint-disable-next-line require-await
  it('appends a token', async (): Promise<HttpEvent<unknown>> => {
    const requestUrl = 'https://test-url.com';
    dummyRequest.castToWritable().url = requestUrl;
    dummyRequest.clone.andCallFake(
      (update: {
        setHeaders?: {
          [name: string]: string | string[];
        };
      }) => new HttpRequest<unknown>('GET', requestUrl).clone(update)
    );

    const next: HttpHandlerFn = (
      request: HttpRequest<unknown>
    ): Observable<HttpResponse<unknown>> => {
      expect(request.headers.has('Authorization')).toBeTrue();
      expect(request.headers.get('Authorization')).toBe('Bearer dummyToken');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(dummyRequest.clone).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(dummyRequest.clone).toHaveBeenCalledWith({
        setHeaders: { Authorization: 'Bearer dummyToken' },
      });

      const httpResponse = new HttpResponse({ status: 200 });

      return of(httpResponse);
    };

    const interceptResult$ = interceptor(dummyRequest, next);
    const interceptResult = firstValueFrom(interceptResult$);

    dummyRequest.clone.reset();

    return interceptResult;
  });

  // eslint-disable-next-line require-await
  it('does not append a token', async (): Promise<HttpEvent<unknown>> => {
    const requestUrl = 'https://some-url.com';
    dummyRequest.castToWritable().url = requestUrl;
    dummyRequest.clone.andCallFake(
      (update: {
        setHeaders?: {
          [name: string]: string | string[];
        };
      }) => new HttpRequest<unknown>('GET', requestUrl).clone(update)
    );

    const next: HttpHandlerFn = (
      request: HttpRequest<unknown>
    ): Observable<HttpEvent<unknown>> => {
      expect(request.headers.has('Authorization')).toBeFalse();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(dummyRequest.clone).toHaveBeenCalledTimes(0);

      const httpResponse = new HttpResponse({ status: 200 });

      return of(httpResponse);
    };

    const interceptResult$ = interceptor(dummyRequest, next);
    const interceptResult = firstValueFrom(interceptResult$);

    dummyRequest.clone.reset();

    return interceptResult;
  });
});
