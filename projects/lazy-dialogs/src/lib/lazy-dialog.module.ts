import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { LazyDialogService } from './services';

@NgModule()
export class LazyDialogModule {
  public constructor(@Optional() @SkipSelf() parentModule: LazyDialogModule) {
    if (parentModule) {
      throw new Error(
        'LazyDialogModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(): ModuleWithProviders<LazyDialogModule> {
    return {
      ngModule: LazyDialogModule,
      providers: [LazyDialogService],
    };
  }
}
