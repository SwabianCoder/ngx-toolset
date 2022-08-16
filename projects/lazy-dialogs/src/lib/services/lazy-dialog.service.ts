import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  createNgModule,
  Inject,
  Injectable,
  Injector,
  NgModuleRef,
  Renderer2,
  RendererFactory2,
  Type,
} from '@angular/core';
import { LazyDialog, LazyDialogRef, ModuleWithLazyDialog } from '../models';

@Injectable()
export class LazyDialogService {
  private readonly renderer: Readonly<Renderer2>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly injector: Injector,
    private readonly applicationRef: ApplicationRef,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public async create<ComponentType extends LazyDialog, DataType>(
    module: Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>,
    params?: DataType
  ): Promise<LazyDialogRef<ComponentType, DataType>> {
    const resolvedModule = await module;
    let component: Type<ComponentType>;
    let moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined;

    if (resolvedModule.prototype instanceof ModuleWithLazyDialog<ComponentType>) {
       const castedModule = resolvedModule as Type<ModuleWithLazyDialog<ComponentType>>;
       moduleRef = createNgModule(castedModule, this.injector);
       component = moduleRef.instance?.getDialog();
    } else {
      component = resolvedModule as Type<ComponentType>;
    }

    const dialogContainerElement = this.initDialogContainer();
    const dialogContainerComponent = await import('../components/lazy-dialog-container/lazy-dialog-container.component').then(m => m.LazyDialogContainerComponent);
    const dialogContainerComponentRef = this.applicationRef.bootstrap(dialogContainerComponent, dialogContainerElement);
    const dialogContainerVcr = dialogContainerComponentRef.instance.dialogContainer;
    const dialogComponentRef = dialogContainerVcr.createComponent(component);

    if (params) {
      dialogComponentRef.instance.onParams(params);
    }

    return new LazyDialogRef<ComponentType, DataType>(dialogComponentRef, moduleRef, params);
  }

  private initDialogContainer(): HTMLElement {
    const dialogContainer = this.renderer.createElement('div');
    this.renderer.addClass(dialogContainer, 'dialog-root');
    this.renderer.appendChild(this.document.body, dialogContainer);

    return dialogContainer;
  }
}
