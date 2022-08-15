import { DOCUMENT } from '@angular/common';
import {
  Component,
  createNgModule,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { LazyDialog, LazyDialogRef, ModuleWithLazyDialog } from '../models';

@Injectable()
export class LazyDialogService {
  private readonly renderer: Renderer2;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly injector: Injector
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public async create<T extends LazyDialog>(
    module: Promise<Type<ModuleWithLazyDialog<T> | T>>,
    viewContainerRef: ViewContainerRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any
  ): Promise<LazyDialogRef> {
    const resolvedModule = await module;

    if (module instanceof Component) {
      if (!module.standalone) {
        throw new Error('Dialog module is not a standalone component');
      } else if (!this.isDialog(module)) {
        throw new Error('Component does not implement Dialog interface');
      }
    }

    const moduleRef = createNgModule(resolvedModule, this.injector);
    const component =
      moduleRef.instance instanceof ModuleWithLazyDialog<T>
        ? moduleRef.instance?.getDialog()
        : (resolvedModule as Type<T>);

    if (!component) {
      throw new Error(
        'Dialog module does not extend or implement ModuleWithDialog class'
      );
    }

    const componentRef = viewContainerRef.createComponent<T>(component, {
      ngModuleRef: moduleRef,
    });
    this.renderer.appendChild(
      this.document.body,
      componentRef.location.nativeElement
    );

    if (params) {
      componentRef.instance.onParams(params);
    }

    return new LazyDialogRef(componentRef, moduleRef);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isDialog(obj: any): obj is LazyDialog {
    return 'dialogRef' in obj && 'close' in obj && 'onParams' in obj;
  }
}
