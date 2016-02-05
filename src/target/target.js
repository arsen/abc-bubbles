(function(app) {
    app.directive('target', [function() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'target/target.html',
            replace: true,
            link: function($scope, element, attrs) {

            }
        };
    }]);
}(angular.module('abc-bubbles')));
