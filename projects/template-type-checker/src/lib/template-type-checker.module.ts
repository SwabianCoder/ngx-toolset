import { NgModule } from '@angular/core';
import { TypeCheckerPipe } from './type-checker.pipe';

@NgModule({
  declarations: [TypeCheckerPipe],
  exports: [TypeCheckerPipe],
})
export class TemplateTypeCheckerModule {}
