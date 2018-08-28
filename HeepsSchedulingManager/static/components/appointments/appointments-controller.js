(function(){
    angular.module('heepsApp')
        .controller('appointmentsController',
                ['$scope','$http','$uibModal','Appointments','$location',appointmentsController])

        function appointmentsController($scope, $http, $uibModal,Appointments, $location){

            $scope.filterDate = filterDate;

            init();


            function init(){
                _getAppointments();
                $scope.showDetails = false;
            }

            $scope.clearFilters = function(){
                $scope.appointments = $scope.masterAppointments;
                initializeDateFilter();
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

            function filterDate(){
                var day = new Date($scope.selectedDate);
                var appointments = []
                
                angular.forEach($scope.masterAppointments, function(appointment){
                        var apptDay = new Date(appointment.datetime)
                        
                        if(day.toDateString() === apptDay.toDateString()){
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

            $scope.scheduleNewAppointment = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                  ariaLabelledBy: 'modal-title',
                  ariaDescribedBy: 'modal-body',
                  templateUrl: 'static/components/shared/modalTemplates/reschedule-appt-modal.html',
                  controller: 'availabilityController',
                  windowClass: 'reschedule-modal',
                  resolve: {
                      appointment : null
                  }
              })
            }

	  	    $scope.rescheduleAppointment = function(appointment){
                if(new Date(appointment.datetime) < new Date()){
                    alert('must select current date or later')
                    return
                }
                Appointments.setApptUser(appointment)
	  		    var modalInstance = $uibModal.open({
	  					animation: true,
				        ariaLabelledBy: 'modal-title',
				        ariaDescribedBy: 'modal-body',
	                    templateUrl: 'static/components/shared/modalTemplates/reschedule-appt-modal.html',
                        controller: 'availabilityController',
                        windowClass: 'reschedule-modal',
	                    resolve: {
                            appointment : appointment,
                            
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

            function _getAppointments(){
                Appointments.get()
                .then(function(response){
                    $scope.appointments = response.data;
                    $scope.masterAppointments = angular.copy($scope.appointments);
                    getCalendarDropdowns(response.data)
                    initializeDateFilter()
                })
            }

            function initializeDateFilter(){
                $scope.selectedDate = new Date()
                $scope.filterDate()
            }

        }
})()