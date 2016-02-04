(function(app) {
  app.controller('PlayController', ['$scope', '$rootScope', '$game', 'bubbleFactory', '$document', '$compile', function($scope, $rootScope, $game, bubbleFactory, $document, $compile) {

    var topic = 'letters';
    var difficultyLevel = 'easy';
    var timeLimit = 60;
    var elementGameContainer = angular.element($document[0].getElementById('game'));

    //Initialize game components
    bubbleFactory.initialize();

    //Ready game listeners
    $rootScope.$on('newBubble', addBubbleToDOM);

    //Game Functions
    function addBubbleToDOM(e, data) {
      elementGameContainer.append($compile(data.html)($scope));
    }

    //Start game
    $game.start(topic, timeLimit, difficultyLevel);
  }]);
}(angular.module('abc-bubbles')));