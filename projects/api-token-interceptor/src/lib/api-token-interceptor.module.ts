import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiTokenInterceptor } from './api-token.interceptor';

/**
 * The ApiTokenInterceptorModule providing the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/api-token-interceptor/src/lib/api-token.interceptor.ts ApiTokenInterceptor}.
 *
 * @export
 * @class ApiTokenInterceptorModule
 * @typedef {ApiTokenInterceptorModule}
 */
@NgModule()
export class ApiTokenInterceptorModule {
  /**
   * Creates an instance of ApiTokenInterceptorModule.
   *
   * @constructor
   * @public
   * @param {ApiTokenInterceptorModule} parentModule
   */
  public constructor(
    @Optional() @SkipSelf() parentModule: ApiTokenInterceptorModule
  ) {
    if (parentModule) {
      throw new Error(
        'ApiTokenInterceptorModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  /**
   * Creates the {@link https://angular.io/guide/singleton-services#the-forroot-pattern singleton services}.
   *
   * @public
   * @static
   * @returns {ModuleWithProviders<ApiTokenInterceptorModule>}
   */
  public static forRoot(): ModuleWithProviders<ApiTokenInterceptorModule> {
    return {
      ngModule: ApiTokenInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiTokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
