import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css']
})
export class MessageViewerComponent  {
  @Input() 
  message; 
  
  @Output()
  onReply = new EventEmitter<any>(); 

  @Output()
  onForward = new EventEmitter<any>();

  @Output()
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
