import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { parse } from 'date-fns';
import { firstValueFrom, Observable, of } from 'rxjs';

import { createSpyObject } from '@ngneat/spectator';

import {
  API_DATE_FORMAT,
  API_URL_REGEX,
  DATE_STRING_REGEX,
} from './injection-tokens';
import { responseBodyDateParseInterceptor } from './response-body-date-parse.interceptor';

describe('ResponseBodyDateParseInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() =>
      responseBodyDateParseInterceptor(req, next),
    );
  const dummyRequest = createSpyObject(HttpRequest<unknown>);
  dummyRequest.castToWritable().headers = new HttpHeaders();
  const apiDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

  beforeEach(() => {
    TestBed.configureTestingModule({
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
  });

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
            new Date(),
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
              new Date(),
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
            new Date(),
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

      const next = (
        _request: HttpRequest<unknown>,
      ): Observable<HttpEvent<unknown>> => {
        const dummyResponse = new HttpResponse<unknown>({
          status: 200,
          body: testCase.httpResponse,
        });

        return of(dummyResponse);
      };

      const interceptResult$ = interceptor(dummyRequest, next);
      const interceptResult = await firstValueFrom(interceptResult$);

      expect((interceptResult as HttpResponse<unknown>).body).toEqual(
        testCase.expectedResponse,
      );

      return interceptResult;
    });
  }

  for (const testCase of [
    {
      description: 'root object of array item',
      expectedResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: '2020-02-02T12:45:30Z',
        },
      ],
      httpResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: '2020-02-02T12:45:30Z',
        },
      ],
    },
    {
      description: 'root object',
      expectedResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: '2020-02-02T12:45:30Z',
      },
      httpResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: '2020-02-02T12:45:30Z',
      },
    },
    {
      description: 'nested object of array item',
      expectedResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          inner: {
            birthday: '2020-02-02T12:45:30Z',
          },
        },
      ],
      httpResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          inner: {
            birthday: '2020-02-02T12:45:30Z',
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
          birthday: '2020-02-02T12:45:30Z',
        },
      },
      httpResponse: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        inner: {
          birthday: '2020-02-02T12:45:30Z',
        },
      },
    },
  ]) {
    // eslint-disable-next-line require-await
    it(`does not parse date strings of HTTP response body of ${testCase.description} with wrong format`, async (): Promise<
      HttpEvent<unknown>
    > => {
      dummyRequest.castToWritable().url = 'https://test-url.com/test';

      const next = (
        _request: HttpRequest<unknown>,
      ): Observable<HttpEvent<unknown>> => {
        const dummyResponse = new HttpResponse<unknown>({
          status: 200,
          body: testCase.httpResponse,
        });

        return of(dummyResponse);
      };

      const interceptResult$ = interceptor(dummyRequest, next);
      const interceptResult = await firstValueFrom(interceptResult$);

      expect((interceptResult as HttpResponse<unknown>).body).toEqual(
        testCase.expectedResponse,
      );

      return interceptResult;
    });
  }

  for (const testCase of [
    {
      description: 'root object of array item',
      expectedResponse: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: '2020-02-02T12:45:30.000Z',
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
        birthday: '2020-02-02T12:45:30.000Z',
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
            birthday: '2020-02-02T12:45:30.000Z',
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
          birthday: '2020-02-02T12:45:30.000Z',
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
    it(`does not parse date strings of HTTP response body of ${testCase.description} with wrong HTTP request URL`, async (): Promise<
      HttpEvent<unknown>
    > => {
      dummyRequest.castToWritable().url = 'https://demo-url.com/test';

      const next = (
        _request: HttpRequest<unknown>,
      ): Observable<HttpEvent<unknown>> => {
        const dummyResponse = new HttpResponse<unknown>({
          status: 200,
          body: testCase.httpResponse,
        });

        return of(dummyResponse);
      };

      const interceptResult$ = interceptor(dummyRequest, next);
      const interceptResult = await firstValueFrom(interceptResult$);

      expect((interceptResult as HttpResponse<unknown>).body).toEqual(
        testCase.expectedResponse,
      );

      return interceptResult;
    });
  }
});
