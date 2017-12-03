import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css'],
  inputs : [], //TODO DECLARE INPUTS
  outputs: [] //TODO DECLARE OUTPUTS
})
export class FolderListComponent  {
  
  //TODO declare properties
  title; 
  folders; 
  defaultFolder;
  allowCreate;
  
  selected = new EventEmitter<any>();; 

  constructor(){
      if (!this.title)
          this.title ="Folder list";
  }
  
  addFolder(newFolderName) {
      //TODO discuss if it is better here or in the parent
      //TODO ADVANCED notify parent
  };
  
  select = function (folder)
  {
      this.currentFolder = folder; 
      //TODO emit event
  };
  

}