import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { parse } from 'date-fns';
import { of, switchMap } from 'rxjs';

import {
  API_DATE_FORMAT,
  API_URL_REGEX,
  DATE_STRING_REGEX,
} from './injection-tokens';

/**
 * The responseBodyDateParseInterceptor is responsible for converting date strings matching {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/injection-tokens/date-string-regex.ts DATE_STRING_REGEX} of body of HTTP response with an URL matching {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/injection-tokens/api-url-regex.ts API_URL_REGEX} to date objects.
 *
 * @param {HttpRequest<unknown>} req - An HTTP request
 * @param {HttpHandlerFn} next - An HTTP handler function
 */
export const responseBodyDateParseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiUrlRegex = inject(API_URL_REGEX);
  const dateStringRegex = inject(DATE_STRING_REGEX);
  const apiDateFormat = inject(API_DATE_FORMAT);

  let result$ = next(req);
  const urlMatch = apiUrlRegex.test(req.url);

  if (urlMatch) {
    result$ = result$.pipe(
      switchMap((event) => {
        if (event instanceof HttpResponse) {
          const castedBody = event.body as  // eslint-disable-next-line @typescript-eslint/no-explicit-any
            | { [key: string]: any }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            | any[]
            | null
            | undefined;
          convertDateStringsToDates(dateStringRegex, apiDateFormat, castedBody);
        }

        return of(event);
      })
    );
  }

  return result$;
};

/**
 * Converts properties of passed object that are date strings to date objects.
 *
 * @param {RegExp} [dateStringRegex]
 * @param {string} [apiDateFormat]
 * @param {({ [key: string]: any } | any[] | null | undefined)} [body]
 */
const convertDateStringsToDates = (
  dateStringRegex: RegExp,
  apiDateFormat: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: { [key: string]: any } | any[] | null | undefined
): void => {
  if (body) {
    if (Array.isArray(body)) {
      for (const item of body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        convertDateStringsToDates(dateStringRegex, apiDateFormat, item);
      }
    } else if (typeof body === 'object') {
      for (const key of Object.keys(body)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value = body[key];

        if (typeof value === 'string' && dateStringRegex.test(value)) {
          body[key] = parse(value, apiDateFormat, new Date());
        } else if (typeof value === 'object') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          convertDateStringsToDates(dateStringRegex, apiDateFormat, value);
        }
      }
    }
  }
};
