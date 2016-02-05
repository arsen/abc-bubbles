(function(app) {
    app.directive('score', [function() {

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'score/score.html',
            replace: true,
            link: function($scope, element, attrs) {

            }
        };
    }]);
}(angular.module('abc-bubbles')));
