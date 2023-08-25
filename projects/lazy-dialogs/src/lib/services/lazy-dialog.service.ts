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

import {
  LazyDialogRef,
  ModuleWithLazyDialog,
} from '../models';

/**
 * The LazyDialogService responsible for creating lazy loading dialogs.
 *
 * @export
 * @class LazyDialogService
 * @typedef {LazyDialogService}
 */
@Injectable()
export class LazyDialogService {
  /**
   * Responsible for DOM manipulation.
   *
   * @private
   * @readonly
   * @type {Readonly<Renderer2>}
   */
  private readonly renderer: Readonly<Renderer2>;

  /**
   * Creates an instance of LazyDialogService.
   *
   * @constructor
   * @public
   * @param {Readonly<Document>} document
   * @param {RendererFactory2} rendererFactory
   * @param {Injector} injector
   * @param {ApplicationRef} applicationRef
   */
  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly injector: Injector,
    private readonly applicationRef: ApplicationRef
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Creates (opens) a lazy loading dialog with provided data.
   *
   * @public
   * @async
   * @template ComponentType
   * @template DataType
   * @param {(Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>)} module The module containing the lazy dialog component (supports {@link https://angular.io/api/core/NgModule NgModule} extending {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/lazy-dialogs/src/lib/models/module-with-lazy-dialog.ts ModuleWithLazyDialog<T>} as well as {@link https://angular.io/guide/standalone-components standalone components}).
   * @param {?DataType} [data] The data provided to the dialog.
   * @returns {Promise<LazyDialogRef<DataType>>}
   */
  public async create<ComponentType, DataType>(
    module: Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>,
    data?: DataType
  ): Promise<LazyDialogRef<DataType>> {
    const { componentType, moduleRef } = await this.initModuleAndComponent(
      module
    );
    const dialogContainerRootElement = this.createDialogRootElement();
    const { lazyDialogRef, dialogContainerVcr } =
      await this.initDialogBackgroundOverlay(
        dialogContainerRootElement,
        moduleRef,
        data
      );
    this.initDialog(
      lazyDialogRef,
      dialogContainerVcr,
      componentType,
      moduleRef
    );

    return lazyDialogRef;
  }

  /**
   * Determines the dialog component type (if module is a {@link https://angular.io/api/core/NgModule NgModule} it also initializes the module).
   *
   * @private
   * @async
   * @template ComponentType
   * @param {(Promise<Type<ModuleWithLazyDialog<ComponentType> | ComponentType>>)} module The module containing the lazy dialog component (supports {@link https://angular.io/api/core/NgModule NgModule} extending {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/lazy-dialogs/src/lib/models/module-with-lazy-dialog.ts ModuleWithLazyDialog<T>} as well as {@link https://angular.io/guide/standalone-components standalone components}).
   * @returns {(Promise<{
      componentType: Type<ComponentType>;
      moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined;
    }>)}
   */
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
      resolvedModule.prototype instanceof ModuleWithLazyDialog
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

  /**
   * Attaches the dialog to the DOM.
   *
   * @private
   * @template ComponentType
   * @template DataType
   * @param {LazyDialogRef<DataType>} lazyDialogRef The reference of the lazy dialog.
   * @param {ViewContainerRef} dialogContainerVcr The dialog container's view container reference.
   * @param {Type<ComponentType>} componentType The type of the dialog component.
   * @param {(NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined)} moduleRef The reference of the module containing the dialog component (only has a value if module isn't a {@link https://angular.io/guide/standalone-components standalone component}).
   */
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

  /**
   * Attaches the dialog container to the DOM.
   *
   * @private
   * @async
   * @template ComponentType
   * @template DataType
   * @param {HTMLDivElement} dialogContainerRootElement The HTML element of the dialog container root.
   * @param {(NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined)} moduleRef The reference of the module containing the dialog component (only has a value if module isn't a {@link https://angular.io/guide/standalone-components standalone component}).
   * @param {?DataType} [data] The data provided to the dialog.
   * @returns {Promise<{
      lazyDialogRef: LazyDialogRef<DataType>;
      dialogContainerVcr: ViewContainerRef;
    }>}
   */
  private async initDialogBackgroundOverlay<ComponentType, DataType>(
    dialogContainerRootElement: HTMLDivElement,
    moduleRef: NgModuleRef<ModuleWithLazyDialog<ComponentType>> | undefined,
    data?: DataType
  ): Promise<{
    lazyDialogRef: LazyDialogRef<DataType>;
    dialogContainerVcr: ViewContainerRef;
  }> {
    const dialogContainerComponent = await import(
      '../components/lazy-dialog-container/lazy-dialog-container.component'
    ).then((m) => m.LazyDialogContainerComponent);
    const dialogContainerComponentRef = this.applicationRef.bootstrap(
      dialogContainerComponent,
      dialogContainerRootElement
    );
    const lazyDialogRef = new LazyDialogRef<DataType>(
      dialogContainerComponentRef,
      moduleRef,
      data
    );
    const dialogContainerVcr =
      dialogContainerComponentRef.instance.dialogContainer;

    return { lazyDialogRef, dialogContainerVcr };
  }

  /**
   * Creates the HTML dialog root container element.
   *
   * @private
   * @returns {HTMLDivElement}
   */
  private createDialogRootElement(): HTMLDivElement {
    const dialogContainer = this.renderer.createElement(
      'div'
    ) as HTMLDivElement;
    this.renderer.addClass(dialogContainer, 'dialog-root');
    this.renderer.appendChild(this.document.body, dialogContainer);

    return dialogContainer;
  }
}
