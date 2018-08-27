(function(){
    angular.module('heepsApp')
        .controller('indexController',
                ['$scope','$http','$location',indexController])

        function indexController($scope, $http,$location){
            init();

            function init(){
                getCurrentUser()
            }

            $scope.test = false;

            function getCurrentUser(){
                $http.get('api/users/current/')
                    .then(function(response){
                        if (!response.data.username){
                            $scope.hideNav = true;
                            $location.url('/login');
                            $scope.user = response.data;
                        }
                        else{
                            $scope.username = response.data.username;
                            if(response.data.role == 'owner' || response.data.role == 'superuser'){
                                $scope.displayAdmin = true;
                            }
                        }
                    },function(){
                        alert('no one logged in')
                        // $scope.login_error = "Invalid username or password";
                    })
            }

        }
})()