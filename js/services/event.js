angular.module('eventServiceModule', [])
    .directive('html', function($rootScope,$window, dataService, locService){
        return {
            restrict: 'E',
            link: function(scope,element){
                function applyLocalStorage() {
                    $window.localStorage.setItem('ideaBoardLocalStorage', JSON.stringify(
                        {
                            active: false,
                            loggedInUser: dataService.loggedInUser.id,
                            localizations: locService.localizations
                        }
                    ));
                }

                //window events
                $window.onblur   = function() {$rootScope.$broadcast("windowBlurEvent"); };
                $window.onresize = function() {$rootScope.$broadcast("windowResizeEvent"); };
                $window.onbeforeunload = function(){ applyLocalStorage(); };
                $rootScope.$on("logout",function(){  applyLocalStorage(); });

                //mouse events
                element.bind("mousewheel", function(event){ $rootScope.$broadcast("mouseWheelEvent",event); });
                element.bind("mousemove", function(event) { $rootScope.$broadcast("mouseMoveEvent",event);  });
                element.bind("mousedown", function(event) { $rootScope.$broadcast("mouseDownEvent",event);  });
                element.bind("mouseup", function(event)   { $rootScope.$broadcast("mouseUpEvent",event);    });

                //keyboard events
                element.bind("keydown", function(event){ $rootScope.$broadcast("keyDownEvent",event); });
                element.bind("keyup", function(event)  { $rootScope.$broadcast("keyUpEvent",event);   });

            }
        }
    });