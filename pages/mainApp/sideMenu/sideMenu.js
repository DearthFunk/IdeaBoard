angular.module('sideMenuModule', [])

    .directive('sideMenu', function ($rootScope,dataService,$location) {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/sideMenu/sideMenu.html',
            replace: true,
            link: function(scope)	{

                scope.selectedMenu = -1;
                scope.dataService = dataService;
                scope.intWindow = [
                    {name: "preferences",txt:"preferences"},
                    {name: "settings",icon:"fa-gear",txt:"settings"},
                    {name: "votingmechanics",icon:"fa-sliders",txt:"voting"},
                    {name: "users",icon:"fa-users",txt:"users"},
                    {name: "boardmanagement",icon:"fa-files-o",txt:"boards"},
                    {name: "reports",icon:"fa-line-chart",txt:"reports"}
                ];

                var url = $location.$$path.replace('/','');
                for (var i = 0; i < scope.intWindow.length; i++) {
                    if (url == scope.intWindow[i].name) {
                        scope.selectedMenu = i;
                        break;
                    }
                }

                scope.logout = function() {
                    dataService.isLoggedIn = false;
                    scope.$emit("logout");
                    $location.path('/login');
                };

            }
        }
    });