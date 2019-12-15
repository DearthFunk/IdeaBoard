ideaBoard.controller('boardManagement', ['$scope','$modal', 'dataService',
    function($scope, $modal, dataService) {

        var tempBoard = {
            name: "",
            votingMechanicsId: 0,
            enabled: false,
            description: "",
            icon: "",
            id: -1,
            ideas :[]
        };
        $scope.tempData = angular.copy(dataService.boards);
        $scope.recycleBinBoards = [];
        if ($scope.tempData.length == 0) {
            $scope.tempData.push(angular.copy(tempBoard));
        }

        $scope.newBoard = function() {
            $scope.tempData.push(angular.copy(tempBoard));
        };

        $scope.removeBoard = function(index) {
            $scope.recycleBinBoards.push(angular.copy($scope.tempData[index]));
            $scope.tempData.splice(index,1);
        };

        $scope.saveBoards = function() {
            var currentBoardIds = [];
            for (var i = 0; i < dataService.boards.length; i++) {
                currentBoardIds.push(dataService.boards[i].id)
            }
            dataService.boards = angular.copy($scope.tempData);
            for (i = 0; i < $scope.recycleBinBoards.length; i++) {
                $scope.recycleBinBoards[i].deleteInfo = {
                    dateDeleted: Date.parse(new Date),
                    objType: "boards",
                    userId: dataService.loggedInUser.id
                };
                dataService.recycleBin.push(angular.copy($scope.recycleBinBoards[i]));
            }
            $scope.recycleBinBoards = [];
        };

        $scope.canSaveBoard = function() {
            var badBoardData = false;
            for (var i = 0; i < $scope.tempData.length; i++) {
                if (!angular.isDefined($scope.tempData[i].name) || $scope.tempData[i].icon == '') {
                    badBoardData = true;
                    break;
                }
            }
            return (badBoardData || angular.toJson($scope.tempData) == angular.toJson(dataService.boards))
        };

        $scope.moveBoard = function(index,amnt) {
            if (amnt == -1 && index > 0 ||
                amnt ==  1 && index < $scope.tempData.length-1) {
                    var tmp = $scope.tempData[index + amnt];
                    $scope.tempData[index + amnt] = $scope.tempData[index];
                    $scope.tempData[index] = tmp;
            }
        };

        $scope.openIconsModal = function (size,board) {
            $modal.open({
                templateUrl: 'modals/modalIcons/modalIcons.html',
                controller: "modalIcons",
                size: size,
                resolve: {
                    board: function(){ return board }
                }
            }).result.then(
                function (icon) {
                    board.icon = icon;
                },
                function () {
                }
            );
        };
    }
]);
