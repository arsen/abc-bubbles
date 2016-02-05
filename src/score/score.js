(function(app) {
    app.directive('score', [ '$rootScope', function($rootScope) {

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'score/score.html',
            replace: true,
            link: function(scope, element, attrs) {
                scope.scoreValue = 0;
                var scoreUpdate = function(e, data) {
                    scope.scoreValue = data.bubblesCount;
                }
                console.log("rootScope", $rootScope)
                $rootScope.$on('bubblePopped', scoreUpdate);
            }
        };
    }]);
}(angular.module('abc-bubbles')));
