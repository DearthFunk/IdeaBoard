ideaBoard.controller('settings', ['$scope', 'dataService',

    function($scope,dataService) {

        $scope.selectWindow = 1;
        $scope.dataService = dataService;
        $scope.accountInfo = angular.copy(dataService.accountInfo);

        $scope.save = function() {
            dataService.accountInfo = angular.copy($scope.accountInfo);
        };

        $scope.saveSettingsDisabled = function() {
            return (
                !angular.isDefined($scope.accountInfo.name) ||
                !(
                    $scope.accountInfo.name != dataService.accountInfo.name ||
                    $scope.accountInfo.description != dataService.accountInfo.description
                )
            )
        }
    }
]);
