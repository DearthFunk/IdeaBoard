angular.module('headerModule', [])

    .directive('header', function ($modal,$location, dataService) {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/header/header.html',
            replace: true,
            link: function(scope)	{

                scope.dataService = dataService;

                scope.changeBoardInfo = function(item) {
                    if (dataService.loggedInUser.preferences.showHoverBoardInfo) {
                        scope.boardInfo = item;
                    }
                };

            }
        }
    });