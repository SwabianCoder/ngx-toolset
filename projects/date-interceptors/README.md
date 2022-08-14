# @ngx-toolset/date-interceptors

[![Build & Release @ngx-toolset/date-interceptors](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_date-interceptors.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_date-interceptors.yml)
[![npm version](https://badge.fury.io/js/@ngx-toolset%2Fdate-interceptors.svg)](https://badge.fury.io/js/@ngx-toolset%2Fdate-interceptors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SwabianCoder/ngx-toolset/blob/main/LICENSE)
![](https://img.shields.io/badge/Keep%20a%20Changelog-v1.0.0-brightgreen.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)

## Table of Contents

- [@ngx-toolset/date-interceptors](#ngx-toolsetdate-interceptors)
  - [Features](#features)
  - [Installation](#installation)
    - [NPM](#npm)
  - [Usage](#usage)
    - [Module Import](#module-import)
    - [Provide Injection Tokens](#provide-injection-tokens)
  - [Injection Tokens](#injection-tokens)
    - [API_DATE_FORMAT](#api_date_format)
    - [API_URL_REGEX](#api_url_regex)
    - [DATE_STRING_REGEX](#date_string_regex)

## Features

- Parses date strings of given format in HTTP response body to date objects
- Formats date objects in HTTP request body to date strings of given format

> Hint: The features mentioned above only work when using [Angular HttpClient](https://angular.io/guide/http).

## Installation

### NPM

`npm install @ngx-toolset/date-interceptors date-fns@^2.0.0 rxjs@^7.0.0 --save`

## Usage

### Module Import

Import the `DateInterceptorsModule` in your `AppModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DateInterceptorsModule } from '@ngx-toolset/date-interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DateInterceptorsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Provide Injection Tokens

Provide `API_DATE_FORMAT`, `API_URL_REGEX` and `DATE_STRING_REGEX` in your `AppModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  DateInterceptorsModule,
  API_URL_REGEX,
  DATE_STRING_REGEX,
  API_DATE_FORMAT
} from '@ngx-toolset/date-interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DateInterceptorsModule.forRoot(),
  ],
  providers: [
    {
      provide: API_URL_REGEX,
      useValue: /^https:\/\/test-url.com/
    },
    {
      provide: DATE_STRING_REGEX,
      useValue: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    },
    {
      provide: API_DATE_FORMAT,
      useValue: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> Hint: The list of options to provide `API_DATE_FORMAT` value could be found here: [date-fns documentation](https://date-fns.org/v2.29.1/docs/parse).

## Injection Tokens

### API_DATE_FORMAT

This is the string representation of dates of HTTP response body that are parsed to date objects. Also this value is used to format date objects in HTTP request body to date strings with the given format.

> Hint: The list of options to provide `API_DATE_FORMAT` value could be found here: [date-fns documentation](https://date-fns.org/v2.29.1/docs/parse).

### API_URL_REGEX

Only HTTP requests and HTTP responses with URLs matching the Regex will benefit from date conversions.

### DATE_STRING_REGEX

Only date strings of HTTP response body matching the Regex will be parsed to date objects.
