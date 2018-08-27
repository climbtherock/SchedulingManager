(function(){
    angular.module('heepsApp')
        .controller('appointmentsController',
                ['$scope','$http','$uibModal','Appointments',appointmentsController])

        function appointmentsController($scope, $http, $uibModal,Appointments){

            $scope.months = ['June','July','August','September','October'];
            // $scope.calendars = ['Hipa', 'Alan Whitaker']
            init();

            function init(){
                _getAppointments();
                $scope.showDetails = false;
            }

            function _getAppointments(){
                $scope.loading = true;
                
                Appointments.get()
                .then(function(response){
                    $scope.appointments = response.data;
                    $scope.loading = false;
                    $scope.masterAppointments = angular.copy($scope.appointments);
                    getCalendarDropdowns(response.data)
                })
            }

            $scope.clearFilters = function(){
                $scope.appointments = $scope.masterAppointments;
            }

            $scope.filterMonths = function(){
                var appointments = []
                angular.forEach($scope.masterAppointments, function(appointment){
                        if(appointment.date.indexOf($scope.selectedMonth) > -1){
                            appointments.push(appointment);
                        }
                    })
                $scope.appointments = appointments;
            }

            $scope.filterDate = function(){
                var day = new Date($scope.selectedDate).getDay();
                var appointments = []
                angular.forEach($scope.masterAppointments, function(appointment){
                        var apptDay = new Date(appointment.datetime).getDay()
                        if(day === apptDay){
                            appointments.push(appointment);
                        }
                    })
                $scope.appointments = appointments;
            }

            $scope.filterCalendar = function () {
                var appointments = []
                angular.forEach($scope.masterAppointments, function(appointment){
                        if(appointment.calendar.indexOf($scope.selectedCalendar) > -1){
                            appointments.push(appointment);
                        }
                    })
                $scope.appointments = appointments;
            }

            $scope.cancelAppointment = function(appointment_id){
                var modalInstance = $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'static/components/shared/modalTemplates/cancel-appt-modal.html',
                            controller: 'cancelApptModalController',
                            resolve: {
	                    	    appointment_id : appointment_id
	                        }
                        })
	  	    }

	  	    $scope.rescheduleAppointment = function(appointment_id){
	  		    var modalInstance = $uibModal.open({
	  					animation: true,
				        ariaLabelledBy: 'modal-title',
				        ariaDescribedBy: 'modal-body',
	                    templateUrl: 'static/components/shared/modalTemplates/reschedule-appt-modal.html',
                        controller: 'rescheduleApptModalController',
	                    resolve: {
	                    	appointment_id : appointment_id
	                    }
	                })
	  	    }

	  	    function getCalendarDropdowns(appointments){
	  	        var calendars = []
                angular.forEach(appointments,function(appointment){
                    if(calendars.length < 1 || calendars.indexOf(appointment.calendar) < 0){
                        calendars.push(appointment.calendar)
                    }
                })

                $scope.calendars = calendars;
            }
        }
})()