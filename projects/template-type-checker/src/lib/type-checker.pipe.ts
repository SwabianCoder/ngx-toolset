import { Pipe, PipeTransform } from '@angular/core';
import { Constructor } from './types';

@Pipe({
  name: 'typeChecker',
})
export class TypeCheckerPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform<T>(obj: any, className: Constructor<T>): T | undefined {
    return obj instanceof className ? obj : undefined;
  }
}
