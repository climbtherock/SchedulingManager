(function(){
    'use strict';

    angular
        .module('heepsApp')
        .factory('Appointments', ['$http', Appointments]);

    function Appointments($http){
        var vm = this;
        return{
            get: get,
            setApptUser: setApptUser,
            getApptUser: getApptUser
        }
        
        function get() {
            return $http.get('api/appointments/')
        }

        function setApptUser(user){
            vm.user = user;
        }

        function getApptUser(){
            return vm.user
        }

    }
})();