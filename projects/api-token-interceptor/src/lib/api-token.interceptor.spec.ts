import {
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
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
      { provide: API_URL_REGEX, useValue: /^https:\/\/test-url.com/ },
      {
        provide: BEARER_TOKEN_CALLBACK_FN,
        useValue: (): string => 'dummyToken',
      },
    ],
  });
  const dummyRequest = createSpyObject(HttpRequest<unknown>);

  beforeEach(() => (spectator = createService()));

  for (const testCase of [
    {
      message: 'append token',
      url: 'https://test-url.com',
      hasToken: true,
    },
    {
      message: 'not append token',
      url: 'https://some-url.com',
      hasToken: false,
    },
  ]) {
    // eslint-disable-next-line require-await
    it(`should ${testCase.message}`, async (): Promise<HttpEvent<unknown>> => {
      dummyRequest.castToWritable().headers = new HttpHeaders({});
      dummyRequest.castToWritable().url = testCase.url;

      const next = {
        handle(
          request: HttpRequest<unknown>
        ): Observable<HttpResponse<unknown>> {
          expect(request.headers.has('Authorization')).toBe(testCase.hasToken);
          const httpResponse = new HttpResponse({ status: 200 });

          return of(httpResponse);
        },
      };

      const interceptResult$ = spectator.service.intercept(dummyRequest, next);
      const interceptResult = firstValueFrom(interceptResult$);

      return interceptResult;
    });
  }
});
