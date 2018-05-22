import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.css']
})
export class MessageComposerComponent implements OnInit {
  //TODO DECLARE 1 INPUT
  //TODO DECLARE 3 OUTPUTS
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
