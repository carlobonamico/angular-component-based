import {Component} from '@angular/core';
import {MessageService} from "components/mailService/mailService.ts";


@Component({selector: 'mail-view', 
    templateUrl: "mail-view/mail-view.html",
})
export class MailViewComponent  {
    defaultQuery = "js";
    messages = [];
    currentMessage = null; 
    messageListTitle;
    draft;

    //TODO DI
    messageService = new MessageService();

    //TODO load data from services (or backend)
    folders = [
        "Inbox",
        "Trash",
        "Sent"
    ];
    customFolders = [
        "Angular",
        "Typescript",
    ];
    defaultFolder = 'Inbox';
    constructor(){
        this.messages = this.loadInbox(); 
        this.selectCurrentMessage(this.messages[0]); 
        
    }

    ngOnInit(){
    }
      //TODO load messages list from service
    loadInbox(){ 
        return this.messageService.getMessages();
    };

    selectFolder (folderName) {
        this.messageListTitle = folderName;
        
        if ("Inbox" == folderName)
        {
            this.messages = this.loadInbox();
            return;
        }   
        //TODO load data from services (or backend)
        
        this.messages = this.messageService.getMessagesByFolder(folderName);
    };

    search = function (query){
        this.messageListTitle = 'Messages matching '+query;
        this.messages = this.this.messageService.getMessagesBySearch(query);

    }

    selectCurrentMessage = function (message)
    {
        this.currentMessage = message; 
    }

    delete = function (message) {
        var index = this.messages.indexOf(message);
        if (index != -1) {
            this.messages.splice(index, 1);
        }
    };

    replyTo = function (message){
        //TODO optional lab: delegate reply to MessageReplyService
        
    };

    forward = function (message){
        //TODO optional lab:
        
    };

    send = function (message) {
        this.closeComposer(); 
        //TODO add to sent
    };
    
    closeComposer = function () {
        this.composerActive = false; 
    };
    
    compose = function (template) {
    
        this.draft = template;

        this.composerActive = true; 
    };

}


