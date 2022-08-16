import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  createNgModule,
  EmbeddedViewRef,
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
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector,
    private readonly componentFactoryResolver: ComponentFactoryResolver
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
    console.log(resolvedModule, resolvedModule.prototype)
    if (resolvedModule.prototype === "ModuleWithLazyDialog") {
       const castedModule = resolvedModule as Type<ModuleWithLazyDialog<ComponentType>>;
       moduleRef = createNgModule(castedModule, this.injector);
       debugger;
       component = moduleRef.instance?.getDialog();
  
      if (!component) {
          throw new Error(
            'Dialog module does not extend or implement ModuleWithDialog class'
          );
      }
    } else {
      component = resolvedModule as Type<ComponentType>;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const dialogComponentRef = componentFactory.create(this.injector);
    this.applicationRef.attachView(dialogComponentRef.hostView);
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
