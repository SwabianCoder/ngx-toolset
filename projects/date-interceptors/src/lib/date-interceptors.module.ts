import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { RequestBodyDateFormatInterceptor } from './request-body-date-format.interceptor';
import { ResponseBodyDateParseInterceptor } from './response-body-date-parse.interceptor';

@NgModule()
export class DateInterceptorsModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: DateInterceptorsModule
  ) {
    if (parentModule) {
      throw new Error(
        'DateInterceptorsModule is already loaded. Import it in the AppModule only'
      );
    }
  }

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
