import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css'],
  inputs : ["title","folders","defaultFolder","allowCreate"],
  outputs: ["selected"]
})
export class FolderListComponent  {
  title; 
  folders; 
  defaultFolder;
  allowCreate;
  selected = new EventEmitter<any>();; 

  constructor(){
      if (!this.title)
          this.title ="Folder list";

      if (this.defaultFolder)
      {
          this.select(this.defaultFolder);
      }
  }
  
  addFolder(newFolderName) {
      //TODO discuss if it is better here or in the parent
      this.folders.push(newFolderName);
      //TODO ADVANCED notify parent
  };
  
  select = function (folder)
  {
      this.currentFolder = folder; 
      this.selected.emit({
          folder: folder
      });
  };
  

}