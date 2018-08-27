(function(){
    angular.module('heepsApp')
        .controller('rescheduleApptModalController',
                ['$scope','$uibModalInstance','$http','appointment_id',rescheduleApptModalController])

        function rescheduleApptModalController($scope, $uibModalInstance, $http, appointment_id){
            $scope.changeDate = function(){
                var date = new Date($scope.selectedDate)
                date.setHours(13);

                var url = "api/appointments/" + appointment_id +"/reschedule/"
                $http({
                    method: 'PUT',
                    url: url,
                    data:{"datetime":date}
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