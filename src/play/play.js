(function(app) {
  app.controller('PlayController', ['$scope', 'theGame', 'gameService', function($scope, theGame, gameService) {
    console.log('let\'s play');
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    console.log(theGame);
    game.state.add("TheGame", theGame);
    game.state.start("TheGame");
    $scope.$on('$destroy', function() {
      gameService.cancel();
    });
  }]);
}(angular.module('abc-bubbles')));