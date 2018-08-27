(function(){
    'use strict';

    angular
        .module('heepsApp')
        .factory('Availability', ['$http', Appointments]);

    function Appointments($http){
        var vm = this;
        return{
            get: get
        }

        function get() {
            return $http.get('api/appointments/types/')
        }

    }
})();