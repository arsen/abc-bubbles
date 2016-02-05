(function(app) {
    app.directive('timer', ['$rootScope', '$interval', '$game', function($rootScope, $interval, $game) {
        var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'timer/timer.html',
            replace: true,
            link: function(scope, element, attrs) {

                scope.timerValue = 10;

                var stop;

                var timerStart = function() {
                    // Don't start a new fight if we are already fighting
                    if (angular.isDefined(stop)) return;

                    stop = $interval(function() {
                        if (scope.timerValue > 0) {
                            scope.timerValue = scope.timerValue - 1;
                        } else {
                            scope.timerStop();
                            $game.done();
                        }
                    }, 1000);
                };
                timerStart();
                
                $rootScope.$on('gameStart', timerStart);

                scope.timerStop = function() {
                    if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                };

                scope.timerReset = function() {
                    scope.timerValue = 60
                };

                scope.$on('$destroy', function() {
                    // Make sure that the interval is destroyed too
                    scope.timerStop();
                });

            }
        };
    }]);
}(angular.module('abc-bubbles')));
