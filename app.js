(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchmenu = "list comma separated dishes you usually have for lunch";
  $scope.evaluateresult = "evaluate result";

  $scope.evaluateLunchMenu = function () {
    if (3 < howManyItemsInMenu($scope.lunchmenu)) {
      $scope.evaluateresult = "too much!";
    }
    else {
      $scope.evaluateresult = "enjoy!";
    }
  };

  function howManyItemsInMenu(lunchmenu) {
    console.log(lunchmenu);
    return 3;
  }
}

})();
