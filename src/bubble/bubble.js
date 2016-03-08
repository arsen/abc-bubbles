(function(app) {
  app.directive('bubble', ['gameService', function(gameService) {
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
          gameService.bubblePopped();
          element.remove();
        });
        element.on(animationEndEvent, function() {
          element.remove();
        });
      }
    };
  }]);

}(angular.module('abc-bubbles')));