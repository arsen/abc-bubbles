(function(app) {
  app.directive('bubble', [function() {
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'bubble/bubble.html',
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
