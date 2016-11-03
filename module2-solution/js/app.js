(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyList = this;

        buyList.BuyItems = ShoppingListCheckOffService.getToBuyItems();

        buyList.removeBuyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.BoughtItems = ShoppingListCheckOffService.getBoughtItems();
    }


    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var itemsToBuy = [
            {
                name: "leeks",
                quantity: 2
            },
            {
                name: "bananas",
                quantity: 10
            },
            {
                name: "apples",
                quantity: 5
            },
            {
                name: "oranges",
                quantity: 7
            },
            {
                name: "eggs",
                quantity: 12
            },
            {
                name: "tomatoes",
                quantity: 4
            }
        ];

        // List of bought items
        var itemsBought = [];

        service.buyItem = function (itemIndex) {
            service.addItem(itemIndex);
            service.removeItem(itemIndex);
        };

        service.addItem = function (itemIndex) {
            var item = itemsToBuy[itemIndex];
            itemsBought.push(item);
        };

        service.removeItem = function (itemIndex) {
            itemsToBuy.splice(itemIndex, 1);
        };

        service.getToBuyItems = function () {
            return itemsToBuy;
        };

        service.getBoughtItems = function () {
            return itemsBought;
        };

    }

})();
