(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
   console.log("NarrowItDownController this=",this);
  menu.searchTerm = "";
//  menu.found =[];
  menu.narrowItDown = function () {
    console.log("NarrowItDownController searchTerm=",menu.searchTerm);

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
       menu.found =response;
      })
      .catch(function (error) {
              console.log(error);
            });
  };

  menu.removeItem = function (itemIndex) {
          MenuSearchService.removeItem(itemIndex);
        };

}//end controller


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {

    console.log("MenuSearchService searchTerm=",searchTerm);

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result){
      console.log("MenuSearchService response=", result.data);
      // process result and only keep items that match

      var allItems = result.data.menu_items;
      if(searchTerm.length == 0 || allItems.length == 0 ){
          foundItems = [];
          return foundItems;
      }else {
          foundItems = [];
        for(var i = 0; i < allItems.length; i++){
          var description = allItems[i].description;
          if (description.toLowerCase().indexOf(searchTerm) !== -1) {
                  foundItems.push(allItems[i]);
                }
        }
          // return processed items
          return foundItems;
      }

    });

  };

   service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
  };


}

})();
