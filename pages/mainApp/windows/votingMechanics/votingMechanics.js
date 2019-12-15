ideaBoard.controller('votingMechanics', ['$scope', 'dataService', 'locService',
    function($scope, dataService, locService) {

        $scope.dataService = dataService;
        $scope.locService = locService;
        $scope.activeMechanics = 0;
        $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
        var tempMechanics = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
        tempMechanics.enabled = false;
        tempMechanics.name = "New";

        $scope.selectMechanics = function(index) {
            $scope.activeMechanics = index;
            $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
        };

        $scope.toggleEnable = function(e, index) {
            if (e){e.stopPropagation();}
            for (var i = 0; i < dataService.boards.length; i++) {
                if (dataService.boards[i].votingMechanicsId == dataService.votingMechanics[index].id) {
                    dataService.boards[i].votingMechanicsId = 0;
                }
            }
        };
        $scope.newMechanics = function() {
            dataService.votingMechanics.push(angular.copy(tempMechanics));
            dataService.votingMechanics[dataService.votingMechanics.length-1].id = 1000 + dataService.votingMechanics.length;
            $scope.activeMechanics = dataService.votingMechanics.length-1;
            $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
        };

        $scope.save = function() {
            dataService.votingMechanics[$scope.activeMechanics] = angular.copy($scope.tempData);
        };
        $scope.saveMechanicsDisabled = function() {
            return !(
                angular.toJson($scope.tempData) != angular.toJson(dataService.votingMechanics[$scope.activeMechanics])
            )
        };

        $scope.moveUp = function(e,index) {
            if(e){e.stopPropagation();}
            if (index < dataService.votingMechanics.length-1) {
                var temp = dataService.votingMechanics[index];
                dataService.votingMechanics[index] = dataService.votingMechanics[index+1];
                dataService.votingMechanics[index+1] = temp;
                if (index == $scope.activeMechanics) {
                    $scope.activeMechanics++;
                    $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
                }
            }
        };

        $scope.moveDown = function(e,index) {
            if(e){e.stopPropagation();}
            if (index > 1) {
                var temp = angular.copy(dataService.votingMechanics[index]);
                dataService.votingMechanics[index] = angular.copy(dataService.votingMechanics[index-1]);
                dataService.votingMechanics[index-1] = temp;
                if (index == $scope.activeMechanics) {
                    $scope.activeMechanics--;
                    $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
                }
            }
        };

        $scope.remove = function(e,index) {
            if(e){e.stopPropagation();}
            if ($scope.activeMechanics >= index) {
                $scope.activeMechanics--;
                $scope.tempData = angular.copy(dataService.votingMechanics[$scope.activeMechanics]);
            }
            for (var i = 0; i < dataService.boards.length; i++) {
                if (dataService.boards[i].votingMechanicsId == dataService.votingMechanics[index].id) {
                    dataService.boards[i].votingMechanicsId = 0;
                }
            }
            dataService.deleteItem("votingMechanics",index);
        };
    }
]);
