import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './root/app.component';

@NgModule({
              imports: [
                  BrowserModule,
              ],
              declarations: [
                  AppComponent,
              ],
              bootstrap: [
                  AppComponent,
              ],
              providers: [],
          })
export class AppModule {
}
