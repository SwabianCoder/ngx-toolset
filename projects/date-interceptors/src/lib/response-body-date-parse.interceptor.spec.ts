import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  createServiceFactory,
  createSpyObject,
  SpectatorService,
} from '@ngneat/spectator';
import { parse } from 'date-fns';
import { firstValueFrom, Observable, of } from 'rxjs';
import {
  API_DATE_FORMAT,
  API_URL_REGEX,
  DATE_STRING_REGEX,
} from './injection-tokens';
import { ResponseBodyDateParseInterceptor } from './response-body-date-parse.interceptor';

describe('ResponseBodyDateParseInterceptor', () => {
  let spectator: SpectatorService<ResponseBodyDateParseInterceptor>;
  const apiDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
  const createService = createServiceFactory({
    service: ResponseBodyDateParseInterceptor,
    providers: [
      { provide: API_URL_REGEX, useValue: /^https:\/\/test-url.com/ },
      {
        provide: DATE_STRING_REGEX,
        useValue: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      },
      {
        provide: API_DATE_FORMAT,
        useValue: apiDateFormat,
      },
    ],
  });
  const dummyRequest = createSpyObject(HttpRequest<unknown>);

  beforeEach(() => (spectator = createService()));

  for (const testCase of [
    {
      description: 'root object of array item',
      expectedResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: parse(
            '2020-02-02T12:45:30.000Z',
            apiDateFormat,
            new Date()
          ),
        },
      ],
      httpResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: '2020-02-02T12:45:30.000Z',
        },
      ],
    },
    {
      description: 'root object',
      expectedResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: parse('2020-02-02T12:45:30.000Z', apiDateFormat, new Date()),
      },
      httpResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: '2020-02-02T12:45:30.000Z',
      },
    },
    {
      description: 'nested object of array item',
      expectedResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          inner: {
            birthday: parse(
              '2020-02-02T12:45:30.000Z',
              apiDateFormat,
              new Date()
            ),
          },
        },
      ],
      httpResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          inner: {
            birthday: '2020-02-02T12:45:30.000Z',
          },
        },
      ],
    },
    {
      description: 'nested object',
      expectedResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        inner: {
          birthday: parse(
            '2020-02-02T12:45:30.000Z',
            apiDateFormat,
            new Date()
          ),
        },
      },
      httpResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        inner: {
          birthday: '2020-02-02T12:45:30.000Z',
        },
      },
    },
  ]) {
    // eslint-disable-next-line require-await
    it(`parses date strings of HTTP response body of ${testCase.description}`, async (): Promise<
      HttpEvent<unknown>
    > => {
      dummyRequest.castToWritable().url = 'https://test-url.com/test';

      const next = {
        handle(
          _request: HttpRequest<unknown>
        ): Observable<HttpResponse<unknown>> {
          const dummyResponse = new HttpResponse<unknown>({
            status: 200,
            body: testCase.httpResponse,
          });

          return of(dummyResponse);
        },
      };

      const interceptResult$ = spectator.service.intercept(dummyRequest, next);
      const interceptResult = await firstValueFrom(interceptResult$);

      expect((interceptResult as HttpResponse<unknown>).body).toEqual(
        testCase.expectedResponse
      );

      return interceptResult;
    });
  }
});
