angular.module('themeCreatorModule', [])

    .directive('themeCreator', function () {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/windows/settings/themeCreator/themeCreator.html',
            replace: true,
            link: function(scope)	{


            }
        }
    });
