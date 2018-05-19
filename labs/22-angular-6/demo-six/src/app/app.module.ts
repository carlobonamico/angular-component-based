import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CommonStarComponent } from './components/common-star/common-star.component';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { MailLogoComponent } from './components/mail-logo/mail-logo.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageComposerComponent } from './components/message-composer/message-composer.component';
import { MailViewComponent } from './mail-view/mail-view.component';
import { MessageViewerComponent } from './components/message-viewer/message-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonStarComponent,
    FolderListComponent,
    MailLogoComponent,
    MessageComposerComponent,
    MessageListComponent,
    MessageViewerComponent,
    MailViewComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
