(function(){
    angular.module('heepsApp')
        .controller('calendarViewController',
                ['$scope','$compile','uiCalendarConfig','Appointments',calendarViewController])

        function calendarViewController($scope, $compile, uiCalendarConfig, Appointments){
            init()
            //$scope.testAppts = testAppts;

            function init(){
                testAppts()
            }
            /* config object */
            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            // $scope.events = [
            //     {title:'Matt test event',start: new Date(y,m,4)},
            //     {title: 'All Day Event',start: new Date(y, m, 1)},
            //     {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            //     {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            //     {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            //     {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            //     {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            //   ];

            // $scope.eventSource = {
            // url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            // };

            function testAppts(){
                $scope.events = []
                var events = []
                $scope.events.push({title: 'Before Rest Call',start: new Date(y, m, 1)})
                Appointments.get()
                    .then(function(response){
                        console.log(response.data)
                        angular.forEach(response.data,function(appt){
                            var date = new Date(new Date(appt.datetime).getFullYear(), new Date(appt.datetime).getMonth(), new Date(appt.datetime).getDay())
                            var name = appt.firstName + ' ' + appt.lastName
                            var temp = {title: name, start: date, color:'#e91e63'}
                            $scope.events.push(temp)
                        })
                    })
            }

            $scope.renderCalender = function(calendar) {
                if(uiCalendarConfig.calendars[calendar]){
                  uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
              };
        

            $scope.eventSources = [$scope.events];

        }
})()