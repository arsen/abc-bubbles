(function(app) {
  app.service('gameService', ['$rootScope', 'gameTopics', function($rootScope, gameTopics) {

    var currentScore = 0;
    var bubblesCount = 0;

    var gameStart = function(topic, timeLimit, difficulty) {
      currentScore = 0;
      bubblesCount = 0;
      var gameData = {
        values: gameTopics[topic],
        timeLimit: timeLimit,
        difficulty: difficulty,
        currentScore: currentScore
      };
      console.log('test')
      $rootScope.$emit('gameStart', gameData);
    };

    var bubblePopped = function(score) {
      currentScore += score || 1;
      bubblesCount++;
      var data = {
        score: score,
        totalScore: currentScore,
        bubblesCount: bubblesCount
      };
      $rootScope.$emit('bubblePopped', data);
    };

    var gameDone = function() {
      var gameDoneData = {
        totalScore: currentScore,
        bubblesCount: bubblesCount
      };

      $rootScope.$emit('gameDone', gameDoneData);
    };

    var gameCancel = function() {
      $rootScope.$emit('gameCancel');
    };

    var publicMethods = {
      start: gameStart,
      done: gameDone,
      cancel: gameCancel,
      bubblePopped: bubblePopped
    };

    return publicMethods;

  }]);
}(angular.module('abc-bubbles')));