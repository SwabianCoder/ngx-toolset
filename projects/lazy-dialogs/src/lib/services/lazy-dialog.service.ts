import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  createNgModule,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type,
} from '@angular/core';
import { LazyDialog, LazyDialogRef, ModuleWithLazyDialog } from '../models';

@Injectable()
export class LazyDialogService {
  private readonly renderer: Renderer2;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Readonly<Document>,
    private readonly rendererFactory: RendererFactory2,
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public async create<DialogComponentType extends LazyDialog, DataType>(
    module: Promise<Type<ModuleWithLazyDialog<DialogComponentType> | DialogComponentType>>,
    params?: DataType
  ): Promise<LazyDialogRef<DataType>> {
    const resolvedModule = await module;
    const moduleRef = createNgModule(resolvedModule, this.injector);
    const component =
      moduleRef.instance instanceof ModuleWithLazyDialog<DialogComponentType>
        ? moduleRef.instance?.getDialog()
        : (resolvedModule as Type<DialogComponentType>);

    if (!component) {
      if (moduleRef.instance instanceof ModuleWithLazyDialog<DialogComponentType>) {
        throw new Error(
          'Dialog module does not extend or implement ModuleWithDialog class'
        );
      } else {
        throw new Error('Dialog component is not valid. Make sure it is a valid standalone component that implements LazyDialog interface');
      }
    }

    const dialogComponentRef = this.applicationRef.bootstrap(component);
    this.renderer.appendChild(
      this.document.body,
      dialogComponentRef.location.nativeElement
    );

    if (params) {
      dialogComponentRef.instance.onParams(params);
    }

    return new LazyDialogRef<DataType>(dialogComponentRef, moduleRef, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isDialog(obj: any): obj is LazyDialog {
    return 'dialogRef' in obj && 'close' in obj && 'onParams' in obj;
  }
}
