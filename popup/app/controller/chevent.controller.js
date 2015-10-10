"use strict";

angular.module('chevent')
    .controller('cheventCtrl', cheventCtrl);

cheventCtrl.$inject = ['$scope', 'cheventService', 'locationService'];

function cheventCtrl($scope, cheventService, locationService) {

    var vm = this;
    vm.events = [];
    var newDateFormat = [];
    vm.eventPromise = null;
    vm.search = '';
    vm.finished =null;

    // pagination refactor here not do not use $scope binding directly.
    $scope.curPage = 0;
    $scope.pageSize = 5;

    vm.eventPromise = cheventService.getEvent();

    vm.eventPromise.then(function (response) {


        angular.forEach(response.item, function (result) {

                if (result.event_date_ddmmyyyy !== null) {


                    newDateFormat = result.event_date_ddmmyyyy.split('.');

                    var formatResult = newDateFormat.swapItems(0, 1);
                }

                //Turkish Date Format
                var eventDateDdmmyyyy = formatResult.toString().replace(new RegExp(",", "gm"), ".");

                var eventDataModel = {
                    event_class: result.event_class,
                    event_cost: result.event_cost,
                    event_cost_boolean: result.event_cost_boolean,
                    event_date: result.event_date,
                    event_date_ddmmyyyy: eventDateDdmmyyyy,
                    event_image: result.event_image,
                    event_name: result.event_name,
                    event_url: result.event_url

                };

                vm.events.push(eventDataModel);
            }
        )

        vm.finished = true;
    });

    locationService.getLocation().then(function (res) {

        if (res !== undefined && res !== null) {

            vm.currentCity = res.regionName;
            vm.search = vm.currentCity;
        }

    });

    $scope.numberOfPages = function () {
        return Math.ceil(vm.events.length / $scope.pageSize);
    };

    Array.prototype.swapItems = function (a, b) {
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
    };

    vm.eventGo = function (slug) {
        chrome.tabs.create({url: slug});
        return false;
    }
}


