import { Type } from '@angular/core';

/**
 * Defines the structure of a {@link https://angular.io/api/core/NgModule NgModule}'s class required by {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/lazy-dialogs/src/lib/services/lazy-dialog.service.ts LazyDialogService}.
 *
 * @export
 * @abstract
 * @class ModuleWithLazyDialog
 * @typedef {ModuleWithLazyDialog}
 * @template T
 */
export abstract class ModuleWithLazyDialog<T> {
  /**
   * Returns the type of the component which represents a dialog.
   *
   * @public
   * @abstract
   * @returns {Type<T>}
   */
  public abstract getDialog(): Type<T>;
}
