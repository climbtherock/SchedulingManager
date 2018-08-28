(function(){
    angular.module('heepsApp')
        .controller('loginController',
                ['$scope','$http','$uibModal','$location',loginController])

        function loginController($scope, $http, $uibModal, $location){
            init();
            function init(){
                //openLoginModal()
                isUserEmployee()
            }

            function openLoginModal(){
                var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'static/components/shared/modalTemplates/login-modal.html',
                            controller: 'loginModalController',
                        })
            }

            $scope.loginUser = function(){
                $http.post('api/users/login/', $scope.user)
                .then(function(){
                    $location.url('/');
                },function(){
                    alert('login error')
                })
            }

            $scope.logout = function () {
                $http.get('api/users/logout/')
                    .then(function(){
                        $location.url('/login');
                    })
            }

            function isUserEmployee(){
                $http.get('api/users/current/')
                    .then(function(response){
                        if(response.data.role === 'employee'){
                            $scope.isEmployee = true;
                        }
                        else{
                            $scope.isEmployee = false;
                        }
                    },function(){
                        alert('login error')
                        // $scope.login_error = "Invalid username or password";
                    })
            }
        }
})()