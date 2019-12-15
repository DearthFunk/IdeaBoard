var ideaBoard = angular.module('ideaBoard', [
        "ngRoute",
        "ngAnimate",
        "ui.bootstrap",
        "textAngular",

        "globalAttributes",
        "globalFilters",

        "browserTypeServiceModule",
        "dataServiceModule",
        "localizationServiceModule",
        "eventServiceModule",
        "themeServiceModule",

        "mainAppModule"

    ])
    .config(['$routeProvider',
        function($routeProvider) {

            function checkAccountInfo($q,dataService) {
                console.log("check acountinfo");
                var prom = $q.defer();
                if(dataService.accountInfo){ prom.resolve(); }
                else {dataService.getAccountInfo().then(
                    function() {prom.resolve();},
                    function() {prom.reject(); });}
                return prom.promise;
            }

            function checkTeams($q,dataService) {
                console.log("check teams");
                var prom = $q.defer();
                if(dataService.teams){ prom.resolve(); }
                else {dataService.getTeams().then(
                    function() {prom.resolve();},
                    function() {prom.reject(); });}
                return prom.promise;
            }

            function checkLocalizations($q,dataService,locService) {
                console.log("check localizations");
                var prom = $q.defer();
                if(locService.localizations){ prom.resolve(); }
                else {dataService.getLocalizations().then(
                    function(){prom.resolve();},
                    function(){prom.reject();})}
                return prom.promise;
            }

            function checkUsers($q,dataService) {
                console.log("routeProvider checkUsers");
                var prom = $q.defer();
                dataService.getUsers().then(
                    function(){console.log('--dataService.getUsers pass');prom.resolve();},
                    function(){console.log('--dataService.getUsers fail');prom.reject();
                    }
                );
                return prom.promise;
            }

            function checkBoards($q,dataService) {
                console.log("routeProvider checkBoards");
                var prom = $q.defer();
                if(dataService.boards){console.log('--dataService.getBoards alreadyLoaded');prom.resolve();}
                else {dataService.getBoards().then(
                    function() {console.log('--dataService.getBoards pass');prom.resolve();},
                    function() {console.log('--dataService.getBoards fail');prom.reject(); });
                }
                console.log('-----------', prom.promise);
                return prom.promise;
            }

            function checkPermissions(dataService, $q, $location) {
                console.log("check permissions");
                var rt = $location.$$path.toString().slice(1);
                var prom = $q.defer();
                if (dataService.loggedInUser.permissions[rt]) {
                    prom.resolve();
                }
                else {
                    prom.reject();
                    $location.path('/');
                }
                return prom.promise;
            }

            function logToUserHistory($location, dataService) {
                var arr = $location.$$url.split('/');
                dataService.loggedInUser.history.push({
                    txt:arr[arr.length > 4 ? 3 : 1].toUpperCase(),
                    url:'#' + $location.$$url
                });
                if (dataService.loggedInUser.history.length >=5) {
                    dataService.loggedInUser.history.shift();
                }
            }

            /* sets all routes to be case insensitive (ie. users/Users/USERS all load /users) */
            var when = $routeProvider.when;
            $routeProvider.when = function(path, route) {
                route.caseInsensitiveMatch = true;
                return when.apply(this, arguments);
            };

            $routeProvider
                .when('/',{
                    templateUrl: 'pages/login/login.html',
                    controller: 'login',
                    resolve: {
                        checkUsers: checkUsers,
                        accountInfo: checkAccountInfo,
                        checkBoards: checkBoards
                    }
                })
                .when('/login/',{
                    templateUrl: 'pages/login/login.html',
                    controller: 'login',
                    resolve: {
                        checkUsers: checkUsers,
                        accountInfo: checkAccountInfo,
                        checkBoards: checkBoards
                    }
                })
                .when('/preferences',{
                    templateUrl: 'pages/mainApp/windows/preferences/preferences.html',
                    controller: 'preferences',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkBoards: checkBoards
                    }
                })
                .when('/board/:boardId/',{
                    templateUrl: 'pages/mainApp/windows/board/board.html',
                    controller: 'board',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkBoards: checkBoards
                    }
                })
                .when('/boardmanagement',{
                    templateUrl: 'pages/mainApp/windows/boardManagement/boardManagement.html',
                    controller: 'boardManagement',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
	                    checkPermissions: checkPermissions,
                        checkBoards: checkBoards
                    }
                })
                .when('/votingmechanics',{
                    templateUrl: 'pages/mainApp/windows/votingMechanics/votingMechanics.html',
                    controller: 'votingMechanics',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkPermissions: checkPermissions,
                        checkBoards: checkBoards,
                        checkLocalizations: checkLocalizations,


                    }
                })
                .when('/reports',{
                    templateUrl: 'pages/mainApp/windows/reports/reports.html',
                    controller: 'reports',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkPermissions: checkPermissions,
                        checkBoards: checkBoards
                    }
                })
                .when('/settings',{
                    templateUrl: 'pages/mainApp/windows/settings/settings.html',
                    controller: 'settings',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkPermissions: checkPermissions,
                        checkBoards: checkBoards
                    }
                })
                .when('/users',{
                    templateUrl: 'pages/mainApp/windows/users/users.html',
                    controller: 'users',
                    resolve: {
                        checkUsers: checkUsers,
                        checkTeams: checkTeams,
                        checkAccountInfo: checkAccountInfo,
                        checkPermissions: checkPermissions,
                        checkBoards: checkBoards
                    }
                })
                .when('/board/:boardId/idea/:ideaId/',{
                    templateUrl: 'pages/mainApp/windows/idea/idea.html',
                    controller: 'idea',
                    resolve: {
                        checkUsers: checkUsers,
                        checkAccountInfo: checkAccountInfo,
                        checkBoards: checkBoards
                    }
                })

                .otherwise({ redirectTo: '/'});
        }
    ]);