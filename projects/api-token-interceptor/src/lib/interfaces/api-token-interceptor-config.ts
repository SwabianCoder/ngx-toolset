export interface ApiTokenInterceptorConfig {
  apiUrlRegex: RegExp;
  bearerTokenCallback: () => string;
}
