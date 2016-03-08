// (function(app) {}(angular.module('abc-bubbles')));
// ionic browser add crosswalk@16.45.421.19
(function(app) {

  app.controller('AppController', ['$scope', '$state',
    function($scope, $state) {

    }
  ]);

}(angular.module('abc-bubbles', [
  'abc-bubbles.config',
  'abc-bubbles.templates',
  'ionic',
  'ngCordova.plugins.device'
])));

(function(app) {
  app.service('theGame', ['$rootScope', 'gameService', 'bubbleFactory', '$document', '$compile', '$timeout', function($rootScope, gameService, bubbleFactory, $document, $compile, $timeout) {
    var _this = this;

    this.preload = function() {
      _this.game.load.spritesheet('bubbleSheet', 'vendor/img/oie_transparent.png', 213, 284);
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
    };

    var topic = 'letters';
    var difficultyLevel = 'easy';
    var timeLimit = 60;
    //Ready game listeners
    console.log(addBubbleToGame)
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
      bubble.events.onInputDown.add(removeBubble, this);
      bubbles.push(bubble);
    };
    console.log(addBubbleToGame)
    var removeBubble = function removeBubble(bubble) {
      bubble.destroy();
      bubble.gone = true;
      gameService.bubblePopped();
    };

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
    };

    function randomBetweenWithNeg(a, b) {
      return Math.floor((Math.random() * b * 2) + a);
    };

    var wind = function wind() {
      for (var i = 0; i < bubbles.length; i++) {
        var r = randomBetweenWithNeg(-100, 100);
        // console.log("wind: ", r)
        bubbles[i].body.acceleration.x = r;
      }
      $timeout(wind, 10000);
    };

    function checkCollision() {
      for (var i = 0; i < bubbles.length; i++) {
        // console.log(bubbles.length, bubbles[i])
        _this.game.physics.arcade.collide(bubbles[i], wallRight, bounce);
        _this.game.physics.arcade.collide(bubbles[i], wallLeft, bounce);
      }
    };

    function bounce(bubble, wall) {
      // console.log("here: ", bubble.body.velocity.x, bubble.body.acceleration.x, bubble.body.velocity.y, bubble.body.acceleration.y, bubble.body.position.y, bubble.body.gravity.y);
      bubble.body.velocity.x *= -1;
      bubble.body.acceleration.x *= -1;
    };
  }]);
}(angular.module('abc-bubbles')));
(function() {
  var gameOver = function(game) {

  };

  gameOver.prototype = {
    preload: function() {

    },
    create: function() {

    }
  };
})();
(function(app) {
  app.directive('timer', ['$rootScope', '$interval', 'gameService', function($rootScope, $interval, gameService) {
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'timer/timer.html',
      replace: true,
      link: function(scope, element, attrs) {

        scope.timerValue = 10;

        var stop;

        var timerStart = function() {
          // Don't start a new fight if we are already fighting
          if (angular.isDefined(stop)) return;

          stop = $interval(function() {
            if (scope.timerValue > 0) {
              scope.timerValue = scope.timerValue - 1;
            } else {
              scope.timerStop();
              gameService.done();
            }
          }, 1000);
        };
        timerStart();

        $rootScope.$on('gameStart', timerStart);

        scope.timerStop = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        scope.timerReset = function() {
          scope.timerValue = 60
        };

        scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          scope.timerStop();
        });

      }
    };
  }]);
}(angular.module('abc-bubbles')));
(function(app) {
    app.directive('target', [function() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'target/target.html',
            replace: true,
            link: function($scope, element, attrs) {

            }
        };
    }]);
}(angular.module('abc-bubbles')));

(function(app) {
    app.directive('score', [ '$rootScope', function($rootScope) {

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'score/score.html',
            replace: true,
            link: function(scope, element, attrs) {
                scope.scoreValue = 0;
                var scoreUpdate = function(e, data) {
                    scope.scoreValue = data.bubblesCount;
                }
                console.log("rootScope", $rootScope)
                $rootScope.$on('bubblePopped', scoreUpdate);
            }
        };
    }]);
}(angular.module('abc-bubbles')));

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

(function(app) {
  app.run(['$ionicPlatform', '$state',
    function($ionicPlatform, $state) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }
  ]);
}(angular.module('abc-bubbles')));

