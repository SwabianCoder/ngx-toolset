import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { RequestBodyDateFormatInterceptor } from './request-body-date-format.interceptor';
import { ResponseBodyDateParseInterceptor } from './response-body-date-parse.interceptor';

/**
 * The DateInterceptorsModule providing the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/request-body-date-format.interceptor.ts RequestBodyDateFormatInterceptor} and {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/date-interceptors/src/lib/response-body-date-parse.interceptor.ts ResponseBodyDateParseInterceptor}.
 *
 * @export
 * @class DateInterceptorsModule
 * @typedef {DateInterceptorsModule}
 */
@NgModule()
export class DateInterceptorsModule {
  /**
   * Creates an instance of DateInterceptorsModule.
   *
   * @constructor
   * @public
   * @param {DateInterceptorsModule} parentModule
   */
  public constructor(
    @Optional() @SkipSelf() parentModule: DateInterceptorsModule
  ) {
    if (parentModule) {
      throw new Error(
        'DateInterceptorsModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  /**
   * Creates the {@link https://angular.io/guide/singleton-services#the-forroot-pattern singleton services}.
   *
   * @public
   * @static
   * @returns {ModuleWithProviders<DateInterceptorsModule>}
   */
  public static forRoot(): ModuleWithProviders<DateInterceptorsModule> {
    return {
      ngModule: DateInterceptorsModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestBodyDateFormatInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseBodyDateParseInterceptor,
          multi: true,
        },
      ],
    };
  }
}
