'use strict';


angular.module('chevent')
    .service('cheventService', cheventService);

cheventService.$inject = ['$http', '$q'];

function cheventService($http, $q) {

    var cheventService = {
        getEvent: getEvent
    };

    return cheventService;

    function getEvent() {

        var deferred = $q.defer();

        var url = "http://apifn.com/api/v1/events/";

        $http.get(url)
            .success(function (response, status, headers, config) {

                deferred.resolve(response);

            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }


}