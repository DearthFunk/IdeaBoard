ideaBoard.controller('idea', ['$scope', 'dataService', '$routeParams', '$location',
    function($scope, dataService, $routeParams, $location) {

        dataService
            .loadIdea($routeParams.boardId,$routeParams.ideaId)
            .then(function(data){
                $scope.board = data.board;
                $scope.idea = data.idea;

            });


        $scope.dataService = dataService;
        $scope.tempData = {
            voting:false,
            vote: 0,
            comment: ''
        };

        $scope.getUser = function(id) {
            for (var i =0; i < dataService.users.length; i++) {
                if( id == dataService.users[i].id) {
                    return dataService.users[i].fName + " " + dataService.users[i].lName;
                }
            }
            return ""
        };

        $scope.getTotalVotes = function() {
            var count = 0;
            for (var i = 0; i < $scope.idea.comments.length; i++ ) {
                count += $scope.idea.comments[i].voteType ? 1 : -1;
            }
            return count;
        };


        $scope.canVote = function() {
            var returnVal = true;
            for (var i = 0; i < $scope.idea.comments.length; i++)     {
                if (dataService.loggedInUser.id == $scope.idea.comments[i].userId) {
                    returnVal = false;
                    break;
                }
            }
            return !returnVal
        };

        $scope.canSaveComment = function() {
            return (
                $scope.tempData.vote == 0 ||
                $scope.tempData.comment.length == 0
            )
        };

        $scope.saveComment = function()   {
            $scope.idea.comments.push({
                id: $scope.idea.comments.length + 100,
                dateCreated: Date.parse(new Date),
                voteType: $scope.tempData.vote == 1,
                userId: dataService.loggedInUser.id,
                comment: $scope.tempData.comment
            });
            $scope.tempData.voting = false;
        };

        $scope.changeComment = function(left,allTheWay) {
            $scope.board.ideas.sort(function(a,b){
                return b.votes - a.votes
            });

            var ideaIndex = $scope.board.ideas.indexOf($scope.idea);
            var boardId = $scope.board.id;
            var ideaId =
                allTheWay ?
                    left ?
                        $scope.board.ideas[0].id :
                        $scope.board.ideas[$scope.board.ideas.length-1].id
                    :
                    left ?
                        ideaIndex > 0 ?
                            $scope.board.ideas[ideaIndex-1].id :
                            $scope.board.ideas[0].id
                        :
                        ideaIndex < $scope.board.ideas.length-1 ?
                            $scope.board.ideas[ideaIndex+1].id :
                            $scope.board.ideas[$scope.board.ideas.length-1].id;
            $location.path('/board/' + boardId + '/idea/' + ideaId);

        };

    }
]);

