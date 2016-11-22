(function () {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['userPreferences', 'ApiPath'];
    function MyInfoController(userPreferences, ApiPath) {
        var $ctrl = this;
        $ctrl.basePath = ApiPath;
        $ctrl.userPreferences = userPreferences;
    }


})();