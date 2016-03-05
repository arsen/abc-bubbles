(function(app) {
  app.controller('PlayController', ['$scope', '$rootScope', '$game', 'bubbleFactory', '$document', '$compile', '$timeout', function($scope, $rootScope, $game, bubbleFactory, $document, $compile, $timeout) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
      preload: preload,
      create: create,
      update: update
    });

    function preload() {
      game.load.spritesheet('bubbleSheet', 'vendor/img/oie_transparent.png', 213, 284);
      game.stage.backgroundColor = '#ffffff';
      //Initialize game components
      bubbleFactory.initialize();
    }

    function create() {
      createWalls();
      game.physics.startSystem(Phaser.Physics.ARCADE);
      $game.start(topic, timeLimit, difficultyLevel);
      wind();
    }

    function update() {
      cull();
      checkCollision();
    }
    var wallLeft;
    var wallRight;

    function createWalls() {

      //Start game
      wallLeft = game.add.tileSprite((8 * 4), 0, 8, game.height, 'blank');
      wallRight = game.add.tileSprite(game.width - (8 * 4), 0, 8, game.height, 'blank');

      game.physics.enable([wallLeft, wallRight], Phaser.Physics.ARCADE);

      wallLeft.body.immovable = true;
      wallLeft.body.allowGravity = false;

      wallRight.body.immovable = true;
      wallRight.body.allowGravity = false;
    }

    var topic = 'letters';
    var difficultyLevel = 'easy';
    var timeLimit = 60;

    //Ready game listeners
    $rootScope.$on('newBubble', addBubbleToGame);
    $scope.$on('$destroy', function() {
      $game.cancel();
    });

    var bubbleSpriteColorLocations = {
      'orange': 0,
      'green': 6,
      'yellow': 12,
      'red': 18
    };
    var bubbles = [];
    //Game Functions
    function addBubbleToGame(e, data) {
      // var bubbleGroup = game.add.group();
      var bubble = game.add.sprite(data.x, -284, 'bubbleSheet', bubbleSpriteColorLocations[data.color]);
      // bubbleGroup.add(bubble);
      var style = {
        font: "32px Arial",
        align: "center",
      };
      var text = game.add.text(bubble.width / 2, bubble.height / 2, data.value, style);
      bubble.addChild(text);
      text.anchor.set(0.5);
      game.physics.arcade.enable(bubble);
      bubble.enableBody = true;
      bubble.body.gravity.y = 20;
      bubble.inputEnabled = true;
      bubble.events.onInputDown.add(removeBubble, this);
      bubbles.push(bubble);
    }

    function removeBubble(bubble) {
      bubble.destroy();
      bubble.gone = true;
      $game.bubblePopped();
    }

    function cull() {
      for (var i = 0; i < bubbles.length; i++) {
        if (bubbles[i].gone == true) {
          bubbles.splice(i, 1);
          i--;
          console.log('click');
        } else if (typeof bubbles[i].y === "number" && bubbles[i].y >= 800) {
          bubbles[i].destroy();
          bubbles.splice(i, 1);
          i--;
          console.log('cull');
        }
      }
    }

    function randomBetweenWithNeg(a, b) {
      return Math.floor((Math.random() * b * 2) + a);
    };

    function wind() {
      for (var i = 0; i < bubbles.length; i++) {
        var r = randomBetweenWithNeg(-100, 100);
        // console.log("wind: ", r)
        bubbles[i].body.acceleration.x = r;
      }
      $timeout(wind, 1000);
    }

    function checkCollision() {
      for (var i = 0; i < bubbles.length; i++) {
        game.physics.arcade.collide(bubbles[i], wallRight, bounce);
        game.physics.arcade.collide(bubbles[i], wallLeft, bounce);
      }
    }

    function bounce(bubble, wall) {
      // console.log("here: ");
      bubble.body.velocity.x *= -1;
      bubble.body.acceleration.x *= -1;
    }
  }]);
}(angular.module('abc-bubbles')));