import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { format } from 'date-fns';

import { API_DATE_FORMAT, API_URL_REGEX } from './injection-tokens';

/**
 * The requestBodyDateFormatInterceptor is responsible for converting date objects of body of HTTP request having an URL matching {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/injection-tokens/api-url-regex.ts API_URL_REGEX} to date strings of {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/injection-tokens/api-date-format.ts defined format}.
 *
 * @param {HttpRequest<unknown>} req - An HTTP request
 * @param {HttpHandlerFn} next - An HTTP handler function
 */
export const requestBodyDateFormatInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiUrlRegex = inject(API_URL_REGEX);
  const apiDateFormat = inject(API_DATE_FORMAT);
  const urlMatch = apiUrlRegex.test(req.url);

  if (urlMatch && req.body) {
    const castedBody = req.body as  // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | { [key: string]: any }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | any[]
      | null
      | undefined;
    convertDatesToDateStrings(apiDateFormat, castedBody);

    req = req.clone({
      body: req.body,
    });
  }

  return next(req);
};

/**
 * Converts properties of passed object that are date objects to date strings.
 *
 * @param {string} [apiDateFormat]
 * @param {({ [key: string]: any } | any[] | null | undefined)} [body]
 */
const convertDatesToDateStrings = (
  apiDateFormat: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: { [key: string]: any } | any[] | null | undefined
): void => {
  if (body) {
    if (Array.isArray(body)) {
      for (const item of body) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        convertDatesToDateStrings(apiDateFormat, item);
      }
    } else if (typeof body === 'object') {
      for (const key of Object.keys(body)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value = body[key];

        if (value instanceof Date) {
          body[key] = format(value, apiDateFormat);
        } else if (typeof value === 'object') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          convertDatesToDateStrings(apiDateFormat, value);
        }
      }
    }
  }
};
