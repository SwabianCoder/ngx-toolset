import { firstValueFrom, Subject } from 'rxjs';
import { ComponentRef, NgModuleRef } from '@angular/core';
import { LazyDialog } from './lazy-dialog';
import { ModuleWithLazyDialog } from './module-with-lazy-dialog';

export class LazyDialogRef<ComponentType extends LazyDialog, DataType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly close$: Subject<any>;
  private componentRef: ComponentRef<LazyDialog>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private moduleRef?: NgModuleRef<ModuleWithLazyDialog<ComponentType>>;
  public readonly data?: DataType;

  public constructor(
    componentRef: ComponentRef<LazyDialog>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleRef?: NgModuleRef<ModuleWithLazyDialog<ComponentType>>,
    data?: DataType
  ) {
    this.componentRef = componentRef;
    this.moduleRef = moduleRef;
    this.data = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.close$ = new Subject<any>();
    this.componentRef.instance.dialogRef = this;
    this.componentRef.instance.close = this.close.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(output?: any): void {
    this.close$.next(output);
    this.destroy();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async onClose(): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await firstValueFrom(this.close$);
  }

  private destroy(): void {
    this.componentRef.destroy();
    this.moduleRef?.destroy();
    this.close$.complete();
  }
}
