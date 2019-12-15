ideaBoard.controller('modalHTML', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

        $scope.ok = function (newCode) {
            $modalInstance.close(newCode);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
]);