import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';

import {MailViewComponent} from 'mail-view/mail-view.ts';

//TODO import mailLogo

//import {FolderListComponent} from "components/folder-list/folder-list.ts"
//import {MessageViewerComponent} from "components/message-viewer/message-viewer.ts"
//import {MessageListComponent} from "components/message-list/message-list.ts"
//import {MessageComposerComponent} from "components/message-composer/message-composer.ts"
/*
import {Component} from "components/search-panel/search-panel.ts"
*/
//import { CommonStarComponent} from "components/common-star/common-star.ts"

//import {MessageService} from "components/mailService/mailService.ts";

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ MailViewComponent,
    //TODO reference MAIL LOGO component here
    ],

  bootstrap:    [ MailViewComponent ]
})
export class AppModule { }

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);


