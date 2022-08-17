import { firstValueFrom, Subject } from 'rxjs';
import { ComponentRef, NgModuleRef } from '@angular/core';
import { LazyDialogContainerComponent } from '../components';

/**
 * The reference of a lazy dialog.
 *
 * @export
 * @class LazyDialogRef
 * @typedef {LazyDialogRef}
 * @template DataType
 */
export class LazyDialogRef<DataType> {
  /**
   * The data passed to the lazy dialog.
   *
   * @public
   * @readonly
   * @type {?DataType}
   */
  public readonly data?: DataType;

  /**
   * Represents the close event stream being called when @function @name close function is called.
   *
   * @private
   * @readonly
   * @type {Subject<any>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly close$: Subject<any>;

  /**
   * The reference of the dialog component's container component.
   *
   * @private
   * @type {ComponentRef<LazyDialogContainerComponent>}
   */
  private containerComponentRef: ComponentRef<LazyDialogContainerComponent>;

  /**
   * The module reference of the dialog component (optional: standalone components aren't related to a NgModule).
   *
   * @private
   * @type {?NgModuleRef<unknown>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private moduleRef?: NgModuleRef<unknown>;

  /**
   * Creates an instance of LazyDialogRef.
   *
   * @constructor
   * @public
   * @param {ComponentRef<LazyDialogContainerComponent>} containerComponentRef The reference of the dialog component's container component.
   * @param {?NgModuleRef<unknown>} [moduleRef] The module reference of the dialog component (optional: standalone components aren't related to a NgModule).
   * @param {?DataType} [data] The data of the lazy dialog.
   */
  public constructor(
    containerComponentRef: ComponentRef<LazyDialogContainerComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleRef?: NgModuleRef<unknown>,
    data?: DataType
  ) {
    this.containerComponentRef = containerComponentRef;
    this.moduleRef = moduleRef;
    this.data = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.close$ = new Subject<any>();
  }

  /**
   * Triggers the dialog close process as well as informing @function @name onClose with the provided @param {output} via @member {Subject<any>} close$.
   *
   * @public
   * @param {?*} [output]
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(output?: any): void {
    this.close$.next(output);
    this.destroy();
  }

  /**
   * Informs the consumer with the provided data about the dialog close event.
   *
   * @public
   * @async
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onClose(): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await firstValueFrom(this.close$);
  }

  /**
   * Destroys the dialog container, module reference and close$.
   *
   * @private
   */
  private destroy(): void {
    this.containerComponentRef.destroy();
    this.moduleRef?.destroy();
    this.close$.complete();
  }
}
