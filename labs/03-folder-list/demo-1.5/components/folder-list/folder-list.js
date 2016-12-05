//component name - component definition object
angular.module("mailApp").component("folderList",{
    templateUrl : "components/folder-list/folder-list.html",
    controller: FolderListController,
    controllerAs: "folderListCtrl", 
    
    //they are applied as fields in the controller object
    bindings: {
        //name of the field in the controller = name of the attribute in the html
        folders : "<folders",  //mandatory
        //it is the same as folders:"=?"
        //? means optional
        defaultFolder : "<?", //the default folder is optional, 
        title: "@", //equivalent to "@title",
        allowCreate: "@",
        onSelect: "&",
        onAddNew: "&",
    } 
    
});

function FolderListController()
{
    if (!this.title)
        this.title ="Folder list";
        
    //implicit, inherited from the bindings declaration 
    //this.folders = []

    
    this.addFolder = function (newFolderName) {
        //TODO discuss if it is better here or in the parent
        this.folders.push(newFolderName);
        this.onAddNew({
            folder: newFolderName
        })
    };
    
    this.select = function (folder)
    {
        this.currentFolder = folder; 
        this.onSelect({
            folder: this.currentFolder
        });
    };
    
    if (this.defaultFolder)
    {
        this.select(this.defaultFolder);
    }

}

