(function(){
    angular.module('heepsApp')
        .controller('availabilityController',
                ['$scope','Availability','$filter','$http','$uibModal',availabilityController])

        function availabilityController($scope, Availability, $filter, $http, $uibModal){
            init();

            function init(){
                getAvailabilityDropdown();
            }
            $scope.getAppointments = function(){
                if($scope.selectedType){
                    console.log($scope.selectedType)
                }
                else{
                    alert('must select type')
                    return
                }

                if($scope.selectedDate){
                    console.log($scope.selectedDate)
                }
                else{
                    alert('must select date')
                    return
                }

                var formattedDate = $filter('date')($scope.selectedDate,"yyyy-MM-dd")
                var typeId = $scope.selectedType.id;
                console.log({"date":formattedDate,"type":typeId})
                $http.post('api/appointments/availability/',{"date":formattedDate,"type":typeId})
                    .then(function(response){
                        $scope.availableAppointments = response.data;
                    })


            }

            $scope.scheduleAppointment = function(appointment){
                var modalInstance = $uibModal.open({
	  					animation: true,
				        ariaLabelledBy: 'modal-title',
				        ariaDescribedBy: 'modal-body',
	                    templateUrl: 'static/components/shared/modalTemplates/add-appointment-modal.html',
                        controller: 'addApptModalController',
	                    resolve: {
	                    	appointment : appointment,
                            type : $scope.appt.type
	                    }
	                })
            }

            function getAvailabilityDropdown(){
                Availability.get()
                    .then(function(response){
                        $scope.appointmentTypes = response.data;
                        initializeAvailability(response.data)
                    })
            }

            function initializeAvailability(types){
                $scope.selectedType = types[0]
                var date = new moment()
                date.add(1,'days')
                $scope.selectedDate = new Date(date)

                $scope.getAppointments()
            }


        }
})()