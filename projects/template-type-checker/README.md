# @ngx-toolset/template-type-checker

[![Build & Release @ngx-toolset/template-type-checker](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_template-type-checker.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_template-type-checker.yml)
[![npm version](https://badge.fury.io/js/@ngx-toolset%2Ftemplate-type-checker.svg)](https://badge.fury.io/js/@ngx-toolset%2Ftemplate-type-checker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/SwabianCoder/ngx-toolset/blob/main/LICENSE)
![](https://img.shields.io/badge/Keep%20a%20Changelog-v1.0.0-brightgreen.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)

## Table of Contents

- [@ngx-toolset/template-type-checker](#ngx-toolsettemplate-type-checker)
  - [Features](#features)
  - [Installation](#installation)
    - [NPM](#npm)
  - [Usage](#usage)
    - [Module Import](#module-import)
    - [TS](#ts)
    - [HTML](#html)

## Features

- Possibility to validate object's class instance type in HTML template

## Installation

### NPM

`npm install @ngx-toolset/template-type-checker --save`

Choose the version corresponding to your Angular version:

| Angular | @ngx-toolset/template-type-checker |
|---------|------------------------------------|
| 14.x.x  | 1.x.x                              |

## Usage

### Module Import

Import the `TemplateTypeCheckerModule` in the module(s) you would like to use the `TypeCheckerPipe`:

```ts
import { NgModule } from '@angular/core';
import { SampleComponent } from './sample.component';
import { TemplateTypeCheckerModule } from '@ngx-toolset/template-type-checker';

@NgModule({
  declarations: [SampleComponent],
  imports: [
    TemplateTypeCheckerModule,
  ],
})
export class SampleModule {}
```

### TS

```ts
import { Component } from '@angular/core';

class ClassA {}

class ClassB {}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  public classA: typeof ClassA;
  public classB: typeof ClassB;
  public sampleObject: ClassA;

  public constructor() {
    this.classA = ClassA;
    this.classB = ClassB;
    this.sampleObject = new ClassA();
  }
}
```

### HTML

```html
<!-- TypeCheckerPipe returns object of type ClassA -> ngIf evaluates to truthy value -->
<div *ngIf="sampleObject | typeChecker:classA">
  This div will be rendered.
</div>

<!-- TypeCheckerPipe returns undefined -> ngIf evaluates to falsy value -->
<div *ngIf="sampleObject | typeChecker:classB">
  This div will not be rendered.
</div>
```