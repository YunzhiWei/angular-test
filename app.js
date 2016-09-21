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
  tobuyctrl.isListEmpty = ShoppingListCheckOffService.isToBuyListEmpty();

  tobuyctrl.pickupItem = function (index) {
    ShoppingListCheckOffService.PickUpItem(index);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtctrl = this;

  boughtctrl.items = ShoppingListCheckOffService.getBoughtItems();
  boughtctrl.isListEmpty = ShoppingListCheckOffService.isBoughtListEmpty();
}


function ShoppingListCheckOffService() {
  var service = this;

  var tobuyitems  = [
    {
      name: "Apples",
      quantity: "2"
    },
    {
      name: "Bananas",
      quantity: "7"
    },
    {
      name: "Cherries",
      quantity: "5"
    },
    {
      name: "Donuts",
      quantity: "6"
    },
    {
      name: "Eggs",
      quantity: "4"
    },
    {
      name: "Fish",
      quantity: "7"
    }
  ];

  var boughtitems = [
    // {
    //   name: "icecream",
    //   quantity: "7"
    // }
  ];

  service.getToBuyItems = function () {
    return tobuyitems;
  }

  service.isToBuyListEmpty = function () {
    console.log("to buy length", tobuyitems.length);
    return (tobuyitems.length == 0);
  }

  service.getBoughtItems = function () {
    return boughtitems;
  }

  service.isBoughtListEmpty = function () {
    console.log("bought length", boughtitems.length);
    return (boughtitems.length == 0);
  }

  service.PickUpItem = function (index) {
    boughtitems.push(tobuyitems[index]);

    tobuyitems.splice(index, 1);
  }
}

})();
