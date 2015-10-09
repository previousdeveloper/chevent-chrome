"use strict";

angular.module('chevent')
    .controller('cheventCtrl', cheventCtrl);

cheventCtrl.$inject = ['$scope', 'cheventService'];

function cheventCtrl($scope, cheventService) {

    var vm = this;
    vm.events = [];
    var newDateFormat = [];

    vm.eventPromise = cheventService.getEvent()
        .then(function (response) {


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
                        event_url: result.event_url,
                        event_date_dmy : result.event_date_ddmmyyyy

                    };

                    vm.events.push(eventDataModel);
                }
            )

        });


    Array.prototype.swapItems = function (a, b) {
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
    };

    vm.eventGo = function (slug) {
        chrome.tabs.create({url: slug});
        return false;
    }
}