import {Component} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'common-star', 
    templateUrl: "components/common-star/common-star.html",
    inputs : ["entity"],
    outputs: ["onStarredChanged"]
})
export class CommonStarComponent  {
    entity; 
    toggleStar(){
        this.entity.starred = !this.entity.starred
    }
}