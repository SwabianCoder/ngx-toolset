import { DOCUMENT } from '@angular/common';
import {
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
import { LazyDialog, LazyDialogRef, ModuleWithLazyDialog } from '../models';

@Injectable()
export class LazyDialogService {
  private readonly renderer: Readonly<Renderer2>;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly injector: Injector
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public async create<ComponentType extends LazyDialog, DataType>(
    viewContainerRef: ViewContainerRef,
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

    const dialogComponentRef = viewContainerRef.createComponent(component);
    this.renderer.appendChild(
      this.document.body,
      dialogComponentRef.location.nativeElement
    );

    if (params) {
      dialogComponentRef.instance.onParams(params);
    }

    return new LazyDialogRef<ComponentType, DataType>(dialogComponentRef, moduleRef, params);
  }
}
