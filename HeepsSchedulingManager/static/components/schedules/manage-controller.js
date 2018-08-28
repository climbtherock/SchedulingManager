(function(){
    angular.module('heepsApp')
        .controller('manageController',
                ['$scope', 'Calendars','$filter', '$http', 'Blocks',manageController])

        function manageController($scope, Calendars, $filter, $http, Blocks){

            init();

            function init(){
                getCalendarsDropDown();
            }

            $scope.delete = function(blockId){
                Blocks.deleteBlock(blockId)
                    .then(function(response){
                        alert('deleted block')
                    })
            }

            $scope.getBlocks = function(){
                getBlocks();
                $scope.showBlocks = true;
            }

            $scope.requestNewCalendar = function(){
                alert('create email request for new calendar')
            }

            $scope.requestNewType = function(){
                alert('create email request for new type')
            }

            $scope.save = function(block){

                if(blockDataIsValid(block)){
                    var formattedStart = $filter('date')(new Date(block.start),"yyyy-MM-dd")
                    var formattedStartTime = $filter('date')(new Date(block.startTime),"hh:mm a")
                    var start = formattedStart + ' ' + formattedStartTime
    
                    var formattedEnd = $filter('date')(new Date(block.end),"yyyy-MM-dd")
                    var formattedEndTime = $filter('date')(new Date(block.endTime),"hh:mm a")
                    var end = formattedEnd + ' ' + formattedEndTime
                    
                    var blockDetails = {
                        "start" : start,
                        "end" : end,
                        "calendarID" : block.calendar.id
                    }
    
                    postBlock(blockDetails)
                }
                
                
            }

            function blockDataIsValid(block){
                if(block.start && block.startTime && block.end && block.endTime && block.calendar){
                    if(new Date(block.start) < new Date(block.end)){
                        if(new Date(block.startTime) < new Date(block.endTime)){
                            return true;
                        }
                        else{
                            alert('time error')
                            return false
                        }
                    }
                    else{
                        alert('date error')
                        return false
                    }
                }
                alert('block form error')
                return false;
            }

            function getBlocks(){
                Blocks.get()
                    .then(function(response){
                        $scope.blocks = response.data;
                        addCalendarName($scope.blocks)
                        if(!response.data.length > 0){
                            alert('no blocks!')
                        }
                    })
            }

            function addCalendarName(blocks){
                angular.forEach(blocks,function(block){
                    angular.forEach($scope.calendars,function(calendar){
                        if(block.calendarID == calendar.id){
                            block.calendarName = calendar.name
                        }
                    })
                })
            }

            function getCalendarsDropDown(){
                Calendars.get()
                    .then(function(response){
                        $scope.calendars = response.data;
                    })
            }

            function postBlock(blockDetails){
                Blocks.post(blockDetails)
                .then(function(){
                    alert('successfully added block')
                },function(){
                    alert('block error')
                })
            }
        }
})()