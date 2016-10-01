(function(){
    'use strict';
angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter'];

function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.findMenuItems = function() {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function (response) {
            menu.found = response;
        })
        .catch(function (error) {
            console.log("Something went wrong.");
        });
    };

    menu.removeItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    };

}

function MenuSearchService($http, ApiBasePath, $filter) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            if(searchTerm == "") {
			    return [];
			}
            var foundItems = $filter('filter')(result.data.menu_items, {description:searchTerm});
            return foundItems;
        });
    };
}

function FoundItemsDirective() {
    var ddo = {
        templateUrl: "foundItems.html",
        scope: {
            items: '<',
            onRemove: '&'
        }
    };

    return ddo;
}

})();
