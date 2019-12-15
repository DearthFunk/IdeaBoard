ideaBoard.controller('board', ['$scope', '$http', 'dataService', '$routeParams',
    function($scope, $http, dataService, $routeParams) {
        console.log('board loaded');

        dataService
            .loadBoard($routeParams.boardId)
            .then(function(board){

                $scope.board = board;
                $http.get('get.php?get=ideas&boardId=' + $scope.board.id)
                    .success(function(data){
                        $scope.board.ideas = data;
                        for (var i = 0; i < $scope.board.ideas.length; i++) {
                            $http.get('get.php?get=comments&ideaId=' + i)
                                .success((function(i) {
                                    return function(data) {
                                        $scope.board.ideas[i].comments = data;
                                    }
                                })(i))
                                .error(function() {
                                    console.log('ERROR: get comments');
                                });
                        }
                    })
                    .error(function() {
                        console.log('ERROR: get ideas');
                    });
            });

        $scope.expandIdeas = function()   {  $scope.$broadcast('expandIdeasEvent');};
        $scope.collapseIdeas = function() { $scope.$broadcast('collapseIdeasEvent');};

    }
]);


