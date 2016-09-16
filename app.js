(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchmenu = "";
  $scope.evaluateresult = "";

  $scope.evaluateLunchMenu = function () {
    if ( $scope.lunchmenu == "" ) {
      $scope.evaluateresult = "Please enter data first";
      return;
    }
    if (3 < howManyItemsInMenu($scope.lunchmenu)) {
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
