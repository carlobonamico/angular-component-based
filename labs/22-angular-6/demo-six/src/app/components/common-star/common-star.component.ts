import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'common-star',
  templateUrl: './common-star.component.html',
  styleUrls: ['./common-star.component.css']
})
export class CommonStarComponent  {
  @Input()
  entity; 
  
  toggleStar(){
      this.entity.starred = !this.entity.starred
  }
}