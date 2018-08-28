(function(){
    'use strict';

    angular
        .module('heepsApp')
        .factory('Calendars', ['$http', Calendars]);

    function Calendars($http){
        var vm = this;
        return{
            get: get
        }

        function get() {
            return $http.get('api/calendars/')
        }

    }
})();