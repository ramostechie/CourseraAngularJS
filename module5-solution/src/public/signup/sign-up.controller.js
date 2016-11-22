(function () {
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
        var $ctrl = this;

        $ctrl.submit = function () {
            $ctrl.noexists = false;

            var promise = MenuService.getFavItem($ctrl.user.menunumber);

            promise.then(function (response) {
                $ctrl.user.dishname = response.data.name;
                $ctrl.user.dishdesc = response.data.description;
                MenuService.setPrefs($ctrl.user);
                $ctrl.successful = true;
            })
            .catch(function (error) {
                $ctrl.noexists = true;
                $ctrl.successful = false;
            })

        };

        $ctrl.DishControl = function () {
            $ctrl.noexists = false;

            var promise = MenuService.getFavItem($ctrl.user.menunumber);

            promise.then(function (response) {
                
            })
            .catch(function (error) {
                $ctrl.noexists = true;
            })

        };
    }


})();