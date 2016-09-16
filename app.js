(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchmenu = "";
  $scope.evaluateresult = "";

  $scope.evaluateLunchMenu = function () {
    var str = $scope.lunchmenu

    if ( str == "" ) {
      $scope.evaluateresult = "Please enter data first";
      return;
    }

    var c = str.slice(-1);
    while(c == ',' || c == ' ') {
      console.log(c);
      console.log(str)
      str = str.slice(0, -1);
      c = str.slice(-1);
    }

    if ( str == "" ) {
      $scope.evaluateresult = "Please enter data first";
      return;
    }
    if (3 < howManyItemsInMenu(str)) {
      $scope.evaluateresult = "Too much!";
    }
    else {
      $scope.evaluateresult = "Enjoy!";
    }
  };

  function howManyItemsInMenu(lunchmenu) {
    console.log(lunchmenu);
    return lunchmenu.split(',').length;
  }
}

})();
