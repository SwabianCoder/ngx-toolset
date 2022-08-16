import { LazyDialogRef } from './lazy-dialog-ref';

export abstract class LazyDialog {
  public dialogRef!: LazyDialogRef<LazyDialog, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close!: (output?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  public onParams(params: any): void {}
}
