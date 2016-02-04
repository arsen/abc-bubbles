(function(app) {
    app.directive('score', [function() {
        var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'score/score.html',
            replace: true,
            link: function($scope, element, attrs) {
                if (attrs.color) {
                    element.addClass(attrs.color);
                }

                element.bind(animationEndEvent, function() {
                    element.removeClass('bounce');
                });

                element.bind('click', function() {
                    element.addClass('bounce');
                });
            }
        };
    }]);
}(angular.module('abc-bubbles')));
