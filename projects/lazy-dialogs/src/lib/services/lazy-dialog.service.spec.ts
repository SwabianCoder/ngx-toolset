import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, ComponentRef, createNgModule, ElementRef, EnvironmentInjector, Injector, NgModule, NgModuleRef, Renderer2, RendererFactory2, RendererType2, Type, ViewContainerRef } from '@angular/core';
import { SpectatorService, createServiceFactory, createSpyObject, SpyObject } from '@ngneat/spectator';
import { LazyDialogContainerComponent } from '../components';
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

const mockRenderer = {
  createElement: function(name: string, namespace?: string | null | undefined): any {
    return document.createElement('div');
  },
  addClass:function(el: any, name: string): void{},
  appendChild:function(parent: any, newChild: any): void{}
} as Renderer2;

const mockComponentRef = {
  instance: {
    dialogContainer: {
      createComponent: function<C>(componentType: Type<C>, options?: {
          index?: number;
          injector?: Injector;
          ngModuleRef?: NgModuleRef<unknown>;
          environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>;
          projectableNodes?: Node[][];
      }): ComponentRef<C> {
        return {} as ComponentRef<C>;
      },
    }
  }
} as unknown as ComponentRef<any>;

describe('LazyDialogService', () => {
  let spectator: SpectatorService<LazyDialogService>;
  const createService = createServiceFactory({
    service: LazyDialogService,
    providers: [
      {
        provide: LAZY_DIALOG_CONTAINER_STYLES,
        useValue: {},
      },
      {
        provide: RendererFactory2,
        useValue: {
          createRenderer: function(element: any, type: RendererType2 | null): Renderer2 {
            return mockRenderer;
          },
        }
      },
      {
        provide: ApplicationRef,
        useValue: {
          bootstrap: function<C>(component: Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C> {
            return mockComponentRef;
          }
        }
      }
    ]
  });

  beforeEach(async () => {
    spectator = createService();
     applicationRef = spectator.inject(ApplicationRef);
    injector = spectator.inject(Injector);

     createElementSpy = spyOn(mockRenderer,'createElement').and.callThrough();
     addClassSpy = spyOn(mockRenderer,'addClass').and.callThrough();
     appendChildSpy = spyOn(mockRenderer,'appendChild').and.callThrough();
     bootstrapSpy = spyOn(applicationRef, 'bootstrap').and.callThrough();
     createComponentSpy = spyOn(mockComponentRef.instance.dialogContainer, 'createComponent').and.callThrough();

     dialogContainerComponent = await import(
      '../components/lazy-dialog-container/lazy-dialog-container.component'
    ).then((m) => m.LazyDialogContainerComponent);
    divElement = document.createElement('div');
  });

  let dialogContainerComponent: Type<LazyDialogContainerComponent>;
  let applicationRef: SpyObject<ApplicationRef>;
  let injector : SpyObject<Injector>;
  let createElementSpy: jasmine.Spy;
  let addClassSpy: jasmine.Spy;
  let appendChildSpy:jasmine.Spy;
  let bootstrapSpy:jasmine.Spy;
  let createComponentSpy: jasmine.Spy;
  let divElement: HTMLDivElement;

  it('creates instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  fit('creates lazy dialog from standalone component with data', async (): Promise<void> => {
    const creationResult = await spectator.service.create(
      Promise.resolve(StandaloneDialogComponent),
      {
        test: 'data',
      }
    );

    expect(createElementSpy).toHaveBeenCalledTimes(1);
    expect(createElementSpy).toHaveBeenCalledWith('div');
    expect(addClassSpy).toHaveBeenCalledTimes(1);
    expect(addClassSpy).toHaveBeenCalledWith(divElement,'dialog-root');
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(appendChildSpy).toHaveBeenCalledWith(document.body,divElement);
    expect(bootstrapSpy).toHaveBeenCalledTimes(1);
    expect(bootstrapSpy).toHaveBeenCalledWith(dialogContainerComponent, divElement);
    expect(createComponentSpy).toHaveBeenCalledTimes(1);
    expect(createComponentSpy).toHaveBeenCalledWith(StandaloneDialogComponent, {
      injector,
      ngModuleRef: undefined
    });
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
