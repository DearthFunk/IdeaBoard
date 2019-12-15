angular.module('dataServiceModule', [])

    .service('dataService', function($http, $window, $q, $modal, locService){

        var dataServiceScope = this;
        var storage = JSON.parse($window.localStorage.getItem('ideaBoardLocalStorage'));
        dataServiceScope.storageData = storage ? (storage.active ? storage : false) : false;

        dataServiceScope.getLocalizations = function() {
            var prom = $q.defer();
            if (dataServiceScope.storageData) {
                locService.localizations = angular.copy(dataServiceScope.storageData.localizations);
                prom.resolve();
            }
            else {
                $http.get('get.php?get=locVotingMechanics')
                    .success(function(data) {
                        locService.localizations.votingMechanics = angular.copy(data);
                        prom.resolve();
                    })
                    .error(function(){
                        console.log('ERROR: get localizations');
                        locService.localizations = false;
                        prom.reject();
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getTeams = function() {
            var prom = $q.defer();
            if (dataServiceScope.teams) {prom.resolve();}
            else {
                $http.get('get.php?get=teams')
                    .success(function(data) {
                        dataServiceScope.teams = angular.copy(data);
                        for (var i = 0; i < dataServiceScope.teams.length; i++) {
                            var arr = dataServiceScope.teams[i].users.split(',');
                            for (var x = 0; x < arr.length; x++) {
                                arr[x] = parseInt(arr[x]);
                            }
                            dataServiceScope.teams[i].users = arr;
                            prom.resolve();
                        }
                    })
                    .error(function() {
                        console.log('ERROR: get teams');
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getAccountInfo = function() {
            var prom = $q.defer();
            if (dataServiceScope.accountInfo) {prom.resolve();}
            else {
                $http.get('get.php?get=accountInfo')
                    .success(function(data){
                        dataServiceScope.accountInfo = angular.copy(data[0]);
                        prom.resolve();
                    })
                    .error(function() {
                        console.log('ERROR: get accountInfo');
                        dataServiceScope.accountInfo = false;
                        prom.reject();
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getUsers = function() {
            var prom = $q.defer();
            if (dataServiceScope.users) {prom.resolve();}
            else {

	            var oReq = new XMLHttpRequest();
	            oReq.onload = function() {
	            	console.log(this.responseText);
		            tempData = JSON.parse(this.responseText);
	            };
	            oReq.open("get", "get.php?get=users", true);
	            oReq.send();


	            $http.get('get.php?get=users')
                    .success(function(data){
                    	console.log(data)
                        dataServiceScope.users = data;
                        for (i = 0; i < dataServiceScope.users.length; i++) {
                            dataServiceScope.users[i].history = [];
                            console.log(dataServiceScope.users[i]);
                            dataServiceScope.users[i].preferences = JSON.parse(dataServiceScope.users[i].preferences);
                            dataServiceScope.users[i].permissions = JSON.parse(dataServiceScope.users[i].permissions);
                        }

                        if (!dataServiceScope.loggedInUser) {
                            if (dataServiceScope.storageData) {
                                for (var i = 0; i < dataServiceScope.users.length; i++) {
                                    if (dataServiceScope.storageData.loggedInUser.id == dataServiceScope.users[i].id) {
                                        dataServiceScope.loggedInUser = dataServiceScope.users[i];
                                        break;
                                    }
                                }
                            }
                        }
                        prom.resolve();
                    })
                    .error(function() {
                        prom.reject();
                        dataServiceScope.users = false;
                        dataServiceScope.loggedInUser = false;
                        console.log('ERROR: get users');
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getVotingMechanics = function() {
            var prom = $q.defer();
            if (dataServiceScope.votingMechanics) {prom.resolve();}
            else {
                $http.get('get.php?get=votingMechanics')
                    .success(function(data){
                        dataServiceScope.votingMechanics = data;
                        for (var i = 0; i < dataServiceScope.votingMechanics.length; i++) {
                            dataServiceScope.votingMechanics[i].values = JSON.parse(dataServiceScope.votingMechanics[i].values);
                        }
                        prom.resolve();
                    })
                    .error(function() {
                        console.log('ERROR: get votingMechanics');
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getRecycleBin = function() {
            var prom = $q.defer();
            if (dataServiceScope.getRecycleBin) {prom.resolve();}
            else {
                $http.get('get.php?get=recycleBin')
                    .success(function(data){
                        prom.resolve();
                    })
                    .error(function() {
                        console.log('ERROR: get votingMechanics');
                        dataServiceScope.getRecycleBin = false;
                        prom.reject();
                    });
            }
            return prom.promise;
        };

        dataServiceScope.getBoards = function() {
            var prom = $q.defer();

            if (dataServiceScope.boards) {prom.resolve();}
            else {
                $http.get('get.php?get=boards')
                    .success(function(boards){
            //            console.log('---- board data loaded');
                        dataServiceScope.boards = boards;
                        prom.resolve();
                    })
                    .error(function() {
                        console.log('ERROR: get boards');
                        dataServiceScope.boards = false;
                        prom.reject();
                    });
            }
            return prom.promise;
        };





        dataServiceScope.deleteItem = function(objType,index) {
            var item = angular.copy(dataServiceScope[objType][index]);
            item.deleteInfo = {
                dateDeleted: Date.parse(new Date),
                objType: objType,
                userId: dataServiceScope.loggedInUser.id
            };
            dataServiceScope.recycleBin.push(item);
        };

        dataServiceScope.newIdea = function(size, board) {
            $modal.open({
                templateUrl: 'modals/modalHTML/modalHTML.html',
                controller: "modalHTML",
                size: size,
                backdrop: 'static'
            }).result.then(
                function (ideaCode) {
                    board.ideas.push( {
                        id: board.ideas.length + 1000,
                        userId: dataServiceScope.loggedInUser.id,
                        code: ideaCode,
                        comments: []
                    });
                }
            );
        };

        dataServiceScope.loadBoard = function(boardId){
            var boardLoadedPromise = $q.defer();
            for(var x = 0; x < dataServiceScope.boards.length; x++){
                if(dataServiceScope.boards[x].id == boardId){
                    boardLoadedPromise.resolve(dataServiceScope.boards[x]);
                    break;
                }
            }
            return boardLoadedPromise.promise;
        };

        dataServiceScope.loadIdea = function(boardId,ideaId){
            var boardLoadedPromise = $q.defer();
            var found = false;
            for (var i = 0; i < dataServiceScope.boards.length; i++) {
                if (dataServiceScope.boards[i].id == boardId) {
                    for (var y = 0; y < dataServiceScope.boards[i].ideas.length; y++) {
                        if(dataServiceScope.boards[i].ideas[y].id == ideaId){
                            boardLoadedPromise.resolve({
                                board:  dataServiceScope.boards[i],
                                idea: dataServiceScope.boards[i].ideas[y]
                            });
                            found = true;
                            break;
                        }
                    }
                    if (found) {break;}
                }
            }
            return boardLoadedPromise.promise;
        };

    });


