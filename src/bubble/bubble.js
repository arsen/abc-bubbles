(function(app) {
  app.directive('bubble', ['$game', function($game) {
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
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          element.addClass('pop');
          $game.bubblePopped();
          element.remove();
        });
      }
    };
  }]);

}(angular.module('abc-bubbles')));