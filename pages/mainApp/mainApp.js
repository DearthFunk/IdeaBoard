angular.module('mainAppModule', [

        "headerModule",
        "sideMenuModule",

        "ideaTileElement",
        "profileImageElement",

        "recycleBinModule",
        "themeCreatorModule",
        "passwordConstraintsModule"

    ])
    .directive('mainApp', function () {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/mainApp.html',
            replace: true,
            transclude: true
        }
    });
