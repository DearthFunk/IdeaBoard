angular.module('globalAttributes', [])

    .directive("regExp", function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                var regexp = eval(attrs['regExp']);
                elem.on("keypress", function(event) {
                    var which = String.fromCharCode(event.which);
                    if(!regexp.test(elem.val() + which)) {
                        event.preventDefault();
                    }
                })
            }
        }
    })
    .directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs['ngRightClick']);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    });