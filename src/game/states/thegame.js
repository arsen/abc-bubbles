(function(app) {
  app.service('theGame', ['$rootScope', 'gameService', 'bubbleFactory', '$document', '$compile', '$timeout', function($rootScope, gameService, bubbleFactory, $document, $compile, $timeout) {
    var _this = this;

    this.preload = function() {
      _this.game.load.spritesheet('bubbleSheet', 'vendor/img/oie_transparent.png', 227, 284);
      _this.game.stage.backgroundColor = '#ffffff';
      //Initialize game components
      bubbleFactory.initialize();
    };
    this.create = function() {
      createWalls();
      _this.game.physics.startSystem(Phaser.Physics.ARCADE);
      gameService.start(topic, timeLimit, difficultyLevel);
      wind();
    };
    this.update = function() {
      cull();
      checkCollision();
    };
    var wallLeft;
    var wallRight;

    function createWalls() {

      //Start game
      wallLeft = _this.game.add.tileSprite(-8, 0, 8, _this.game.height, 'blank');
      wallRight = _this.game.add.tileSprite(_this.game.width, 0, 8, _this.game.height, 'blank');

      _this.game.physics.enable([wallLeft, wallRight], Phaser.Physics.ARCADE);

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

    var bubbleSpriteColorLocations = {
      'orange': 0,
      'green': 6,
      'yellow': 12,
      'red': 18
    };
    var bubbles = [];
    //Game Functions
    function addBubbleToGame(e, data) {
      // var bubbleGroup = _this.game.add.group();
      var bubble = _this.game.add.sprite(data.x, -284, 'bubbleSheet', bubbleSpriteColorLocations[data.color]);
      // bubbleGroup.add(bubble);
      var style = {
        font: "32px Arial",
        align: "center",
      };
      var text = _this.game.add.text(bubble.width / 2, bubble.height / 2, data.value, style);
      bubble.addChild(text);
      text.anchor.set(0.5);
      _this.game.physics.arcade.enable(bubble);
      bubble.enableBody = true;
      bubble.body.gravity.y = 20;
      bubble.inputEnabled = true;
      bubble.events.onInputDown.add(popBubble, this);
      bubbles.push(bubble);
    }

    function popBubble(bubble) {
      var i = bubble.animations.currentFrame.index;
      bubble.animations.add('pop', [i + 1, i + 2, i + 3, i + 4, i + 5]);
      bubble.animations.play('pop', 30, false, true)
      bubble.gone = true;
      gameService.bubblePopped();
    }

    function cull() {
      // console.log("bubbles.length: ", bubbles.length);
      for (var i = 0; i < bubbles.length; i++) {
        if (bubbles[i].gone === true) {
          bubbles.splice(i, 1);
          i--;
          // console.log('click');
        } else if (typeof bubbles[i].y === "number" && bubbles[i].y >= 800) {
          bubbles[i].destroy();
          bubbles.splice(i, 1);
          i--;
          // console.log('cull');
        }
      }
    }

    function randomBetweenWithNeg(a, b) {
      return Math.floor((Math.random() * b * 2) + a);
    }

    function wind() {
      for (var i = 0; i < bubbles.length; i++) {
        var r = randomBetweenWithNeg(-100, 100);
        // console.log("wind: ", r)
        bubbles[i].body.acceleration.x = r;
      }
      $timeout(wind, 10000);
    }

    function checkCollision() {
      for (var i = 0; i < bubbles.length; i++) {
        // console.log(bubbles.length, bubbles[i])
        _this.game.physics.arcade.collide(bubbles[i], wallRight, bounce);
        _this.game.physics.arcade.collide(bubbles[i], wallLeft, bounce);
      }
    }

    function bounce(bubble, wall) {
      // console.log("here: ", bubble.body.velocity.x, bubble.body.acceleration.x, bubble.body.velocity.y, bubble.body.acceleration.y, bubble.body.position.y, bubble.body.gravity.y);
      bubble.body.velocity.x *= -1;
      bubble.body.acceleration.x *= -1;
    }
  }]);
}(angular.module('abc-bubbles')));