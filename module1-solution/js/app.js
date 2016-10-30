(function () {
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.items = "";
        $scope.itemsMessage = "";
        $scope.textboxStyle = "";
        $scope.messageStyle = "";

        $scope.displayMessage = function () {
            $scope.itemsMessage = buildMessage($scope.items);
        };

        function buildMessage(string) {
            var totalItemsRaw = string.split(',');
            var totalItems = 0;

            for (var i = 0; i < totalItemsRaw.length; i++) {
                if (!isEmptyEl(totalItemsRaw, i))
                    totalItems += 1;
            }

            if (totalItems < 1) {
                $scope.textboxStyle = "border:1px solid red;";
                $scope.messageStyle = "color:red;";
                return "Please enter data first";
            }

            $scope.textboxStyle = "border:1px solid green;";
            $scope.messageStyle = "color:green;";
            if (totalItems < 4)
                return "Enjoy!";
            else
                return "Too much!";
        }

        function isEmptyEl(array, i) {
            return !(array[i]);
        }

    }

})();
