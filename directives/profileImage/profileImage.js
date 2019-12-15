angular.module('profileImageElement', [])
    .directive('profileImage', function () {
        return {
            restrict:'C',
            templateUrl:'directives/profileImage/profileImage.html',
            replace: true,
            scope: {
                user: "=user"
            },
            link: function(scope)	{

                var uploadButton = angular.element(document.createElement("input"))[0];
                uploadButton.type = "file";
                uploadButton.addEventListener('change',
                    function(e) {
                        var file = e.target.files;
                        var reader = new FileReader();
                        reader.onload = (function(theFile) {
                            return function(evt) {
                                scope.user.profileImg = evt.target.result;
                                scope.$apply(); /* look at proper binding */

                            };
                        })(file);
                        reader.readAsDataURL(file[0]);
                    },false
                );

                scope.selectImage = function() {
                    uploadButton.click();
                };

            }
        }
    });
