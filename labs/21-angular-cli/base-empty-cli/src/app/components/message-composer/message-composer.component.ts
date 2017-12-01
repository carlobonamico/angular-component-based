import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.css'],
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
