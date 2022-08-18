import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import {
  API_DATE_FORMAT,
  API_URL_REGEX,
  DATE_STRING_REGEX,
} from './injection-tokens';
import { parse } from 'date-fns';

/**
 * Description placeholder
 *
 * @export
 * @class ResponseBodyDateParseInterceptor
 * @typedef {ResponseBodyDateParseInterceptor}
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ResponseBodyDateParseInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of ResponseBodyDateParseInterceptor.
   *
   * @constructor
   * @public
   * @param {Readonly<RegExp>} apiUrlRegex
   * @param {Readonly<RegExp>} dateStringRegex
   * @param {string} apiDateFormat
   */
  public constructor(
    @Inject(API_URL_REGEX) private readonly apiUrlRegex: Readonly<RegExp>,
    @Inject(DATE_STRING_REGEX)
    private readonly dateStringRegex: Readonly<RegExp>,
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
    let result$ = next.handle(request);
    const urlMatch = this.apiUrlRegex.test(request.url);

    if (urlMatch) {
      result$ = result$.pipe(
        switchMap((event) => {
          if (event instanceof HttpResponse) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.convertDateStringsToDates(event.body);
          }

          return of(event);
        })
      );
    }

    return result$;
  }

  /**
   * Description placeholder
   *
   * @private
   * @param {?({ [key: string]: any } | any[])} [body]
   */
  private convertDateStringsToDates(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: { [key: string]: any } | any[]
  ): void {
    if (body) {
      if (Array.isArray(body)) {
        for (const item of body) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.convertDateStringsToDates(item);
        }
      } else if (typeof body === 'object') {
        for (const key of Object.keys(body)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const value = body[key];

          if (typeof value === 'string' && this.dateStringRegex.test(value)) {
            body[key] = parse(value, this.apiDateFormat, new Date());
          } else if (typeof value === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.convertDateStringsToDates(value);
          }
        }
      }
    }
  }
}
