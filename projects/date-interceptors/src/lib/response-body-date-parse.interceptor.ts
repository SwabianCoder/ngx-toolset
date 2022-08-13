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

@Injectable()
export class ResponseBodyDateParseInterceptor implements HttpInterceptor {
  public constructor(
    @Inject(API_URL_REGEX) private readonly apiUrlRegex: Readonly<RegExp>,
    @Inject(DATE_STRING_REGEX)
    private readonly dateStringRegex: Readonly<RegExp>,
    @Inject(API_DATE_FORMAT) private readonly apiDateFormat: string
  ) {}

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
            this.convertDateStringsToDates(event.body);
          }

          return of(event);
        })
      );
    }

    return result$;
  }

  private convertDateStringsToDates(
    body?: { [key: string]: any } | any[]
  ): void {
    if (body) {
      if (Array.isArray(body)) {
        for (const item of body) {
          this.convertDateStringsToDates(item);
        }
      } else if (typeof body === 'object') {
        for (const key of Object.keys(body)) {
          const value = body[key];

          if (typeof value === 'string' && this.dateStringRegex.test(value)) {
            body[key] = parse(value, this.apiDateFormat, new Date());
          } else if (typeof value === 'object') {
            this.convertDateStringsToDates(value);
          }
        }
      }
    }
  }
}
