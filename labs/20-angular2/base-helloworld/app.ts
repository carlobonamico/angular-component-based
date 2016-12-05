import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';

//TODO import { CommonStarComponent} from "components/common-star/common-star.ts"
@Component({selector: 'mail-view', 
    template: "<h1>Hello</h1>",
})
export class HelloWorldComponent  {

    messages = "Wprld";

    constructor(){
    }

    ngOnInit(){
    }
}



import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ HelloWorldComponent,
    ],

  bootstrap:    [ HelloWorldComponent ]
})
export class AppModule { }

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);


