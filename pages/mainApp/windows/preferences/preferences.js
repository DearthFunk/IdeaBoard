ideaBoard.controller('preferences', ['$scope', 'dataService',
    function($scope, dataService) {

        $scope.dataService = dataService;
        console.log(dataService.loggedInUser);
        $scope.tempData = angular.copy(dataService.loggedInUser);
        delete $scope.tempData['password'];
        $scope.tempData.password1 = "";
        $scope.tempData.password2 = "";
        $scope.invalidCreds = false;

        $scope.clearHistory = function() {
            dataService.loggedInUser.history = [];
        };

        $scope.save = function() {
            dataService.loggedInUser.password = $scope.tempData.password1;
            dataService.loggedInUser.fName = $scope.tempData.fName;
            dataService.loggedInUser.lName = $scope.tempData.lName;
            dataService.loggedInUser.email = $scope.tempData.email;
            dataService.loggedInUser.profileImg = $scope.tempData.profileImg;
            dataService.loggedInUser.preferences.showHistory = $scope.tempData.preferences.showHistory;
            $scope.tempData = angular.copy(dataService.loggedInUser);
            $scope.tempData.password1 = "";
            $scope.tempData.password2 = "";
        };

        $scope.savePreferencesDisabled = function() {
            return (
                !angular.isDefined($scope.tempData.fName) ||
                !angular.isDefined($scope.tempData.lName) ||
                !angular.isDefined($scope.tempData.email) ||
                $scope.tempData.password1 != $scope.tempData.password2 ||
                !(
                    $scope.tempData.fName != dataService.loggedInUser.fName ||
                    $scope.tempData.lName != dataService.loggedInUser.lName ||
                    $scope.tempData.email != dataService.loggedInUser.email ||
                    $scope.tempData.password1.length > 0
                )
            )
        };
    }
]);



