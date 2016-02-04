(function(app) {
  app.factory('bubbleFactory', ['$window', function($window) {
    var randomBetween = function(a, b) {
      return Math.floor((Math.random() * b) + a);
    };
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    return {
      newBubble: function() {
        var _W = $window.innerWidth;
        var r = randomBetween(_W / 16, _W / 8);
        var x = randomBetween(0 + r, _W - r);
        var letter = letters[randomBetween(0, letters.length)];
        var color = colors[randomBetween(0, colors.length)];
        return '<bubble x="' + x + '"radius="' + r + '" value="' + letter + '" color="' + color + '"></bubble>';
      }
    };
  }]);
}(angular.module('abc-bubbles')));