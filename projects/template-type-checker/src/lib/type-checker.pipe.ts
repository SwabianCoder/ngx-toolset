import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import { Constructor } from './types';

/**
 * The TypeCheckerPipe validates if an object is an instance of the provided {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/template-type-checker/src/lib/types/constructor.ts className}.
 *
 * @export
 * @class TypeCheckerPipe
 * @typedef {TypeCheckerPipe}
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'typeChecker',
  standalone: true,
})
export class TypeCheckerPipe implements PipeTransform {
  /**
   * Validates if an object is an instance of the provided {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/template-type-checker/src/lib/types/constructor.ts className}.
   *
   * @public
   * @template T
   * @param {*} obj
   * @param {Constructor<T>} className
   * @returns {(T | undefined)}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform<T>(obj: any, className: Constructor<T>): T | undefined {
    return obj instanceof className ? obj : undefined;
  }
}
