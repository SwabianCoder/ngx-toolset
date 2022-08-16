import { firstValueFrom, Subject } from 'rxjs';
import { ComponentRef, NgModuleRef } from '@angular/core';
import { LazyDialogContainerComponent } from '../components';

export class LazyDialogRef<DataType> {
  public readonly data?: DataType;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly close$: Subject<any>;
  private containerComponentRef: ComponentRef<LazyDialogContainerComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private moduleRef?: NgModuleRef<unknown>;

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
    this.containerComponentRef.destroy();
    this.moduleRef?.destroy();
    this.close$.complete();
  }
}
