# ngx-toolset

[![Build & Release @ngx-toolset/api-token-interceptor](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_api-token-interceptor.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_api-token-interceptor.yml)

[![Build & Release @ngx-toolset/date-interceptors](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_date-interceptors.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_date-interceptors.yml)

[![Build & Release @ngx-toolset/lazy-dialogs](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_lazy-dialogs.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_lazy-dialogs.yml)

[![Build & Release @ngx-toolset/loading-spinner](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_loading-spinner.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_loading-spinner.yml)

[![Build & Release @ngx-toolset/template-type-checker](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_template-type-checker.yml/badge.svg)](https://github.com/SwabianCoder/ngx-toolset/actions/workflows/build_release_template-type-checker.yml)

[![npm version](https://badge.fury.io/js/@ngx-toolset%2Fapi-token-interceptor.svg)](https://badge.fury.io/js/@ngx-toolset%2Fapi-token-interceptor)

[![npm version](https://badge.fury.io/js/@ngx-toolset%2Fdate-interceptors.svg)](https://badge.fury.io/js/@ngx-toolset%2Fdate-interceptors)

[![npm version](https://badge.fury.io/js/@ngx-toolset%2Flazy-dialogs.svg)](https://badge.fury.io/js/@ngx-toolset%2Flazy-dialogs)

[![npm version](https://badge.fury.io/js/@ngx-toolset%2Floading-spinner.svg)](https://badge.fury.io/js/@ngx-toolset%2Floading-spinner)

[![npm version](https://badge.fury.io/js/@ngx-toolset%2Ftemplate-type-checker.svg)](https://badge.fury.io/js/@ngx-toolset%2Ftemplate-type-checker)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

![](https://img.shields.io/badge/Keep%20a%20Changelog-v1.0.0-brightgreen.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmMTVkMzAiIHZpZXdCb3g9IjAgMCAxODcgMTg1Ij48cGF0aCBkPSJNNjIgN2MtMTUgMy0yOCAxMC0zNyAyMmExMjIgMTIyIDAgMDAtMTggOTEgNzQgNzQgMCAwMDE2IDM4YzYgOSAxNCAxNSAyNCAxOGE4OSA4OSAwIDAwMjQgNCA0NSA0NSAwIDAwNiAwbDMtMSAxMy0xYTE1OCAxNTggMCAwMDU1LTE3IDYzIDYzIDAgMDAzNS01MiAzNCAzNCAwIDAwLTEtNWMtMy0xOC05LTMzLTE5LTQ3LTEyLTE3LTI0LTI4LTM4LTM3QTg1IDg1IDAgMDA2MiA3em0zMCA4YzIwIDQgMzggMTQgNTMgMzEgMTcgMTggMjYgMzcgMjkgNTh2MTJjLTMgMTctMTMgMzAtMjggMzhhMTU1IDE1NSAwIDAxLTUzIDE2bC0xMyAyaC0xYTUxIDUxIDAgMDEtMTItMWwtMTctMmMtMTMtNC0yMy0xMi0yOS0yNy01LTEyLTgtMjQtOC0zOWExMzMgMTMzIDAgMDE4LTUwYzUtMTMgMTEtMjYgMjYtMzMgMTQtNyAyOS05IDQ1LTV6TTQwIDQ1YTk0IDk0IDAgMDAtMTcgNTQgNzUgNzUgMCAwMDYgMzJjOCAxOSAyMiAzMSA0MiAzMiAyMSAyIDQxLTIgNjAtMTRhNjAgNjAgMCAwMDIxLTE5IDUzIDUzIDAgMDA5LTI5YzAtMTYtOC0zMy0yMy01MWE0NyA0NyAwIDAwLTUtNWMtMjMtMjAtNDUtMjYtNjctMTgtMTIgNC0yMCA5LTI2IDE4em0xMDggNzZhNTAgNTAgMCAwMS0yMSAyMmMtMTcgOS0zMiAxMy00OCAxMy0xMSAwLTIxLTMtMzAtOS01LTMtOS05LTEzLTE2YTgxIDgxIDAgMDEtNi0zMiA5NCA5NCAwIDAxOC0zNSA5MCA5MCAwIDAxNi0xMmwxLTJjNS05IDEzLTEzIDIzLTE2IDE2LTUgMzItMyA1MCA5IDEzIDggMjMgMjAgMzAgMzYgNyAxNSA3IDI5IDAgNDJ6bS00My03M2MtMTctOC0zMy02LTQ2IDUtMTAgOC0xNiAyMC0xOSAzN2E1NCA1NCAwIDAwNSAzNGM3IDE1IDIwIDIzIDM3IDIyIDIyLTEgMzgtOSA0OC0yNGE0MSA0MSAwIDAwOC0yNCA0MyA0MyAwIDAwLTEtMTJjLTYtMTgtMTYtMzEtMzItMzh6bS0yMyA5MWgtMWMtNyAwLTE0LTItMjEtN2EyNyAyNyAwIDAxLTEwLTEzIDU3IDU3IDAgMDEtNC0yMCA2MyA2MyAwIDAxNi0yNWM1LTEyIDEyLTE5IDI0LTIxIDktMyAxOC0yIDI3IDIgMTQgNiAyMyAxOCAyNyAzM3MtMiAzMS0xNiA0MGMtMTEgOC0yMSAxMS0zMiAxMXptMS0zNHYxNGgtOFY2OGg4djI4bDEwLTEwaDExbC0xNCAxNSAxNyAxOEg5NnoiLz48L3N2Zz4K)
