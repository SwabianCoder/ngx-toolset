import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiTokenInterceptor } from './api-token.interceptor';
import { ApiTokenInterceptorConfig } from './interfaces';
import { API_TOKEN_INTERCEPTOR_CONFIG } from './injection-tokens';

@NgModule()
export class ApiTokenInterceptorModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: ApiTokenInterceptorModule
  ) {
    if (parentModule) {
      throw new Error(
        'ApiTokenInterceptorModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(
    config: ApiTokenInterceptorConfig
  ): ModuleWithProviders<ApiTokenInterceptorModule> {
    return {
      ngModule: ApiTokenInterceptorModule,
      providers: [
        {
          provide: API_TOKEN_INTERCEPTOR_CONFIG,
          useValue: config,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiTokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
