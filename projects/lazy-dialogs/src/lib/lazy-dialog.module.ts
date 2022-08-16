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

/**
 * The LazyDialogModule
 *
 * @export
 * @class LazyDialogModule
 * @typedef {LazyDialogModule}
 */
@NgModule({
  declarations: [LazyDialogContainerComponent],
  imports: [CommonModule]
})
export class LazyDialogModule {
  /**
   * Creates an instance of LazyDialogModule.
   *
   * @constructor
   * @public
   * @param {LazyDialogModule} parentModule
   */
  public constructor(@Optional() @SkipSelf() parentModule: LazyDialogModule) {
    if (parentModule) {
      throw new Error(
        'LazyDialogModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  /**
   * Creates the singleton services.
   *
   * @public
   * @static
   * @param {{
      [klass: string]: any;
   * }} dialogContainerStyles
   * @returns {ModuleWithProviders<LazyDialogModule>}
   */
  public static forRoot(dialogContainerStyles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [klass: string]: any;
  }): ModuleWithProviders<LazyDialogModule> {
    return {
      ngModule: LazyDialogModule,
      providers: [
        LazyDialogService,
        {
          provide: LAZY_DIALOG_CONTAINER_STYLES,
          useValue: dialogContainerStyles,
        },
      ],
    };
  }
}
