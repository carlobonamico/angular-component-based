import {Component} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'message-list', 
    templateUrl: './message-list.component.html'
})
export class MessageListComponent  {
    //TODO DECLARE 2 INPUT
    //TODO DECLARE 1 OUTPUTS
    messages; 
    currentMessageIndex = 0;
    currentMessage;


    onCurrentMessageChanged = new EventEmitter<any>(); 
    
    ngOnInit(){
        
    }
    
    setCurrentMessage(index)
    {
        this.currentMessage = this.messages[index];
        this.currentMessageIndex = index; 

    }

    next () {
        
        if (this.currentMessageIndex < this.messages.length -1)
            this.currentMessageIndex++;

        this.setCurrentMessage(this.currentMessageIndex);
    };

    prev () {        
    };
    
    ngOnChanges (changes){
        if (changes.messages)
        {
        }
    }


}    
   
