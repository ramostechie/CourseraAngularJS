(function () {
    'use strict';

    angular.module('Data')
    .component('items', {
        templateUrl: 'src/menuapp/templates/itemslist.template.html',
        bindings: {
            items: '<',
            catShortName: '<',
            catName : '<'
        }
    });

})();