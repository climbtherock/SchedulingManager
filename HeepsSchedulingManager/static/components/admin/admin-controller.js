(function(){
    angular.module('heepsApp')
        .controller('adminController',
                ['$scope','$location','Users',adminController])

        function adminController($scope, $location, Users){
            init();

            function init(){
                getEmployees();
            }

            $scope.addUser = function(){
                $location.url('/register')
            }

            function getEmployees(){
                $scope.employees = []
                Users.get()
                    .then(function(response){
                        angular.forEach(response.data, function(employee){
                            if(employee.role == 'employee'){
                                $scope.employees.push(employee)
                            }
                        })
                    })
            }

        }
})()