(function(app) {

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          // templateUrl: 'html/app.html',
          controller: 'AppController'
        })
        .state('home', {
          url: '/app/home',
          views: {
            'app-view': {
              templateUrl: 'home/home.html',
              controller: 'HomeController'
            }
          }
        })
        .state('play', {
          url: '/app/play',
          views: {
            'app-view': {
              templateUrl: 'play/play.html',
              controller: 'PlayController'
            }
          }
        });

      $urlRouterProvider.otherwise('/app/home');
    }
  ]);
}(angular.module('abc-bubbles')));

(function(app) {

  app.controller('HomeController', ['$scope', function($scope) {
    console.log('home controller');
    $scope.test = 'Hello';
  }]);

}(angular.module('abc-bubbles')));

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
(function(app) {
  app.factory('bubbleFactory', ['$window', 'gameTopics', '$rootScope', '$timeout', function($window, gameTopics, $rootScope, $timeout) {
    var randomBetween = function(a, b) {
      return Math.floor((Math.random() * b) + a);
    };
    var colors = ['orange', 'green', 'yellow', 'red'];
    var topic = '';
    var bubbleStreamTimer;
    var _W = $window.innerWidth;
    var values;
    var newBubble = function() {
      var r = 185 //randomBetween(_W / 32, _W / 16);
      var x = randomBetween(0, 800 - r * 2);
      var value = values[randomBetween(0, values.length)];
      var color = colors[randomBetween(0, colors.length)];
      var data = {
        x: x,
        value: value,
        color: color
          // html: '<bubble x="' + x + '" radius="' + r + '" value="' + value + '" color="' + color + '" class="drop"></bubble>'
      };
      $rootScope.$emit('newBubble', data);
    };
    var bubbleStream = function(e, data) {
      newBubble();
      var time = randomBetween(200, 500);
      bubbleStreamTimer = $timeout(bubbleStream, time);
    };
    var cancelTimer = function() {
      $timeout.cancel(bubbleStreamTimer);
    };
    $rootScope.$on('gameCancel', cancelTimer);
    $rootScope.$on('gameDone', cancelTimer);
    return {
      initialize: function() {
        var off = $rootScope.$on('gameStart', function(e, data) {
          values = data.values;
          bubbleStream();
          off();
        });
      }
    };
  }]);
}(angular.module('abc-bubbles')));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsImdhbWUvc3RhdGVzL3RoZWdhbWUuanMiLCJnYW1lL3N0YXRlcy9nYW1lb3Zlci5qcyIsInRpbWVyL3RpbWVyLmpzIiwidGFyZ2V0L3RhcmdldC5qcyIsInNjb3JlL3Njb3JlLmpzIiwicGxheS9wbGF5LmpzIiwiaHVkL2h1ZC5qcyIsImpzL3J1bi5qcyIsImpzL3JvdXRlcy5qcyIsImhvbWUvaG9tZS5qcyIsImJ1YmJsZS9idWJibGUuanMiLCJidWJibGUvYnViYmxlLWZhY3RvcnkuanMiLCJnYW1lL2dhbWVTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIChmdW5jdGlvbihhcHApIHt9KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4vLyBpb25pYyBicm93c2VyIGFkZCBjcm9zc3dhbGtAMTYuNDUuNDIxLjE5XG4oZnVuY3Rpb24oYXBwKSB7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGUnLFxuICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlKSB7XG5cbiAgICB9XG4gIF0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycsIFtcbiAgJ2FiYy1idWJibGVzLmNvbmZpZycsXG4gICdhYmMtYnViYmxlcy50ZW1wbGF0ZXMnLFxuICAnaW9uaWMnLFxuICAnbmdDb3Jkb3ZhLnBsdWdpbnMuZGV2aWNlJ1xuXSkpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnNlcnZpY2UoJ3RoZUdhbWUnLCBbJyRyb290U2NvcGUnLCAnZ2FtZVNlcnZpY2UnLCAnYnViYmxlRmFjdG9yeScsICckZG9jdW1lbnQnLCAnJGNvbXBpbGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCBnYW1lU2VydmljZSwgYnViYmxlRmFjdG9yeSwgJGRvY3VtZW50LCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5wcmVsb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5nYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2J1YmJsZVNoZWV0JywgJ3ZlbmRvci9pbWcvb2llX3RyYW5zcGFyZW50LnBuZycsIDIxMywgMjg0KTtcbiAgICAgIF90aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmZmZmYnO1xuICAgICAgLy9Jbml0aWFsaXplIGdhbWUgY29tcG9uZW50c1xuICAgICAgYnViYmxlRmFjdG9yeS5pbml0aWFsaXplKCk7XG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY3JlYXRlV2FsbHMoKTtcbiAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgICAgZ2FtZVNlcnZpY2Uuc3RhcnQodG9waWMsIHRpbWVMaW1pdCwgZGlmZmljdWx0eUxldmVsKTtcbiAgICAgIHdpbmQoKTtcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjdWxsKCk7XG4gICAgICBjaGVja0NvbGxpc2lvbigpO1xuICAgIH07XG4gICAgdmFyIHdhbGxMZWZ0O1xuICAgIHZhciB3YWxsUmlnaHQ7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXYWxscygpIHtcblxuICAgICAgLy9TdGFydCBnYW1lXG4gICAgICB3YWxsTGVmdCA9IF90aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoLTgsIDAsIDgsIF90aGlzLmdhbWUuaGVpZ2h0LCAnYmxhbmsnKTtcbiAgICAgIHdhbGxSaWdodCA9IF90aGlzLmdhbWUuYWRkLnRpbGVTcHJpdGUoX3RoaXMuZ2FtZS53aWR0aCwgMCwgOCwgX3RoaXMuZ2FtZS5oZWlnaHQsICdibGFuaycpO1xuXG4gICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKFt3YWxsTGVmdCwgd2FsbFJpZ2h0XSwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgICAgd2FsbExlZnQuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICAgICAgd2FsbExlZnQuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcblxuICAgICAgd2FsbFJpZ2h0LmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbiAgICAgIHdhbGxSaWdodC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgdG9waWMgPSAnbGV0dGVycyc7XG4gICAgdmFyIGRpZmZpY3VsdHlMZXZlbCA9ICdlYXN5JztcbiAgICB2YXIgdGltZUxpbWl0ID0gNjA7XG4gICAgLy9SZWFkeSBnYW1lIGxpc3RlbmVyc1xuICAgIGNvbnNvbGUubG9nKGFkZEJ1YmJsZVRvR2FtZSlcbiAgICAkcm9vdFNjb3BlLiRvbignbmV3QnViYmxlJywgYWRkQnViYmxlVG9HYW1lKTtcblxuICAgIHZhciBidWJibGVTcHJpdGVDb2xvckxvY2F0aW9ucyA9IHtcbiAgICAgICdvcmFuZ2UnOiAwLFxuICAgICAgJ2dyZWVuJzogNixcbiAgICAgICd5ZWxsb3cnOiAxMixcbiAgICAgICdyZWQnOiAxOFxuICAgIH07XG4gICAgdmFyIGJ1YmJsZXMgPSBbXTtcbiAgICAvL0dhbWUgRnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gYWRkQnViYmxlVG9HYW1lKGUsIGRhdGEpIHtcbiAgICAgIC8vIHZhciBidWJibGVHcm91cCA9IF90aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICB2YXIgYnViYmxlID0gX3RoaXMuZ2FtZS5hZGQuc3ByaXRlKGRhdGEueCwgLTI4NCwgJ2J1YmJsZVNoZWV0JywgYnViYmxlU3ByaXRlQ29sb3JMb2NhdGlvbnNbZGF0YS5jb2xvcl0pO1xuICAgICAgLy8gYnViYmxlR3JvdXAuYWRkKGJ1YmJsZSk7XG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGZvbnQ6IFwiMzJweCBBcmlhbFwiLFxuICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgIH07XG4gICAgICB2YXIgdGV4dCA9IF90aGlzLmdhbWUuYWRkLnRleHQoYnViYmxlLndpZHRoIC8gMiwgYnViYmxlLmhlaWdodCAvIDIsIGRhdGEudmFsdWUsIHN0eWxlKTtcbiAgICAgIGJ1YmJsZS5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgX3RoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUoYnViYmxlKTtcbiAgICAgIGJ1YmJsZS5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIGJ1YmJsZS5ib2R5LmdyYXZpdHkueSA9IDIwO1xuICAgICAgYnViYmxlLmlucHV0RW5hYmxlZCA9IHRydWU7XG4gICAgICBidWJibGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZChyZW1vdmVCdWJibGUsIHRoaXMpO1xuICAgICAgYnViYmxlcy5wdXNoKGJ1YmJsZSk7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhhZGRCdWJibGVUb0dhbWUpXG4gICAgdmFyIHJlbW92ZUJ1YmJsZSA9IGZ1bmN0aW9uIHJlbW92ZUJ1YmJsZShidWJibGUpIHtcbiAgICAgIGJ1YmJsZS5kZXN0cm95KCk7XG4gICAgICBidWJibGUuZ29uZSA9IHRydWU7XG4gICAgICBnYW1lU2VydmljZS5idWJibGVQb3BwZWQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY3VsbCgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYnViYmxlcy5sZW5ndGg6IFwiLCBidWJibGVzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJ1YmJsZXNbaV0uZ29uZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGJ1YmJsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYnViYmxlc1tpXS55ID09PSBcIm51bWJlclwiICYmIGJ1YmJsZXNbaV0ueSA+PSA4MDApIHtcbiAgICAgICAgICBidWJibGVzW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgICBidWJibGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1bGwnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByYW5kb21CZXR3ZWVuV2l0aE5lZyhhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGIgKiAyKSArIGEpO1xuICAgIH07XG5cbiAgICB2YXIgd2luZCA9IGZ1bmN0aW9uIHdpbmQoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSByYW5kb21CZXR3ZWVuV2l0aE5lZygtMTAwLCAxMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndpbmQ6IFwiLCByKVxuICAgICAgICBidWJibGVzW2ldLmJvZHkuYWNjZWxlcmF0aW9uLnggPSByO1xuICAgICAgfVxuICAgICAgJHRpbWVvdXQod2luZCwgMTAwMDApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnViYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhidWJibGVzLmxlbmd0aCwgYnViYmxlc1tpXSlcbiAgICAgICAgX3RoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGJ1YmJsZXNbaV0sIHdhbGxSaWdodCwgYm91bmNlKTtcbiAgICAgICAgX3RoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGJ1YmJsZXNbaV0sIHdhbGxMZWZ0LCBib3VuY2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBib3VuY2UoYnViYmxlLCB3YWxsKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcImhlcmU6IFwiLCBidWJibGUuYm9keS52ZWxvY2l0eS54LCBidWJibGUuYm9keS5hY2NlbGVyYXRpb24ueCwgYnViYmxlLmJvZHkudmVsb2NpdHkueSwgYnViYmxlLmJvZHkuYWNjZWxlcmF0aW9uLnksIGJ1YmJsZS5ib2R5LnBvc2l0aW9uLnksIGJ1YmJsZS5ib2R5LmdyYXZpdHkueSk7XG4gICAgICBidWJibGUuYm9keS52ZWxvY2l0eS54ICo9IC0xO1xuICAgICAgYnViYmxlLmJvZHkuYWNjZWxlcmF0aW9uLnggKj0gLTE7XG4gICAgfTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGdhbWVPdmVyID0gZnVuY3Rpb24oZ2FtZSkge1xuXG4gIH07XG5cbiAgZ2FtZU92ZXIucHJvdG90eXBlID0ge1xuICAgIHByZWxvYWQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgfVxuICB9O1xufSkoKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ3RpbWVyJywgWyckcm9vdFNjb3BlJywgJyRpbnRlcnZhbCcsICdnYW1lU2VydmljZScsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRpbnRlcnZhbCwgZ2FtZVNlcnZpY2UpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHt9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGltZXIvdGltZXIuaHRtbCcsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IDEwO1xuXG4gICAgICAgIHZhciBzdG9wO1xuXG4gICAgICAgIHZhciB0aW1lclN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRG9uJ3Qgc3RhcnQgYSBuZXcgZmlnaHQgaWYgd2UgYXJlIGFscmVhZHkgZmlnaHRpbmdcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3RvcCkpIHJldHVybjtcblxuICAgICAgICAgIHN0b3AgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUudGltZXJWYWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IHNjb3BlLnRpbWVyVmFsdWUgLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2NvcGUudGltZXJTdG9wKCk7XG4gICAgICAgICAgICAgIGdhbWVTZXJ2aWNlLmRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGltZXJTdGFydCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdnYW1lU3RhcnQnLCB0aW1lclN0YXJ0KTtcblxuICAgICAgICBzY29wZS50aW1lclN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3RvcCkpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoc3RvcCk7XG4gICAgICAgICAgICBzdG9wID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS50aW1lclJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IDYwXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBpbnRlcnZhbCBpcyBkZXN0cm95ZWQgdG9vXG4gICAgICAgICAgc2NvcGUudGltZXJTdG9wKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCd0YXJnZXQnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0YXJnZXQvdGFyZ2V0Lmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCdzY29yZScsIFsgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Njb3JlL3Njb3JlLmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnNjb3JlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBzY29yZVVwZGF0ZSA9IGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2NvcmVWYWx1ZSA9IGRhdGEuYnViYmxlc0NvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvb3RTY29wZVwiLCAkcm9vdFNjb3BlKVxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdidWJibGVQb3BwZWQnLCBzY29yZVVwZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29udHJvbGxlcignUGxheUNvbnRyb2xsZXInLCBbJyRzY29wZScsICd0aGVHYW1lJywgJ2dhbWVTZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCB0aGVHYW1lLCBnYW1lU2VydmljZSkge1xuICAgIGNvbnNvbGUubG9nKCdsZXRcXCdzIHBsYXknKTtcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg4MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XG4gICAgY29uc29sZS5sb2codGhlR2FtZSk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoXCJUaGVHYW1lXCIsIHRoZUdhbWUpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoXCJUaGVHYW1lXCIpO1xuICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICBnYW1lU2VydmljZS5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLmRpcmVjdGl2ZSgnaHVkJywgW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZToge30sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdodWQvaHVkLmh0bWwnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnJ1bihbJyRpb25pY1BsYXRmb3JtJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRzdGF0ZSkge1xuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG5cbiAgYXBwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAvLyB0ZW1wbGF0ZVVybDogJ2h0bWwvYXBwLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcC9ob21lJyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2FwcC12aWV3Jzoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdwbGF5Jywge1xuICAgICAgICAgIHVybDogJy9hcHAvcGxheScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwbGF5L3BsYXkuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5Q29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL2hvbWUnKTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgY29uc29sZS5sb2coJ2hvbWUgY29udHJvbGxlcicpO1xuICAgICRzY29wZS50ZXN0ID0gJ0hlbGxvJztcbiAgfV0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ2J1YmJsZScsIFsnZ2FtZVNlcnZpY2UnLCBmdW5jdGlvbihnYW1lU2VydmljZSkge1xuICAgIHZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJztcblxuICAgIHJldHVybiB7XG4gICAgICBzY29wZToge1xuICAgICAgICB4OiAnQCcsXG4gICAgICAgIHZhbHVlOiAnQCcsXG4gICAgICAgIHJhZGl1czogJ0AnLFxuICAgICAgICBjb2xvcjogJ0AnXG4gICAgICB9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2J1YmJsZS9idWJibGUuaHRtbCcsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3BvcCcpO1xuICAgICAgICAgIGdhbWVTZXJ2aWNlLmJ1YmJsZVBvcHBlZCgpO1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50Lm9uKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5mYWN0b3J5KCdidWJibGVGYWN0b3J5JywgWyckd2luZG93JywgJ2dhbWVUb3BpY3MnLCAnJHJvb3RTY29wZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCR3aW5kb3csIGdhbWVUb3BpY3MsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XG4gICAgdmFyIHJhbmRvbUJldHdlZW4gPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGIpICsgYSk7XG4gICAgfTtcbiAgICB2YXIgY29sb3JzID0gWydvcmFuZ2UnLCAnZ3JlZW4nLCAneWVsbG93JywgJ3JlZCddO1xuICAgIHZhciB0b3BpYyA9ICcnO1xuICAgIHZhciBidWJibGVTdHJlYW1UaW1lcjtcbiAgICB2YXIgX1cgPSAkd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHZhbHVlcztcbiAgICB2YXIgbmV3QnViYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgciA9IDE4NSAvL3JhbmRvbUJldHdlZW4oX1cgLyAzMiwgX1cgLyAxNik7XG4gICAgICB2YXIgeCA9IHJhbmRvbUJldHdlZW4oMCwgODAwIC0gciAqIDIpO1xuICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW3JhbmRvbUJldHdlZW4oMCwgdmFsdWVzLmxlbmd0aCldO1xuICAgICAgdmFyIGNvbG9yID0gY29sb3JzW3JhbmRvbUJldHdlZW4oMCwgY29sb3JzLmxlbmd0aCldO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgY29sb3I6IGNvbG9yXG4gICAgICAgICAgLy8gaHRtbDogJzxidWJibGUgeD1cIicgKyB4ICsgJ1wiIHJhZGl1cz1cIicgKyByICsgJ1wiIHZhbHVlPVwiJyArIHZhbHVlICsgJ1wiIGNvbG9yPVwiJyArIGNvbG9yICsgJ1wiIGNsYXNzPVwiZHJvcFwiPjwvYnViYmxlPidcbiAgICAgIH07XG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCduZXdCdWJibGUnLCBkYXRhKTtcbiAgICB9O1xuICAgIHZhciBidWJibGVTdHJlYW0gPSBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICBuZXdCdWJibGUoKTtcbiAgICAgIHZhciB0aW1lID0gcmFuZG9tQmV0d2VlbigyMDAsIDUwMCk7XG4gICAgICBidWJibGVTdHJlYW1UaW1lciA9ICR0aW1lb3V0KGJ1YmJsZVN0cmVhbSwgdGltZSk7XG4gICAgfTtcbiAgICB2YXIgY2FuY2VsVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICR0aW1lb3V0LmNhbmNlbChidWJibGVTdHJlYW1UaW1lcik7XG4gICAgfTtcbiAgICAkcm9vdFNjb3BlLiRvbignZ2FtZUNhbmNlbCcsIGNhbmNlbFRpbWVyKTtcbiAgICAkcm9vdFNjb3BlLiRvbignZ2FtZURvbmUnLCBjYW5jZWxUaW1lcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2ZmID0gJHJvb3RTY29wZS4kb24oJ2dhbWVTdGFydCcsIGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICB2YWx1ZXMgPSBkYXRhLnZhbHVlcztcbiAgICAgICAgICBidWJibGVTdHJlYW0oKTtcbiAgICAgICAgICBvZmYoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnNlcnZpY2UoJ2dhbWVTZXJ2aWNlJywgWyckcm9vdFNjb3BlJywgJ2dhbWVUb3BpY3MnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCBnYW1lVG9waWNzKSB7XG5cbiAgICB2YXIgY3VycmVudFNjb3JlID0gMDtcbiAgICB2YXIgYnViYmxlc0NvdW50ID0gMDtcblxuICAgIHZhciBnYW1lU3RhcnQgPSBmdW5jdGlvbih0b3BpYywgdGltZUxpbWl0LCBkaWZmaWN1bHR5KSB7XG4gICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgYnViYmxlc0NvdW50ID0gMDtcbiAgICAgIHZhciBnYW1lRGF0YSA9IHtcbiAgICAgICAgdmFsdWVzOiBnYW1lVG9waWNzW3RvcGljXSxcbiAgICAgICAgdGltZUxpbWl0OiB0aW1lTGltaXQsXG4gICAgICAgIGRpZmZpY3VsdHk6IGRpZmZpY3VsdHksXG4gICAgICAgIGN1cnJlbnRTY29yZTogY3VycmVudFNjb3JlXG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKVxuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnZ2FtZVN0YXJ0JywgZ2FtZURhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgYnViYmxlUG9wcGVkID0gZnVuY3Rpb24oc2NvcmUpIHtcbiAgICAgIGN1cnJlbnRTY29yZSArPSBzY29yZSB8fCAxO1xuICAgICAgYnViYmxlc0NvdW50Kys7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICB0b3RhbFNjb3JlOiBjdXJyZW50U2NvcmUsXG4gICAgICAgIGJ1YmJsZXNDb3VudDogYnViYmxlc0NvdW50XG4gICAgICB9O1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnYnViYmxlUG9wcGVkJywgZGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBnYW1lRG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGdhbWVEb25lRGF0YSA9IHtcbiAgICAgICAgdG90YWxTY29yZTogY3VycmVudFNjb3JlLFxuICAgICAgICBidWJibGVzQ291bnQ6IGJ1YmJsZXNDb3VudFxuICAgICAgfTtcblxuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnZ2FtZURvbmUnLCBnYW1lRG9uZURhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgZ2FtZUNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnZ2FtZUNhbmNlbCcpO1xuICAgIH07XG5cbiAgICB2YXIgcHVibGljTWV0aG9kcyA9IHtcbiAgICAgIHN0YXJ0OiBnYW1lU3RhcnQsXG4gICAgICBkb25lOiBnYW1lRG9uZSxcbiAgICAgIGNhbmNlbDogZ2FtZUNhbmNlbCxcbiAgICAgIGJ1YmJsZVBvcHBlZDogYnViYmxlUG9wcGVkXG4gICAgfTtcblxuICAgIHJldHVybiBwdWJsaWNNZXRob2RzO1xuXG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
