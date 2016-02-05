(function(app) {
  app.directive('hud', [function() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'hud/hud.html',
      replace: true,
      link: function($scope, element, attrs) {

      }
    };
  }]);
}(angular.module('abc-bubbles')));
