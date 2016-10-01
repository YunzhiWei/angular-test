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
  //   return $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json")
  //   }).then(function (result) {
  //     var founditems = result.data;
  //     return founditems;
  //   });

    var item = {
        id: 877,
        short_name: "A1",
        name: "Won Ton Soup with Chicken",
        description: "chicken-stuffed won ton",
        price_small: 2.55,
        price_large: 5
    };
    item.name = searchTerm;
    founditems.push(item);
  }
}

})();
