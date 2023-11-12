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

import { API_DATE_FORMAT, API_URL_REGEX } from './injection-tokens';
import { requestBodyDateFormatInterceptor } from './request-body-date-format.interceptor';

describe('RequestBodyDateFormatInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() =>
      requestBodyDateFormatInterceptor(req, next),
    );
  const dummyRequest = createSpyObject(HttpRequest<unknown>);
  dummyRequest.castToWritable().headers = new HttpHeaders();
  const apiDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL_REGEX, useValue: /^https:\/\/test-url.com/ },
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
      expectedRequest: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          birthday: '2020-02-02T12:45:30.000Z',
        },
      ],
      httpRequest: [
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
    },
    {
      description: 'root object',
      expectedRequest: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: '2020-02-02T12:45:30.000Z',
      },
      httpRequest: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        birthday: parse('2020-02-02T12:45:30.000Z', apiDateFormat, new Date()),
      },
    },
    {
      description: 'nested object of array item',
      expectedRequest: [
        {
          id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
          lastName: 'someLastName',
          inner: {
            birthday: '2020-02-02T12:45:30.000Z',
          },
        },
      ],
      httpRequest: [
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
    },
    {
      description: 'nested object',
      expectedRequest: {
        id: '9ed84cf1-9f77-4ce7-9b48-dc7b49d5801e',
        lastName: 'someLastName',
        inner: {
          birthday: '2020-02-02T12:45:30.000Z',
        },
      },
      httpRequest: {
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
    },
  ]) {
    it(`formats date objects of HTTP request body of ${testCase.description}`, async (): Promise<
      HttpEvent<unknown>
      // eslint-disable-next-line require-await
    > => {
      const requestUrl = 'https://test-url.com/test';
      dummyRequest.castToWritable().url = requestUrl;
      dummyRequest.castToWritable().body = testCase.httpRequest;
      dummyRequest.clone.andCallFake((update: { body?: unknown | null }) =>
        new HttpRequest<unknown>('GET', requestUrl).clone(update),
      );

      const next = (
        _request: HttpRequest<unknown>,
      ): Observable<HttpEvent<unknown>> => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(dummyRequest.clone).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(dummyRequest.clone).toHaveBeenCalledWith({
          body: testCase.expectedRequest,
        });

        const httpResponse = new HttpResponse({ status: 200 });

        return of(httpResponse);
      };

      const interceptResult$ = interceptor(dummyRequest, next);
      const interceptResult = firstValueFrom(interceptResult$);

      dummyRequest.clone.reset();

      return interceptResult;
    });
  }

  it(`does not format date objects of HTTP request body when HTTP request body is empty`, async (): Promise<
    HttpEvent<unknown>
    // eslint-disable-next-line require-await
  > => {
    dummyRequest.castToWritable().url = 'https://test-url.com/test';
    dummyRequest.castToWritable().body = null;
    dummyRequest.clone.reset();

    const next = (
      _request: HttpRequest<unknown>,
    ): Observable<HttpEvent<unknown>> => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(dummyRequest.clone).toHaveBeenCalledTimes(0);

      const httpResponse = new HttpResponse({ status: 200 });

      return of(httpResponse);
    };

    const interceptResult$ = interceptor(dummyRequest, next);
    const interceptResult = firstValueFrom(interceptResult$);

    return interceptResult;
  });

  it(`does not format date objects of HTTP request body when HTTP request URL is wrong`, async (): Promise<
    HttpEvent<unknown>
    // eslint-disable-next-line require-await
  > => {
    dummyRequest.castToWritable().url = 'https://demo-url.com/test';
    dummyRequest.castToWritable().body = {};
    dummyRequest.clone.reset();

    const next = (
      _request: HttpRequest<unknown>,
    ): Observable<HttpEvent<unknown>> => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(dummyRequest.clone).toHaveBeenCalledTimes(0);

      const httpResponse = new HttpResponse({ status: 200 });

      return of(httpResponse);
    };

    const interceptResult$ = interceptor(dummyRequest, next);
    const interceptResult = firstValueFrom(interceptResult$);

    return interceptResult;
  });
});
