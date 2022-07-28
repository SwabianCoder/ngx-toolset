import { InjectionToken } from '@angular/core';
import { ApiTokenInterceptorConfig } from '../interfaces';

export const API_TOKEN_INTERCEPTOR_CONFIG: InjectionToken<ApiTokenInterceptorConfig> =
  new InjectionToken<ApiTokenInterceptorConfig>('API_TOKEN_INTERCEPTOR_CONFIG');
