# @ngx-toolset/api-token-interceptor

[![Build & Release](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_api-token-interceptor.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_api-token-interceptor.yml)
[![npm version](https://badge.fury.io/js/@ngx-toolset%2Fapi-token-interceptor.svg)](https://badge.fury.io/js/@ngx-toolset%2Fapi-token-interceptor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SwabianCoder/ngx-toolset/blob/main/LICENSE)
![](https://img.shields.io/badge/Keep%20a%20Changelog-v1.0.0-brightgreen.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)

## Table of Contents

- [@ngx-toolset/api-token-interceptor](#ngx-toolsetapi-token-interceptor)
  - [Features](#features)
  - [Installation](#installation)
    - [NPM](#npm)
  - [Usage](#usage)
    - [Module Import](#module-import)
    - [Provide Injection Tokens](#provide-injection-tokens)
  - [Injection Tokens](#injection-tokens)
    - [API_URL_REGEX](#api_url_regex)
    - [BEARER_TOKEN_CALLBACK_FN](#bearer_token_callback_fn)

## Features

- Adds an `Authorization` header to an HTTP request

> Hint: The features mentioned above only work when using [Angular HttpClient](https://angular.io/guide/http).

## Installation

### NPM

`npm install @ngx-toolset/api-token-interceptor --save`

Choose the version corresponding to your Angular version:

| Angular | @ngx-toolset/api-token-interceptor |
|---------|------------------------------------|
| 14.x.x  | >=0.0.1 <=1.0.0-rc.12              |
| 15.x.x  | 1.0.0-rc.13                        |
| 16.x.x  | >=1.0.0-rc.14 <=3.0.0              |
| 17.x.x  | 4.0.0                              |

## Usage

### Provide HTTP client with Interceptor

Provide the HTTP client with the `apiTokenInterceptor` in your `main.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { apiTokenInterceptor } from '@ngx-toolset/api-token-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        apiTokenInterceptor
      ])
    )
  ]
});
```

### Provide Injection Tokens

Provide `API_URL_REGEX` and `BEARER_TOKEN_CALLBACK_FN` in your `main.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  apiTokenInterceptor,
  API_URL_REGEX,
  BEARER_TOKEN_CALLBACK_FN
} from '@ngx-toolset/api-token-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        apiTokenInterceptor
      ])
    ),
    {
      provide: API_URL_REGEX,
      useValue: /^https:\/\/test-url.com/
    },
    {
      provide: BEARER_TOKEN_CALLBACK_FN,
      useValue: (): string => 'dummyToken'
    }
  ]
});
```

## Injection Tokens

### API_URL_REGEX

Only HTTP requests with URLs matching the Regex will receive an `Authorization` HTTP header.

### BEARER_TOKEN_CALLBACK_FN

This callback is used to build the value of the `Authorization` header.