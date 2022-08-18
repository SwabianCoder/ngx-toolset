/**
 * Represents the class to validate the object against using {@link https://github.com/SwabianCoder/ngx-toolset/blob/main/projects/template-type-checker/src/lib/type-checker.pipe.ts TypeCheckerPipe}
 *
 * @export
 * @typedef {Constructor}
 * @template T
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = { new (...args: any[]): T };
