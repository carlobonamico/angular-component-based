import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css'],
  inputs : ["message"],
  outputs: ["onReply","onForward","onDelete"]
})
export class MessageViewerComponent  {
  message; 
  
  onReply = new EventEmitter<any>(); 
  onForward = new EventEmitter<any>(); 
  onDelete = new EventEmitter<any>(); 
  
  reply() {
      
      this.onReply.emit({
          message : this.message
      });
  };
  forward() {
      this.onForward.emit({
          message : this.message
      });      
  };

  delete() {
      //TODO ask for confirmation
      this.onDelete.emit({
          message : this.message
      });
  };

}
