# @ngx-toolset/lazy-dialogs

[![Build & Release](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_lazy-dialogs.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_lazy-dialogs.yml)
[![npm version](https://badge.fury.io/js/@ngx-toolset%2Flazy-dialogs.svg)](https://badge.fury.io/js/@ngx-toolset%2Flazy-dialogs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SwabianCoder/ngx-toolset/blob/main/LICENSE)
![](https://img.shields.io/badge/Keep%20a%20Changelog-v1.0.0-brightgreen.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)

## Table of Contents

- [@ngx-toolset/lazy-dialogs](#ngx-toolsetlazy-dialogs)
  - [Features](#features)
  - [Installation](#installation)
    - [NPM](#npm)
  - [Usage](#usage)
    - [Module Import](#module-import)
    - [Dialog Container and Background Overlay Styles](#dialog-container-and-background-overlay-styles)

## Features

- Creates (opens) a dialog via lazy loading (works with NgModule extending ModuleWithLazyDialog<T> as well as standalone components)

## Installation

### NPM

`npm install @ngx-toolset/lazy-dialogs --save`

Choose the version corresponding to your Angular version:

| Angular | @ngx-toolset/lazy-dialogs |
|---------|---------------------------|
| 14.x.x  | 1.x.x                     |

## Usage

### Module Import

Import the `LazyDialogModule` in your `AppModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LazyDialogModule } from '@ngx-toolset/lazy-dialogs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LazyDialogModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Dialog Container and Background Overlay Styles

Provide your own CSS styles for the dialog's container which can also act as the dialog's background overlay to the `forRoot` function of the `LazyDialogModule`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LazyDialogModule } from '@ngx-toolset/lazy-dialogs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LazyDialogModule.forRoot({
      // Sample CSS styles
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      'background-color': '#000000',
      opacity: 0.7,
      'z-index': 1000,
      width: '100%',
      height: '100%'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```