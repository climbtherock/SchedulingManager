(function(){
    angular.module('heepsApp')
        .controller('transactionsController',
                ['$scope','Appointments', '$uibModal', adminController])

        function adminController($scope, Appointments, $uibModal){
            init();

            function init(){
                getTransactions();
            }

            $scope.charge = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                  ariaLabelledBy: 'modal-title',
                  ariaDescribedBy: 'modal-body',
                  templateUrl: 'static/components/shared/modalTemplates/stripe-charge-modal.html',
                  //controller: 'availabilityController',
                  //windowClass: 'reschedule-modal',
              })
            }

            $scope.test = function(e){
                debugger
                var formElement = angular.element(e.target);
                alert(formElement)
                // $http.post('api/charges',)
                // action="api/charges/" method="POST"
            }

            function getTransactions(){
                Appointments.get()
                    .then(function(response){
                        $scope.transactions = response.data;
                    })
            }

        }
})()