import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  inputs : [""]
  //outputs: [""],
})
export class MessageViewerComponent  {
  //TODO DECLARE 1 INPUT
  //TODO DECLARE 1 OUTPUT
  
  message; 
  
  /*onReply = new EventEmitter<any>(); 
  
  reply() {
      
      this.onReply.emit({
          message : this.message
      });
  };*/


}
