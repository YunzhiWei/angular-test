(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          title: '@title',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'vm',
        bindToController: true
      };

      return ddo;
    }

    function FoundItemsDirectiveController() {
      var vm = this;

      vm.listEmpty = function() {
        return (!angular.isDefined(vm.items) || vm.items.length === 0);
      }

      vm.noItemsFound = function() {
        return (angular.isDefined(vm.items) && vm.items.length === 0);
      }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var vm = this;

      var origTitle = "Resturant Menu";
      vm.title = origTitle + " (0 items)";
      vm.searchTerm = '';

      vm.search = function() {
        var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm.trim());
        promise.then(function(data) {
          vm.found = data;
          vm.title = origTitle + " (" + vm.found.length + " items)";
        });
      }

      vm.removeItem = function(itemIndex) {
        vm.found.splice(itemIndex, 1);
        vm.title = origTitle + " (" + vm.found.length + " items)";
      }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + '/menu_items.json')
        }).then(function (result) {
          var foundItems = [];
          if (angular.isDefined(result.data.menu_items) && searchTerm !== '') {
            foundItems = result.data.menu_items.filter(function(menu_item) {
              return (menu_item.description.indexOf(searchTerm) !== -1);
            });
          }
          return foundItems;
        });
      }
    }
})();
