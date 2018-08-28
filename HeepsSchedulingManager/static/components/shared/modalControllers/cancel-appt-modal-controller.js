(function(){
    angular.module('heepsApp')
        .controller('cancelApptModalController',
                ['$scope','$uibModalInstance','$http','appointment_id',cancelApptModalController])

        function cancelApptModalController($scope, $uibModalInstance, $http, appointment_id){
            $scope.ok = function(){
                var cancelUrl = "api/appointments/" + appointment_id +"/cancel/"
                $http({
                    method: 'PUT',
                    url: cancelUrl,
                    data:{}
                })
                .then(function(response){
                    console.log(response.data)
                    $uibModalInstance.dismiss();
                })
            }

            $scope.cancel = function(){
                $uibModalInstance.dismiss();
            }
        }
})()