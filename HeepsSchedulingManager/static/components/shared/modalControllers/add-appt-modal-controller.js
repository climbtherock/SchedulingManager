(function(){
    angular.module('heepsApp')
        .controller('addApptModalController',
                ['$scope','$uibModalInstance','$http','appointment','type',addApptModalController])

        function addApptModalController($scope, $uibModalInstance, $http, appointment, type){
            $scope.ok = function(){
                console.log($scope.user);
                console.log(appointment)

                var appointmentDetails = {
                    "datetime": appointment.time,
                    "appointmentTypeID": type.id,
                    "firstName": $scope.user.firstName,
                    "lastName": $scope.user.lastName,
                    "email": $scope.user.email
                }
                $http.post('api/appointments/',appointmentDetails)
                    .then(function(response){
                        console.log(response.data)
                    })
                $uibModalInstance.dismiss();
            }

            $scope.cancel = function(){
                $uibModalInstance.dismiss();
            }
        }
})()