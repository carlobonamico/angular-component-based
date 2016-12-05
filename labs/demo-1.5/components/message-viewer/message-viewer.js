//component name - component definition object
angular.module("mailApp").component("messageViewer",{
    templateUrl : "components/message-viewer/message-viewer.html",
    controller: MessageViewerController,
    controllerAs: "messageViewerCtrl", 
    
    //they are applied as fields in the controller object
    bindings: {
        //name of the field in the controller = name of the attribute in the html
        message : "<message",  //mandatory
        showActions: "<",
        onReply : "&",
        onForward : "&",
        onDelete : "&",
    } 
    
});

function MessageViewerController() {

    if (this.showActions == undefined)
        this.showActions = true; 
        
    //FUTURE lab - refactor the messageActionsToolbar with transclusion
    this.reply = function () {
        
        this.onReply({
            message : this.message
        });
    };
    this.forward = function () {
        this.onForward({
            message : this.message
        });      
    };

    this.delete = function () {
        //TODO ask for confirmation
        this.onDelete({
            message : this.message
        });
    };

}