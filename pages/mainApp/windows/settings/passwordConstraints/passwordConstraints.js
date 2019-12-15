angular.module('passwordConstraintsModule', [])

    .directive('passwordConstraints', function () {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/windows/settings/passwordConstraints/passwordConstraints.html',
            replace: true,
            link: function(scope)	{


            }
        }
    });
