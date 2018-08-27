(function(){
    angular.module('heepsApp')
        .controller('forgotPasswordController',
                ['$scope','$http','$uibModal',forgotPasswordController])

        function forgotPasswordController($scope, $http, $uibModal){
            init();
            function init(){

            }

            $scope.resetPassword = function(){
                $http.post('api/users/reset-password/',$scope.user)
                    .then(function(response){
                        alert('sent reset email')
                    })
            }



        }
})()