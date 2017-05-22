import {Component, ViewChild} from '@angular/core';
import {Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({selector: 'message-composer', 
    templateUrl: "components/message-composer/message-composer.html",
    inputs : ["draft"],
    outputs: ["onSend","onSave","onCancel"]
})
export class MessageComposerComponent implements OnInit {
    draft; 
    
    onSend = new EventEmitter<any>(); 
    onSave = new EventEmitter<any>(); 
    onCancel = new EventEmitter<any>();

    @ViewChild('draftForm') draftForm;
    
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
        console.log(this.draftForm);
        this.onSend.emit({
            message : this.draft
        });     
    };
    save()
    {
        this.onSave.emit({
            message : this.draft
        });     
    };
    cancel()
    {
        this.onCancel.emit();     
    };
}
