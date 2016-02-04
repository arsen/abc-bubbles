(function(app) {
  app.factory('bubbleFactory', ['$window', 'gameTopics', '$rootScope', '$timeout', function($window, gameTopics, $rootScope, $timeout) {
    var randomBetween = function(a, b) {
      return Math.floor((Math.random() * b) + a);
    };
    var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    var topic = '';
    var bubbleStreamCancel;
    var _W = $window.innerWidth;
    var values;
    var newBubble = function() {
      var r = randomBetween(_W / 32, _W / 16);
      var x = randomBetween(0, _W - r * 2);
      var value = values[randomBetween(0, values.length)];
      var color = colors[randomBetween(0, colors.length)];
      var data = {
        html: '<bubble x="' + x + '" radius="' + r + '" value="' + value + '" color="' + color + '"></bubble>'
      };
      $rootScope.$emit('newBubble', data);
    };
    var bubbleStream = function(e, data) {
      newBubble();
      var time = randomBetween(500, 2000);
      bubbleStreamCancel = $timeout(bubbleStream, time);
    };
    return {
      initialize: function() {
        $rootScope.$on('gameStart', function(e, data) {
          values = data.values;
          bubbleStream();
        });
      }
    };
  }]);
}(angular.module('abc-bubbles')));