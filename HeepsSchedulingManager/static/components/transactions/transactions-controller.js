(function(){
    angular.module('heepsApp')
        .controller('transactionsController',
                ['$scope','Appointments',adminController])

        function adminController($scope, Appointments){
            init();

            function init(){
                getTransactions();
            }

            function getTransactions(){
                Appointments.get()
                    .then(function(response){
                        $scope.transactions = response.data;
                    })
            }

        }
})()