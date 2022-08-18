import { NgModule } from '@angular/core';
import { TypeCheckerPipe } from './type-checker.pipe';

/**
 * The TemplateTypeCheckerModule containing the {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/template-type-checker/src/lib/type-checker.pipe.ts TypeCheckerPipe}
 *
 * @export
 * @class TemplateTypeCheckerModule
 * @typedef {TemplateTypeCheckerModule}
 */
@NgModule({
  declarations: [TypeCheckerPipe],
  exports: [TypeCheckerPipe],
})
export class TemplateTypeCheckerModule {}
