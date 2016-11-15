(function () {
    'use strict';

    angular.module('Data')
    .controller('ItemsListController', ItemsListController);

    ItemsListController.$inject = ['MenuDataService', 'items', '$stateParams'];
    function ItemsListController(MenuDataService, items, $stateParams) {
        var mainlist = this;
        mainlist.items = items.data.menu_items;
        mainlist.catName = items.data.category.name;
        mainlist.catShortName = $stateParams.itemId;
    }

})();
