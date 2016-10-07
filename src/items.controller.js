(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['items']
function ItemsController(items) {
  var itemDetail = this;

  console.log("items: ", items);

  itemDetail.items = items;
}

})();
