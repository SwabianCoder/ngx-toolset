import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_DATE_FORMAT, API_URL_REGEX } from './injection-tokens';
import { format } from 'date-fns';

/**
 * Description placeholder
 *
 * @export
 * @class RequestBodyDateFormatInterceptor
 * @typedef {RequestBodyDateFormatInterceptor}
 * @implements {HttpInterceptor}
 */
@Injectable()
export class RequestBodyDateFormatInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of RequestBodyDateFormatInterceptor.
   *
   * @constructor
   * @public
   * @param {Readonly<RegExp>} apiUrlRegex
   * @param {string} apiDateFormat
   */
  public constructor(
    @Inject(API_URL_REGEX) private readonly apiUrlRegex: Readonly<RegExp>,
    @Inject(API_DATE_FORMAT) private readonly apiDateFormat: string
  ) {}

  /**
   * Description placeholder
   *
   * @public
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<unknown>>}
   */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlMatch = this.apiUrlRegex.test(request.url);

    if (urlMatch && request.body) {
      this.convertDatesToDateStrings(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request.body as { [key: string]: any } | any[]
      );

      request = request.clone({
        body: request.body,
      });
    }

    return next.handle(request);
  }

  /**
   * Description placeholder
   *
   * @private
   * @param {?({ [key: string]: any } | any[])} [body]
   */
  private convertDatesToDateStrings(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: { [key: string]: any } | any[]
  ): void {
    if (body) {
      if (Array.isArray(body)) {
        for (const item of body) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.convertDatesToDateStrings(item);
        }
      } else if (typeof body === 'object') {
        for (const key of Object.keys(body)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const value = body[key];

          if (value instanceof Date) {
            body[key] = format(value, this.apiDateFormat);
          } else if (typeof value === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.convertDatesToDateStrings(value);
          }
        }
      }
    }
  }
}
