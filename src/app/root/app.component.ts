import {Component} from '@angular/core';

enum Modes { Option1, Option2 }

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
           })
export class AppComponent  {
    title = 'app component!';
    mode: Modes;
}
