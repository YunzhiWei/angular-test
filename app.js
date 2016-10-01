(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    // scope: {
    //  narrowctrl: '='
    //    title: '@title',
    // //   onRemove: '&'
    // //   foundItems: '<'
    //}
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var narrowctrl = this;
  var found = [];

  narrowctrl.items = found; // MenuSearchService.getItems();

  narrowctrl.searchTerm = "";
  narrowctrl.searchResult = "";

  narrowctrl.removeItem = function (itemIndex) {
    console.log("Remove ", itemIndex);

    found.splice(itemIndex, 1);

    if(found.length == 0) {
      narrowctrl.searchResult = "Nothing found";
    }
  }

  narrowctrl.showMatchedMenuItems = function () {
    console.log("Constoller begin!");
    console.log(narrowctrl.searchTerm);

    var promise = MenuSearchService.getMatchedMenuItems(narrowctrl.searchTerm);

    found.splice(0, found.length);

    promise.then(function (response) {
      console.log("Controller Response from service!")
      console.log(response);

      for (var i = 0; i < response.length; i++) {
        found.push(response[i]);
      }
      if(found.length == 0) {
        narrowctrl.searchResult = "Nothing found";
      }
      else {
        narrowctrl.searchResult = "";
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong!");
    })
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var founditems = [
  ];

  service.getItems = function () {
    return founditems;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    console.log("Service Begin!");
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      founditems.splice(0, founditems.length);

      console.log("Service result!")
      console.log(result);
      // console.log(result.data.menu_items);

      for (var i = 0; i < result.data.menu_items.length; i++) {
        // console.log(result.data.menu_items[i]);
        if(
          (searchTerm == "") ||
          (result.data.menu_items[i].description.indexOf(searchTerm) >= 0)
          ) {
          founditems.push(result.data.menu_items[i]);
        }
      }

      return founditems;
    });
  }
}

})();
