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
  ViewContainerRef,
} from '@angular/core';
import { LazyDialogRef, ModuleWithLazyDialog } from '../models';

@Injectable()
export class LazyDialogService {
  private readonly renderer: Readonly<Renderer2>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly injector: Injector,
    private readonly applicationRef: ApplicationRef
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public async create<ComponentType, DataType>(
    module: Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>,
    params?: DataType
  ): Promise<LazyDialogRef<DataType>> {
    const { componentType, moduleRef } = await this.initModuleAndComponent(
      module
    );
    const dialogContainerElement = this.createDialogRootElement();
    const { lazyDialogRef, dialogContainerVcr } =
      await this.initDialogBackgroundOverlay(
        dialogContainerElement,
        moduleRef,
        params
      );
    this.initDialog(
      lazyDialogRef,
      dialogContainerVcr,
      componentType,
      moduleRef
    );

    return lazyDialogRef;
  }

  private async initModuleAndComponent<ComponentType>(
    module: Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>
  ): Promise<{
    componentType: Type<ComponentType>;
    moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined;
  }> {
    const resolvedModule = await module;
    let componentType: Type<ComponentType>;
    let moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined;

    if (
      resolvedModule.prototype instanceof ModuleWithLazyDialog<ComponentType>
    ) {
      const castedModule = resolvedModule as Type<
        ModuleWithLazyDialog<ComponentType>
      >;
      moduleRef = createNgModule(castedModule, this.injector);
      componentType = moduleRef.instance?.getDialog();
    } else {
      componentType = resolvedModule as Type<ComponentType>;
    }

    return {
      componentType,
      moduleRef,
    };
  }

  private initDialog<ComponentType, DataType>(
    lazyDialogRef: LazyDialogRef<DataType>,
    dialogContainerVcr: ViewContainerRef,
    componentType: Type<ComponentType>,
    moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined
  ): void {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: LazyDialogRef, useValue: lazyDialogRef }],
    });
    dialogContainerVcr.createComponent(componentType, {
      injector,
      ngModuleRef: moduleRef,
    });
  }

  private async initDialogBackgroundOverlay<ComponentType, DataType>(
    dialogContainerElement: HTMLDivElement,
    moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined,
    params?: DataType
  ): Promise<{
    lazyDialogRef: LazyDialogRef<DataType>;
    dialogContainerVcr: ViewContainerRef;
  }> {
    const dialogContainerComponent = await import(
      '../components/lazy-dialog-container/lazy-dialog-container.component'
    ).then((m) => m.LazyDialogContainerComponent);
    const dialogContainerComponentRef = this.applicationRef.bootstrap(
      dialogContainerComponent,
      dialogContainerElement
    );
    const lazyDialogRef = new LazyDialogRef<DataType>(
      dialogContainerComponentRef,
      moduleRef,
      params
    );
    const dialogContainerVcr =
      dialogContainerComponentRef.instance.dialogContainer;

    return { lazyDialogRef, dialogContainerVcr };
  }

  private createDialogRootElement(): HTMLDivElement {
    const dialogContainer = this.renderer.createElement(
      'div'
    ) as HTMLDivElement;
    this.renderer.addClass(dialogContainer, 'dialog-root');
    this.renderer.appendChild(this.document.body, dialogContainer);

    return dialogContainer;
  }
}
