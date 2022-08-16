import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyDialogModule } from 'projects/lazy-dialogs/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LazyDialogModule.forRoot({top:0,right:0,left:0,bottom:0,background:'red',position:'fixed'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
