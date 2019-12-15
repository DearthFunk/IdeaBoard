angular.module('recycleBinModule', [])

    .directive('recycleBin', function (dataService) {
        return {
            restrict:'C',
            templateUrl:'pages/mainApp/windows/settings/recycleBin/recycleBin.html',
            replace: true,
            link: function(scope)	{


                scope.restoreItem = function(index) {
                    var dsKey = dataService.recycleBin[index].deleteInfo.objType;
                    if (dsKey) {
                        delete dataService.recycleBin[index].deleteInfo;
                        if (["boards","votingMechanics"].indexOf(dsKey) != -1) {
                            dataService.recycleBin[index].enabled = false;
                        }
                        dataService[dsKey].push(angular.copy(dataService.recycleBin[index]));
                        dataService.recycleBin.splice(index,1);
                    }
                }
            }
        }
    });
