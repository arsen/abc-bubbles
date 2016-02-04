(function(app) {
  app.directive('bubble', [function() {
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

    return {
      scope: {
        x: '@',
        value: '@',
        radius: '@',
        color: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'bubble/bubble.html',
      link: function($scope, element, attrs) {
        element.bind('click', function() {
          element.addClass('pop');
        });
      }
    };
  }]);
}(angular.module('abc-bubbles')));