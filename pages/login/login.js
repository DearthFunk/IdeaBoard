ideaBoard.controller('login', ['$scope', '$location', 'dataService',
    function($scope, $location, dataService) {


        $scope.dataService = dataService;

        $scope.login = function() {
            for (var i = 0; i< dataService.users.length; i++) {
                if ($scope.email == dataService.users[i].email && $scope.password == dataService.users[i].password) {
                    dataService.isLoggedIn = true;
                    dataService.loggedInUser = dataService.users[i];

                    if (dataService.boards.length < 1) {
                        $location.url('/preferences');
                    }
                    else {
                        $location.url('/board/'+dataService.boards[0].id);
                    }
                }
            }
            $scope.password = "";
        };

        $scope.loadDemoCredentials = function(index) {
            $scope.email = dataService.users[index].email;
            $scope.password = dataService.users[index].password;
        };

        $scope.loginDisabled = function() {
            return (
                !angular.isDefined($scope.password) ||
                !angular.isDefined($scope.email)
            )
        };

    }
]);