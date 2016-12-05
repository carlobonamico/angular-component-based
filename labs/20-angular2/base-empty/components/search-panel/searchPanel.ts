angular.module("mail.search",[]);

angular.module("mail.search")
    .component("searchPanel", //becomes search-panel in html 
    {
        controller: SearchPanelController, 
        controllerAs: "searchPanelCtrl",
        templateUrl: "components/search-panel/search-panel.html",
        bindings: {
            "defaultQuery" : "<?", //input parameter, with data binding
            "onSearchResults" : "&", //callback
            "onSearchStart" : "&",
        }
   
    });

function SearchPanelController(){

    if (this.defaultQuery)
    {
        this.query = this.defaultQuery;
    } else{
        this.query ="";
    }

    this.search = function () {
        this.onSearchStart({
            query : this.query
        });

    };
}
