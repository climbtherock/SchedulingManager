(function(){
    'use strict';

    angular
        .module('heepsApp')
        .factory('Users', ['$http', Users]);

    function Users($http){
        var vm = this;
        return{
            get: get
        }

        function get() {
            return $http.get('api/users/')
        }

    }
})();