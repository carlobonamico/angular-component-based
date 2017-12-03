import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'common-star',
  templateUrl: './common-star.component.html',
  styleUrls: ['./common-star.component.css'],
  inputs : ["entity"],
  outputs: ["onStarredChanged"]
})
export class CommonStarComponent  {
  entity; 
  toggleStar(){
      this.entity.starred = !this.entity.starred
  }
}