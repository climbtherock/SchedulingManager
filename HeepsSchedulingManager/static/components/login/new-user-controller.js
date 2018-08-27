(function(){
    angular.module('heepsApp')
        .controller('newUserController',
                ['$scope','$http','$location',newUserController])

        function newUserController($scope, $http,$location){
            init();

            function init(){
                isUserOwner()
            }

            $scope.registerUser = function(){
                var user = $scope.user;

                if(user['password'] === user['confirmPassword']){
                    $http.post('api/users/register/', $scope.user)
                    .then(function(){
                        $location.url('/admin')
                    },function(){
                        alert('login error')
                        // $scope.login_error = "Invalid username or password";
                    })
                }
                else{
                    alert('passwords do not match')
                    //$scope.user = ''
                }
            }

            function isUserOwner(){
                $http.get('api/users/current/')
                    .then(function(response){
                        console.log(response.data)
                        if(response.data.role === 'superuser'){
                            $scope.isSuperuser = true;
                        }
                        else{
                            $scope.isSuperuser = false;
                        }
                    },function(){
                        alert('login error')
                        // $scope.login_error = "Invalid username or password";
                    })
            }

        }
})()