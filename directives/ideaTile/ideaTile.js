angular.module('ideaTileElement', [])
    .directive('ideaTile', function () {
        return {
            restrict:'C',
            templateUrl:'directives/ideaTile/ideaTile.html',
            replace: true,
            scope: {
                board: "=board",
                idea: "=idea"
            },
            link: function(scope)	{

                var resizing = false;
                var startX,startY,startW,startH = -1;
                var min = 200;
                var maxW = 1100;
                var maxH = 600;
                scope.width = min;
                scope.height = min;

                scope.getTotalVotes = function() {

                    var count = 0;
                    if ('comments' in scope.idea) {
                        for (var i = 0; i < scope.idea.comments.length; i++ ) {
                            count += scope.idea.comments[i].voteType ? 1 : -1;
                        }
                    }
                    return count;
                };

                scope.startResize = function(e) {
                    resizing = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    startW = scope.width;
                    startH = scope.height;
                };

                scope.resetSize = function(){
                    scope.width = min;
                    scope.height = min;
                };

                scope.$on('expandIdeasEvent',function(){
                    scope.width = maxW;
                    scope.height = maxH;
                });

                scope.$on('collapseIdeasEvent',function(){
                    scope.width = min;
                    scope.height = min;
                });

                scope.$on("mouseMoveEvent",function(e,args) {
                    if (resizing) {
	                    var newW = startW - (startX - args.clientX);
	                    var newH = startH - (startY - args.clientY);
                        scope.width = newW < min ? min : newW > maxW ? maxW : newW;
                        scope.height = newH < min ? min : newH > maxH ? maxH : newH;
                        scope.$apply();
                    }
                });
                scope.$on("mouseUpEvent",function(e) {
                    if (resizing) {
                        resizing = false;
                        startX = -1;
                        startY = -1;
                        startW = -1;
                        startH = -1;
                    }
                });
            }
        }
    });
