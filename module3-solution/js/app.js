(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            restrict: "E",
            templateUrl: 'templates/foundItems.html',
            scope: {
                foundItems: '<',
                foundMsg: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    function NarrowItDownControllerDirective() {
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.searchTerm = "";
        menu.found = [];
        menu.foundMessage = "-1";

        menu.btnNarrowItDown = function () {

            menu.found = [];
            menu.foundMessage = "-1";

            if (menu.searchTerm.length > 0) {
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

                promise.then(function (response) {
                    menu.found = response;
                    if (menu.found.length < 1)
                        menu.foundMessage = "Nothing found";
                })
                .catch(function (error) {
                    menu.foundMessage = "Nothing found";
                })
            }
            else {
                menu.foundMessage = "Nothing found";
            }
        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
            if (menu.found.length < 1)
                menu.foundMessage = "All";

        };

    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var allItems = result.data.menu_items;
                var foundItems = [];
                for (var i = 0; i < allItems.length; i++) {
                    var thisObject = allItems[i];
                    if (thisObject.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(thisObject);
                    }
                }
                // return processed items
                return foundItems;
            });

            return response;
        };

    }

})();
