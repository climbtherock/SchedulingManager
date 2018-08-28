(function(){
    'use strict';

    angular
        .module('heepsApp')
        .factory('Blocks', ['$http', Blocks]);

    function Blocks($http){
        var vm = this;
        return{
            get: get,
            post: post,
            getById: getById,
            deleteBlock: deleteBlock
        }

        function post(blockDetails) {
            return $http.post('api/blocks/', blockDetails)
        }

        function getById(blockId) {
            return $http.get('api/blocks/' + blockId + '/')
        }

        function get() {
            return $http.get('api/blocks/')
        }

        function deleteBlock(blockId) {
            return $http.delete('api/blocks/' + blockId + '/')
        }

    }
})();