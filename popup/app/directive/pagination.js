/**
 * Created by gokhan.karadas on 9.10.2015.
 */

angular.module('chevent')
    .filter('pagination', pagination);

pagination.$inject = [];

function pagination() {

    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
}