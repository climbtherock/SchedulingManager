(function(){
    angular.module('heepsApp')
        .controller('homeController',
                ['$scope','$http','$uibModal',homeController])

        function homeController($scope, $http, $uibModal){
            init();

            function init(){
                getUser()
            }

            function getUser(){
                $http.get('api/users/current/')
                    .then(function(response){
                        $scope.username = response.data.username
                    },function(){
                        alert('error getting user')
                    })
            }
        }
})()