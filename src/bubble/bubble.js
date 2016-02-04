(function(app) {
  app.directive('bubble', [function() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'bubble/bubble.html',
      replace: true,
      link: function($scope, element, attrs) {
        if (attrs.color) {
          element.addClass(attrs.color);
        }
      }
    };
  }]);
}(angular.module('abc-bubbles')));
