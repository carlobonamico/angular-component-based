import {Component} from '@angular/core';
import {Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({selector: 'message-composer', 
    templateUrl: "components/message-composer/message-composer.html",
    inputs : [""],
    outputs: ["","",""]
})
export class MessageComposerComponent implements OnInit {
    draft; 
    
    onSend ;

    accountEmail = "carlo.bonamico@gmail.com";

    ngOnInit(){
        if (!this.draft)
        {
            this.draft = this.getDefaultMessage();
        } 
    }  
    
    //this.accountEmail = AccountService.getAccountEmail();

    getDefaultMessage() {
        var draft = {
            from: this.accountEmail,
            to: "",
            subject: "",
            body: ""
        };
        return draft;
    };
    
    send()
    {
        this.onSend.emit({
            message : this.draft
        });     
    };

}
