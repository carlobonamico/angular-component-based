import {Component} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'message-viewer', 
    templateUrl : "components/message-viewer/message-viewer.html",
    inputs : [""],
    outputs: [""],
    directives: [""]
})
export class MessageViewerComponent  {
    message; 
    
    onReply = new EventEmitter<any>(); 
    
    reply() {
        
        this.onReply.emit({
            message : this.message
        });
    };


}
