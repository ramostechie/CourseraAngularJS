(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })

        // Categories page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/main-categories.template.html',
            controller: 'MainCategoriesListController as mainCategoriesList',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // Items page
        .state('items', {
            url: '/items/{itemId}',
            templateUrl: 'src/menuapp/templates/main-items.template.html',
            controller: "ItemsListController as itemsList",
            resolve: {
                items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.itemId);
                }]
            }
        });

    }

})();
