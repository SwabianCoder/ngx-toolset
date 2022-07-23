import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import {
  createServiceFactory,
  SpectatorService,
  createSpyObject,
} from '@ngneat/spectator';
import { ApiTokenInterceptor } from './api-token.interceptor';
import { API_URL_REGEX, BEARER_TOKEN_CALLBACK_FN } from './injection-tokens';

describe('ApiTokenInterceptor', () => {
  let spectator: SpectatorService<ApiTokenInterceptor>;
  const createService = createServiceFactory({
    service: ApiTokenInterceptor,
    providers: [
      { provide: API_URL_REGEX, useValue: (): string => 'dummyToken' },
      {
        provide: BEARER_TOKEN_CALLBACK_FN,
        useValue: /^https:\/\/test-url.com/,
      },
    ],
  });
  const dummyRequest = createSpyObject(HttpRequest<unknown>);

  beforeEach(() => (spectator = createService()));

  for (const testCase of [
    {
      message: 'append token',
      urlStart: 'https://test-url.com',
      hasToken: true,
    },
    {
      message: 'not append token',
      urlStart: 'https://some-url.com',
      hasToken: false,
    },
  ]) {
    // eslint-disable-next-line require-await
    it(`should ${testCase.message}`, async (): Promise<HttpEvent<unknown>> => {
      const next = {
        handle(
          request: HttpRequest<unknown>
        ): Observable<HttpResponse<unknown>> {
          expect(request.headers.has('Authorization')).toBe(testCase.hasToken);
          const httpResponse = new HttpResponse({ status: 200 });

          return of(httpResponse);
        },
      };

      console.log(spectator.inject(API_URL_REGEX));
      console.log(spectator.inject(BEARER_TOKEN_CALLBACK_FN));
      const interceptResult$ = spectator.service.intercept(dummyRequest, next);
      const interceptResult = firstValueFrom(interceptResult$);

      return interceptResult;
    });
  }
});
