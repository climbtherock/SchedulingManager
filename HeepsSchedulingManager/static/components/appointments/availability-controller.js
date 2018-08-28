(function(){
    angular.module('heepsApp')
        .controller('availabilityController',
                ['$scope','Availability','$filter','$http','$uibModal','Appointments','$q','$uibModalInstance','Calendars',availabilityController])

        function availabilityController($scope, Availability, $filter, $http, $uibModal,Appointments,$uibModalInstance,Calendars){
            
            $scope.getAppointments = getAppointments;
            $scope.scheduleAppointment = scheduleAppointment;
    
            init();
            function init(){
                if(Appointments.getApptUser()){
                    console.log(Appointments.getApptUser())
                    $scope.rescheduleRequested = true;
                    var appointmentToReschedule = Appointments.getApptUser();
                    
                    $scope.selectedDate = new Date(appointmentToReschedule.datetime);
                    setAppointmentTypeId(appointmentToReschedule.type);
                    $scope.selectedCalendar = appointmentToReschedule.calendarID;
                    Appointments.setApptUser('');
                    getCalendarsDropDown();
                }
                else{
                    getAvailabilityDropdown();
                    getCalendarsDropDown();
                }
                
            }
            
            function getAppointments(){
                if(validateInputs())
                {
                    var allDates = []
                    var allTimes = []
                    var momentDate = new moment($scope.selectedDate)

                    for(i=0; i<6; i++){
                        allDates.push(new Date(momentDate).toDateString())
                        var formattedDate = $filter('date')(new Date(momentDate),"yyyy-MM-dd")
                        var typeId = $scope.selectedType.id;
                        if($scope.rescheduleRequested){
                            var calendarId = $scope.selectedCalendar;
                        }
                        else{
                            var calendarId = $scope.selectedCalendar.id;
                        }
                        $http.post('api/appointments/availability/',{"date":formattedDate,"type":typeId, "calendarID":calendarId})
                            .then(function(response){
                                $scope.availableAppointments = response.data;
                                allTimes.push(response.data)
                            })
                        momentDate.add(1,'days')
                    }
                    $scope.weekTimes = allTimes;
                    console.log(allTimes)
                    $scope.weekDates = allDates;
                }
            }

            function getAvailabilityDropdown(){
                Availability.get()
                    .then(function(response){
                        $scope.appointmentTypes = response.data;
                        if(!$scope.rescheduleRequested){
                            initializeAvailability(response.data)
                        }
                        
                    })
            }

            function getCalendarsDropDown(){
                $http.get('api/calendars/')
                    .then(function(response){
                        $scope.calendars = response.data;
                    })
            }

            function initializeAvailability(types){
                $scope.selectedType = types[0]
                var date = new moment()
                date.add(1,'days')
                $scope.selectedDate = new Date(date)

                $scope.getAppointments()
            }

            function scheduleAppointment(appointment){
                if(Appointments.getApptUser()){
                    var user = Appointments.getApptUser();
                    var appointmentDetails = {
                        "datetime": appointment.time,
                        "appointmentTypeID": $scope.selectedType.id,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "email": user.email
                    }
                    $http.post('api/appointments/',appointmentDetails)
                        .then(function(response){
                            console.log(response.data)
                        })
                }
                else{
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'static/components/shared/modalTemplates/add-appointment-modal.html',
                        controller: 'addApptModalController',
                        resolve: {
                            appointment : appointment,
                            type : $scope.selectedType
                            }
                        })
                    }
            }
            
            function setAppointmentTypeId(typeName){
                Availability.get()
                    .then(function(response){
                        $scope.appointmentTypes = response.data;
                        angular.forEach(response.data,function(type){
                            if(type.name == typeName){
                                $scope.selectedType = type;
                                $scope.getAppointments();
                            }
                        })
                    })
            }

            function validateInputs(){
                if($scope.selectedType && $scope.selectedDate && $scope.selectedCalendar){
                    return true;
                 }
                 else{
                     console.log('input error')
                     return false;
                 }
            }


        }
})()