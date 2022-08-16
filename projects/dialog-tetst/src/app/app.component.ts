import { Component } from '@angular/core';
import { LazyDialogService } from 'projects/lazy-dialogs/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private foo: LazyDialogService){}

  public openDialog():void {
     const d = import('./dialogs/confirm-dialog/confirm-dialog.module').then(i => i.ConfirmDialogModule);
    this.foo.create(d,{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      title: 'Error',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      description: 'description'
    });
  }

  public openStandaloneDialog(): void {
    const d = import('./dialogs/standalone-dialog/standalone-dialog.component').then(i => i.StandaloneDialogComponent);
    this.foo.create(d);
  }
}
