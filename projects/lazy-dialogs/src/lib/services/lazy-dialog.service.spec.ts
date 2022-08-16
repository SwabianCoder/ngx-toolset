import { Component, NgModule } from '@angular/core';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { LAZY_DIALOG_CONTAINER_STYLES } from '../injection-tokens';
import { LazyDialogRef, ModuleWithLazyDialog } from '../models';
import { LazyDialogService } from './lazy-dialog.service';

@Component({
  selector: 'ngx-toolset-standalone-dialog-component',
  standalone: true,
  template: '',
})
export class StandaloneDialogComponent {
  public data: unknown;

  public constructor(private dialogRef: LazyDialogRef<unknown>) {
    this.data = this.dialogRef.data;
  }
}

@Component({
  selector: 'ngx-toolset-dialog-with-module-component',
  template: '',
})
export class DialogWithModuleComponent {
  public data: unknown;

  public constructor(private dialogRef: LazyDialogRef<unknown>) {
    this.data = this.dialogRef.data;
  }
}

@NgModule({
  declarations: [DialogWithModuleComponent],
})
export class DialogWithModuleComponentModule extends ModuleWithLazyDialog<DialogWithModuleComponent> {
  public getDialog(): typeof DialogWithModuleComponent {
    return DialogWithModuleComponent;
  }
}

@Component({
  selector: 'ngx-toolset-dialog-with-module-component',
  template: '',
})
export class DialogWithInvalidModuleComponent {
  public data: unknown;

  public constructor(private dialogRef: LazyDialogRef<unknown>) {
    this.data = this.dialogRef.data;
  }
}

@NgModule({
  declarations: [DialogWithInvalidModuleComponent],
})
export class DialogWithInvalidModuleComponentModule {}

describe('LazyDialogService', () => {
  let spectator: SpectatorService<LazyDialogService>;
  const createService = createServiceFactory({
    service: LazyDialogService,
    providers: [
      {
        provide: LAZY_DIALOG_CONTAINER_STYLES,
        useValue: {},
      },
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('creates instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('creates lazy dialog from standalone component with data', async (): Promise<void> => {
    const creationResult = await spectator.service.create(
      Promise.resolve(StandaloneDialogComponent),
      {
        test: 'data',
      }
    );

    expect(creationResult).toBeTruthy();
    expect(creationResult.data).toBeTruthy();
    expect(creationResult.data).toEqual({ test: 'data' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.close).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.onClose).toBeTruthy();
  });

  it('creates lazy dialog from standalone component without data', async (): Promise<void> => {
    const creationResult = await spectator.service.create(
      Promise.resolve(StandaloneDialogComponent)
    );

    expect(creationResult).toBeTruthy();
    expect(creationResult.data).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.close).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.onClose).toBeTruthy();
  });

  it('creates lazy dialog from standalone component with data', async (): Promise<void> => {
    const creationResult = await spectator.service.create(
      Promise.resolve(DialogWithModuleComponentModule),
      {
        test: 'data',
      }
    );

    expect(creationResult).toBeTruthy();
    expect(creationResult.data).toBeTruthy();
    expect(creationResult.data).toEqual({ test: 'data' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.close).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.onClose).toBeTruthy();
  });

  it('creates lazy dialog from standalone component without data', async (): Promise<void> => {
    const creationResult = await spectator.service.create(
      Promise.resolve(DialogWithModuleComponentModule)
    );

    expect(creationResult).toBeTruthy();
    expect(creationResult.data).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.close).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(creationResult.onClose).toBeTruthy();
  });

  it('creation of lazy dialog fails for NgModule not extending ModuleWithLazyDialog<T>', async (): Promise<void> => {
    await expectAsync(
      spectator.service.create(
        Promise.resolve(DialogWithInvalidModuleComponentModule)
      )
    ).toBeRejected();
  });

  it('creation of lazy dialog fails for types that are neither standalone components nor NgModules extending ModuleWithLazyDialog<T>', async (): Promise<void> => {
    await expectAsync(
      spectator.service.create(Promise.resolve(Date))
    ).toBeRejected();
  });
});
