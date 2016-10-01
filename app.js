(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var narrowctrl = this;

  narrowctrl.items = MenuSearchService.getItems();

  narrowctrl.searchTerm = "";

  narrowctrl.showMatchedMenuItems = function () {
    console.log(narrowctrl.searchTerm);
    MenuSearchService.getMatchedMenuItems(narrowctrl.searchTerm);
  }

  // var promise = MenuSearchService.getMatchedMenuItems();
  //
  // promise.then(function (response) {
  //   narrowctrl.found = response.data;
  // })
  // .catch(funtion (error) {
  //   console.log("Something went terribly wrong!");
  // });

  // narrowctrl.found = MenuSearchService.getMatchedMenuItems();
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
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      founditems.splice(0, founditems.length);

      console.log(result);
      console.log(result.data.menu_items);

      for (var i = 0; i < result.data.menu_items.length; i++) {
        console.log(result.data.menu_items[i]);
        if(
          (searchTerm == "") ||
          (result.data.menu_items[i].name.indexOf(searchTerm) >= 0)
          ) {
          founditems.push(result.data.menu_items[i]);
        }
      }
    });
  }
}

})();
