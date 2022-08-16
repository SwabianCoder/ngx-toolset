import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { LazyDialogContainerComponent } from './components';
import { LAZY_DIALOG_CONTAINER_STYLES } from './injection-tokens';
import { LazyDialogService } from './services';

@NgModule({
  declarations: [LazyDialogContainerComponent],
  imports: [CommonModule],
  exports: [LazyDialogContainerComponent],
})
export class LazyDialogModule {
  public constructor(@Optional() @SkipSelf() parentModule: LazyDialogModule) {
    if (parentModule) {
      throw new Error(
        'LazyDialogModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(dialogContainerStyles: {
    [klass: string]: any;
}): ModuleWithProviders<LazyDialogModule> {
    return {
      ngModule: LazyDialogModule,
      providers: [LazyDialogService, {provide: LAZY_DIALOG_CONTAINER_STYLES, useValue: dialogContainerStyles}],
    };
  }
}
