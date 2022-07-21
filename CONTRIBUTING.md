# Contributing to @ngx-toolset packages

Huge thanks for taking the time to contribute!

The following is a set of guidelines for contributing to any of the @ngx-toolset packages.

#### Table of Contents

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)
  * [Semantic Versioning](#semantic-versioning)
  * [Changelog](#changelog)

[Style Guides](#style-guides)
  * [Branch Naming Conventions](#branch-naming-conventions)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Style Guide](#javascript-style-guide)
  * [Specs Style Guide](#specs-style-guide)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## How Can I Contribute?

### Reporting Bugs

When you are creating a bug report, please fill out [the required template](./.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting a Bug Report

* You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem when using the latest version of the specific @ngx-toolset package(s).
* Check if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

### Suggesting Enhancements

When you are creating an enhancement suggestion, please fill in [the template](./.github/ISSUE_TEMPLATE/feature_request.md).

#### Before Submitting an Enhancement Suggestion

* Check if you're using the latest version of the specific @ngx-toolset package(s).
* Check if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

### Pull Requests

The process described here has several goals:

- Maintain the quality of the @ngx-toolset packages
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](./.github/pull_request_template.md)
2. Follow the [style guides](#style-guides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing.

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests or other changes before your pull request can be ultimately accepted.

### Semantic Versioning

Please update the version of the @ngx-toolset package when changing any code located in the project's directory or the root directory's JSON files, [.gitignore](./.gitignore) or [LICENSE](./LICENSE) file. To do so please execute [npm version](https://docs.npmjs.com/cli/v8/commands/npm-version).
> Note: When changing any of the files in root directory mentioned previously you need to update all project versions.

### Changelog

Please update the changelog of the @ngx-toolset package when changing any code located in the project's directory or changing JSON files, [.gitignore](./.gitignore) or [LICENSE](./LICENSE) file in the root directory.
The changelog format should follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format guidelines.
> Note: When changing any of the files in root directory mentioned previously you need to update all project changelogs.

## Style Guides

### Branch Naming Conventions

#### Branch Types

Please choose one of the following types of branches that fits your changes:

* feature: adding new functionality
* bugfix: fixing a bug in production code
* hotfix: fixing a critical bug in production code
* docs: changing the docs
* style: changing code style (e.g. adding missing semicolons etc.)
* refactor: refactoring production code
* test: changing/refactoring tests
* chore: changing CI/CD or configuration files

#### Branch Naming

Please find the branch naming format below:

```
<branch-type>/<issue-number>-<issue-title-separated-by-hyphens>
```

Sample usage:

```
feature/10-setup-eslint-prettier-and-stylelint
```

### Git Commit Messages

Please start the commit message with an applicable emoji (see [gitmoji](https://gitmoji.dev/)).

### Code Style Guide

All code is linted with [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [Stylelint](https://stylelint.io/).

### Specs Style Guide

- Include sophisticated [Jasmine](https://jasmine.github.io/) specs in the corresponding `<(directive|guard|interceptor|pipe|service|component)-name>.spec.ts` file(s) of the directive(s), guard(s), interceptor(s), pipe(s), service(s), component(s).
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.

#### Example

```js
describe('a dog', () => {
  it('barks', () => {
    // spec here
  });

  describe('when the dog is happy', () => {
    it('wags its tail', () => {
      // spec here
    });
  });
});
```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue and Issue State

| Label name | Description |
| --- | --- |
| `enhancement` | Feature requests. |
| `bug` | Confirmed bugs or reports that are very likely to be bugs. |
| `help-wanted` | The maintainers would appreciate help from the community in resolving these issues. |
| `more-information-needed` | More information needs to be collected about these problems or feature requests (e.g. steps to reproduce). |
| `needs-reproduction` | Likely bugs, but haven't been reliably reproduced. |
| `duplicate` | Issues which are duplicates of other issues, i.e. they have been reported before. |
| `wontfix` | The maintainers have decided not to fix these issues. |
| `invalid` | Issues which aren't valid (e.g. user errors). |

#### Pull Request Labels

| Label name | Description |
| --- | --- |
| `work-in-progress` | Pull requests which are still being worked on, more changes will follow. |
| `needs-review` | Pull requests which need code review and approval from maintainers. |
| `under-review` | Pull requests being reviewed by maintainers. |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again. |
| `needs-testing` | Pull requests which need manual testing. |
