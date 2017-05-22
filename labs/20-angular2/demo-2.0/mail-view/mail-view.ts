import {Component} from '@angular/core';
import {MessageService} from "components/mailService/mailService.ts";
import {TemplateService} from "components/template-service/template-service.ts";
import {LogService} from "components/log-service/log-service.ts";


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
    constructor( 
        private messageService: MessageService, 
        private templateService : TemplateService, 
        private logService: LogService){
        this.messages = this.loadInbox(); 
        this.selectCurrentMessage(this.messages[0]); 
        
        this.logService.log("Applicativo partito");
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
        var template = {
            to: message.from,
            subject: "Re: " + message.subject,
            body: ">" + message.body
        };
//vs var newMessage = this.templateService.getReplyTemplate(message); 
        this.compose(template);
        
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


