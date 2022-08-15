import { Type } from '@angular/core';
import { LazyDialog } from './lazy-dialog';

export abstract class ModuleWithLazyDialog<T extends LazyDialog> {
  public abstract getDialog(): Type<T>;
}
