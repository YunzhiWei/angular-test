(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var tobuyctrl = this;

  tobuyctrl.items = ShoppingListCheckOffService.getToBuyItems();

  tobuyctrl.pickupItem = function (index) {
    ShoppingListCheckOffService.PickUpItem(index);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtctrl = this;

  boughtctrl.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  var tobuyitems  = [
    {
      name: "Apple",
      quantity: "2"
    },
    {
      name: "Banana",
      quantity: "7"
    },
    {
      name: "Cherry",
      quantity: "5"
    },
    {
      name: "Donut",
      quantity: "6"
    },
    {
      name: "Egg",
      quantity: "4"
    },
    {
      name: "Fish",
      quantity: "7"
    }
  ];

  var boughtitems = [
    {
      name: "icecream",
      quantity: "7"
    }
  ];

  service.getToBuyItems = function () {
    return tobuyitems;
  }

  service.getBoughtItems = function () {
    return boughtitems;
  }

  service.PickUpItem = function (index) {
    boughtitems.push(tobuyitems[index]);

    tobuyitems.splice(index, 1);
  }
}

})();
