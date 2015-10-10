'use strict';


angular.module('chevent')
    .service('locationService', locationService);

locationService.$inject = ['$http', '$q', '$timeout'];

function locationService($http, $q, $timeout) {

    var locationService = {
        getLocation: getLocation
    };

    return locationService;

    function getLocation() {

        var deferred = $q.defer();

        var url = "http://ip-api.com/json";

        $http.get(url)
            .success(function (response, status, headers, config) {

                deferred.resolve(response);

            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }


}