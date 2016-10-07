(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenuDataService($q, $http, ApiBasePath) {
  var service = this;
  var items = [];

  service.getAllCategories = function() {
    var deferred = $q.defer();

    $http({
      method: "GET",
      url: (ApiBasePath + '/categories.json')
    }).then(function (result) {
      console.log("getAllCategories: ", result)
      if (angular.isDefined(result.data)) {
        items = result.data;
      }
      deferred.resolve(items);
    });

    return deferred.promise;
  }

  service.getItemsForCategory = function(categoryShortName) {
    var deferred = $q.defer();

    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then(function (result) {
      console.log("getItemsForCategory: ", result)
      if (angular.isDefined(result.data)) {
        items = result.data.menu_items;
      }
      deferred.resolve(items);
    });

    return deferred.promise;
  }
}

})();
