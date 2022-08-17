import { Type } from '@angular/core';

/**
 * Defines the structure of a NgModule's class required by @type {LazyDialogService}.
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
