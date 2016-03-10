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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsImdhbWUvc3RhdGVzL3RoZWdhbWUuanMiLCJnYW1lL3N0YXRlcy9nYW1lb3Zlci5qcyIsInRpbWVyL3RpbWVyLmpzIiwidGFyZ2V0L3RhcmdldC5qcyIsInNjb3JlL3Njb3JlLmpzIiwicGxheS9wbGF5LmpzIiwiaHVkL2h1ZC5qcyIsImpzL3J1bi5qcyIsImpzL3JvdXRlcy5qcyIsImhvbWUvaG9tZS5qcyIsImdhbWUvZ2FtZVNlcnZpY2UuanMiLCJidWJibGUvYnViYmxlLmpzIiwiYnViYmxlL2J1YmJsZS1mYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKGFwcCkge30oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbi8vIGlvbmljIGJyb3dzZXIgYWRkIGNyb3Nzd2Fsa0AxNi40NS40MjEuMTlcbihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgIH1cbiAgXSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJywgW1xuICAnYWJjLWJ1YmJsZXMuY29uZmlnJyxcbiAgJ2FiYy1idWJibGVzLnRlbXBsYXRlcycsXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2UnXG5dKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuc2VydmljZSgndGhlR2FtZScsIFsnJHJvb3RTY29wZScsICdnYW1lU2VydmljZScsICdidWJibGVGYWN0b3J5JywgJyRkb2N1bWVudCcsICckY29tcGlsZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsIGdhbWVTZXJ2aWNlLCBidWJibGVGYWN0b3J5LCAkZG9jdW1lbnQsICRjb21waWxlLCAkdGltZW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnByZWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmdhbWUubG9hZC5zcHJpdGVzaGVldCgnYnViYmxlU2hlZXQnLCAndmVuZG9yL2ltZy9vaWVfdHJhbnNwYXJlbnQucG5nJywgMjI3LCAyODQpO1xuICAgICAgX3RoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAvL0luaXRpYWxpemUgZ2FtZSBjb21wb25lbnRzXG4gICAgICBidWJibGVGYWN0b3J5LmluaXRpYWxpemUoKTtcbiAgICB9O1xuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBjcmVhdGVXYWxscygpO1xuICAgICAgX3RoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICBnYW1lU2VydmljZS5zdGFydCh0b3BpYywgdGltZUxpbWl0LCBkaWZmaWN1bHR5TGV2ZWwpO1xuICAgICAgd2luZCgpO1xuICAgIH07XG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGN1bGwoKTtcbiAgICAgIGNoZWNrQ29sbGlzaW9uKCk7XG4gICAgfTtcbiAgICB2YXIgd2FsbExlZnQ7XG4gICAgdmFyIHdhbGxSaWdodDtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdhbGxzKCkge1xuXG4gICAgICAvL1N0YXJ0IGdhbWVcbiAgICAgIHdhbGxMZWZ0ID0gX3RoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZSgtOCwgMCwgOCwgX3RoaXMuZ2FtZS5oZWlnaHQsICdibGFuaycpO1xuICAgICAgd2FsbFJpZ2h0ID0gX3RoaXMuZ2FtZS5hZGQudGlsZVNwcml0ZShfdGhpcy5nYW1lLndpZHRoLCAwLCA4LCBfdGhpcy5nYW1lLmhlaWdodCwgJ2JsYW5rJyk7XG5cbiAgICAgIF90aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoW3dhbGxMZWZ0LCB3YWxsUmlnaHRdLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuXG4gICAgICB3YWxsTGVmdC5ib2R5LmltbW92YWJsZSA9IHRydWU7XG4gICAgICB3YWxsTGVmdC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuXG4gICAgICB3YWxsUmlnaHQuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICAgICAgd2FsbFJpZ2h0LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHRvcGljID0gJ2xldHRlcnMnO1xuICAgIHZhciBkaWZmaWN1bHR5TGV2ZWwgPSAnZWFzeSc7XG4gICAgdmFyIHRpbWVMaW1pdCA9IDYwO1xuICAgIC8vUmVhZHkgZ2FtZSBsaXN0ZW5lcnNcbiAgICAkcm9vdFNjb3BlLiRvbignbmV3QnViYmxlJywgYWRkQnViYmxlVG9HYW1lKTtcblxuICAgIHZhciBidWJibGVTcHJpdGVDb2xvckxvY2F0aW9ucyA9IHtcbiAgICAgICdvcmFuZ2UnOiAwLFxuICAgICAgJ2dyZWVuJzogNixcbiAgICAgICd5ZWxsb3cnOiAxMixcbiAgICAgICdyZWQnOiAxOFxuICAgIH07XG4gICAgdmFyIGJ1YmJsZXMgPSBbXTtcbiAgICAvL0dhbWUgRnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gYWRkQnViYmxlVG9HYW1lKGUsIGRhdGEpIHtcbiAgICAgIC8vIHZhciBidWJibGVHcm91cCA9IF90aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICB2YXIgYnViYmxlID0gX3RoaXMuZ2FtZS5hZGQuc3ByaXRlKGRhdGEueCwgLTI4NCwgJ2J1YmJsZVNoZWV0JywgYnViYmxlU3ByaXRlQ29sb3JMb2NhdGlvbnNbZGF0YS5jb2xvcl0pO1xuICAgICAgLy8gYnViYmxlR3JvdXAuYWRkKGJ1YmJsZSk7XG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGZvbnQ6IFwiMzJweCBBcmlhbFwiLFxuICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICAgIH07XG4gICAgICB2YXIgdGV4dCA9IF90aGlzLmdhbWUuYWRkLnRleHQoYnViYmxlLndpZHRoIC8gMiwgYnViYmxlLmhlaWdodCAvIDIsIGRhdGEudmFsdWUsIHN0eWxlKTtcbiAgICAgIGJ1YmJsZS5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgX3RoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUoYnViYmxlKTtcbiAgICAgIGJ1YmJsZS5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIGJ1YmJsZS5ib2R5LmdyYXZpdHkueSA9IDIwO1xuICAgICAgYnViYmxlLmlucHV0RW5hYmxlZCA9IHRydWU7XG4gICAgICBidWJibGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZChwb3BCdWJibGUsIHRoaXMpO1xuICAgICAgYnViYmxlcy5wdXNoKGJ1YmJsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wQnViYmxlKGJ1YmJsZSkge1xuICAgICAgdmFyIGkgPSBidWJibGUuYW5pbWF0aW9ucy5jdXJyZW50RnJhbWUuaW5kZXg7XG4gICAgICBidWJibGUuYW5pbWF0aW9ucy5hZGQoJ3BvcCcsIFtpICsgMSwgaSArIDIsIGkgKyAzLCBpICsgNCwgaSArIDVdKTtcbiAgICAgIGJ1YmJsZS5hbmltYXRpb25zLnBsYXkoJ3BvcCcsIDMwLCBmYWxzZSwgdHJ1ZSlcbiAgICAgIGJ1YmJsZS5nb25lID0gdHJ1ZTtcbiAgICAgIGdhbWVTZXJ2aWNlLmJ1YmJsZVBvcHBlZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGN1bGwoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcImJ1YmJsZXMubGVuZ3RoOiBcIiwgYnViYmxlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWJibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChidWJibGVzW2ldLmdvbmUgPT09IHRydWUpIHtcbiAgICAgICAgICBidWJibGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJ1YmJsZXNbaV0ueSA9PT0gXCJudW1iZXJcIiAmJiBidWJibGVzW2ldLnkgPj0gODAwKSB7XG4gICAgICAgICAgYnViYmxlc1tpXS5kZXN0cm95KCk7XG4gICAgICAgICAgYnViYmxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdWxsJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYW5kb21CZXR3ZWVuV2l0aE5lZyhhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGIgKiAyKSArIGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdpbmQoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSByYW5kb21CZXR3ZWVuV2l0aE5lZygtMTAwLCAxMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndpbmQ6IFwiLCByKVxuICAgICAgICBidWJibGVzW2ldLmJvZHkuYWNjZWxlcmF0aW9uLnggPSByO1xuICAgICAgfVxuICAgICAgJHRpbWVvdXQod2luZCwgMTAwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWJibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJ1YmJsZXMubGVuZ3RoLCBidWJibGVzW2ldKVxuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUoYnViYmxlc1tpXSwgd2FsbFJpZ2h0LCBib3VuY2UpO1xuICAgICAgICBfdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUoYnViYmxlc1tpXSwgd2FsbExlZnQsIGJvdW5jZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYm91bmNlKGJ1YmJsZSwgd2FsbCkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJoZXJlOiBcIiwgYnViYmxlLmJvZHkudmVsb2NpdHkueCwgYnViYmxlLmJvZHkuYWNjZWxlcmF0aW9uLngsIGJ1YmJsZS5ib2R5LnZlbG9jaXR5LnksIGJ1YmJsZS5ib2R5LmFjY2VsZXJhdGlvbi55LCBidWJibGUuYm9keS5wb3NpdGlvbi55LCBidWJibGUuYm9keS5ncmF2aXR5LnkpO1xuICAgICAgYnViYmxlLmJvZHkudmVsb2NpdHkueCAqPSAtMTtcbiAgICAgIGJ1YmJsZS5ib2R5LmFjY2VsZXJhdGlvbi54ICo9IC0xO1xuICAgIH1cbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGdhbWVPdmVyID0gZnVuY3Rpb24oZ2FtZSkge1xuXG4gIH07XG5cbiAgZ2FtZU92ZXIucHJvdG90eXBlID0ge1xuICAgIHByZWxvYWQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgfVxuICB9O1xufSkoKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ3RpbWVyJywgWyckcm9vdFNjb3BlJywgJyRpbnRlcnZhbCcsICdnYW1lU2VydmljZScsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRpbnRlcnZhbCwgZ2FtZVNlcnZpY2UpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHt9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGltZXIvdGltZXIuaHRtbCcsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IDEwO1xuXG4gICAgICAgIHZhciBzdG9wO1xuXG4gICAgICAgIHZhciB0aW1lclN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRG9uJ3Qgc3RhcnQgYSBuZXcgZmlnaHQgaWYgd2UgYXJlIGFscmVhZHkgZmlnaHRpbmdcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3RvcCkpIHJldHVybjtcblxuICAgICAgICAgIHN0b3AgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUudGltZXJWYWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IHNjb3BlLnRpbWVyVmFsdWUgLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2NvcGUudGltZXJTdG9wKCk7XG4gICAgICAgICAgICAgIGdhbWVTZXJ2aWNlLmRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGltZXJTdGFydCgpO1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKCdnYW1lU3RhcnQnLCB0aW1lclN0YXJ0KTtcblxuICAgICAgICBzY29wZS50aW1lclN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3RvcCkpIHtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoc3RvcCk7XG4gICAgICAgICAgICBzdG9wID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS50aW1lclJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUudGltZXJWYWx1ZSA9IDYwXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBpbnRlcnZhbCBpcyBkZXN0cm95ZWQgdG9vXG4gICAgICAgICAgc2NvcGUudGltZXJTdG9wKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCd0YXJnZXQnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0YXJnZXQvdGFyZ2V0Lmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCdzY29yZScsIFsgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Njb3JlL3Njb3JlLmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnNjb3JlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBzY29yZVVwZGF0ZSA9IGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2NvcmVWYWx1ZSA9IGRhdGEuYnViYmxlc0NvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJvb3RTY29wZVwiLCAkcm9vdFNjb3BlKVxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdidWJibGVQb3BwZWQnLCBzY29yZVVwZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29udHJvbGxlcignUGxheUNvbnRyb2xsZXInLCBbJyRzY29wZScsICd0aGVHYW1lJywgJ2dhbWVTZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCB0aGVHYW1lLCBnYW1lU2VydmljZSkge1xuICAgIGNvbnNvbGUubG9nKCdsZXRcXCdzIHBsYXknKTtcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg4MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XG4gICAgY29uc29sZS5sb2codGhlR2FtZSk7XG4gICAgZ2FtZS5zdGF0ZS5hZGQoXCJUaGVHYW1lXCIsIHRoZUdhbWUpO1xuICAgIGdhbWUuc3RhdGUuc3RhcnQoXCJUaGVHYW1lXCIpO1xuICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICBnYW1lU2VydmljZS5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLmRpcmVjdGl2ZSgnaHVkJywgW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZToge30sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdodWQvaHVkLmh0bWwnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnJ1bihbJyRpb25pY1BsYXRmb3JtJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRzdGF0ZSkge1xuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG5cbiAgYXBwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAvLyB0ZW1wbGF0ZVVybDogJ2h0bWwvYXBwLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcC9ob21lJyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2FwcC12aWV3Jzoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdwbGF5Jywge1xuICAgICAgICAgIHVybDogJy9hcHAvcGxheScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwbGF5L3BsYXkuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5Q29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL2hvbWUnKTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgY29uc29sZS5sb2coJ2hvbWUgY29udHJvbGxlcicpO1xuICAgICRzY29wZS50ZXN0ID0gJ0hlbGxvJztcbiAgfV0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5zZXJ2aWNlKCdnYW1lU2VydmljZScsIFsnJHJvb3RTY29wZScsICdnYW1lVG9waWNzJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgZ2FtZVRvcGljcykge1xuXG4gICAgdmFyIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgdmFyIGJ1YmJsZXNDb3VudCA9IDA7XG5cbiAgICB2YXIgZ2FtZVN0YXJ0ID0gZnVuY3Rpb24odG9waWMsIHRpbWVMaW1pdCwgZGlmZmljdWx0eSkge1xuICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgIGJ1YmJsZXNDb3VudCA9IDA7XG4gICAgICB2YXIgZ2FtZURhdGEgPSB7XG4gICAgICAgIHZhbHVlczogZ2FtZVRvcGljc1t0b3BpY10sXG4gICAgICAgIHRpbWVMaW1pdDogdGltZUxpbWl0LFxuICAgICAgICBkaWZmaWN1bHR5OiBkaWZmaWN1bHR5LFxuICAgICAgICBjdXJyZW50U2NvcmU6IGN1cnJlbnRTY29yZVxuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgICRyb290U2NvcGUuJGVtaXQoJ2dhbWVTdGFydCcsIGdhbWVEYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGJ1YmJsZVBvcHBlZCA9IGZ1bmN0aW9uKHNjb3JlKSB7XG4gICAgICBjdXJyZW50U2NvcmUgKz0gc2NvcmUgfHwgMTtcbiAgICAgIGJ1YmJsZXNDb3VudCsrO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgdG90YWxTY29yZTogY3VycmVudFNjb3JlLFxuICAgICAgICBidWJibGVzQ291bnQ6IGJ1YmJsZXNDb3VudFxuICAgICAgfTtcbiAgICAgICRyb290U2NvcGUuJGVtaXQoJ2J1YmJsZVBvcHBlZCcsIGRhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgZ2FtZURvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBnYW1lRG9uZURhdGEgPSB7XG4gICAgICAgIHRvdGFsU2NvcmU6IGN1cnJlbnRTY29yZSxcbiAgICAgICAgYnViYmxlc0NvdW50OiBidWJibGVzQ291bnRcbiAgICAgIH07XG5cbiAgICAgICRyb290U2NvcGUuJGVtaXQoJ2dhbWVEb25lJywgZ2FtZURvbmVEYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGdhbWVDYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICRyb290U2NvcGUuJGVtaXQoJ2dhbWVDYW5jZWwnKTtcbiAgICB9O1xuXG4gICAgdmFyIHB1YmxpY01ldGhvZHMgPSB7XG4gICAgICBzdGFydDogZ2FtZVN0YXJ0LFxuICAgICAgZG9uZTogZ2FtZURvbmUsXG4gICAgICBjYW5jZWw6IGdhbWVDYW5jZWwsXG4gICAgICBidWJibGVQb3BwZWQ6IGJ1YmJsZVBvcHBlZFxuICAgIH07XG5cbiAgICByZXR1cm4gcHVibGljTWV0aG9kcztcblxuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7IiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuZGlyZWN0aXZlKCdidWJibGUnLCBbJ2dhbWVTZXJ2aWNlJywgZnVuY3Rpb24oZ2FtZVNlcnZpY2UpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHtcbiAgICAgICAgeDogJ0AnLFxuICAgICAgICB2YWx1ZTogJ0AnLFxuICAgICAgICByYWRpdXM6ICdAJyxcbiAgICAgICAgY29sb3I6ICdAJ1xuICAgICAgfSxcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICdidWJibGUvYnViYmxlLmh0bWwnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdwb3AnKTtcbiAgICAgICAgICBnYW1lU2VydmljZS5idWJibGVQb3BwZWQoKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudC5vbihhbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7IiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuZmFjdG9yeSgnYnViYmxlRmFjdG9yeScsIFsnJHdpbmRvdycsICdnYW1lVG9waWNzJywgJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkd2luZG93LCBnYW1lVG9waWNzLCAkcm9vdFNjb3BlLCAkdGltZW91dCkge1xuICAgIHZhciByYW5kb21CZXR3ZWVuID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBiKSArIGEpO1xuICAgIH07XG4gICAgdmFyIGNvbG9ycyA9IFsnb3JhbmdlJywgJ2dyZWVuJywgJ3llbGxvdycsICdyZWQnXTtcbiAgICB2YXIgdG9waWMgPSAnJztcbiAgICB2YXIgYnViYmxlU3RyZWFtVGltZXI7XG4gICAgdmFyIF9XID0gJHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHZhciB2YWx1ZXM7XG4gICAgdmFyIG5ld0J1YmJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHIgPSAxODUgLy9yYW5kb21CZXR3ZWVuKF9XIC8gMzIsIF9XIC8gMTYpO1xuICAgICAgdmFyIHggPSByYW5kb21CZXR3ZWVuKDAsIDgwMCAtIHIgKiAyKTtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tyYW5kb21CZXR3ZWVuKDAsIHZhbHVlcy5sZW5ndGgpXTtcbiAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21CZXR3ZWVuKDAsIGNvbG9ycy5sZW5ndGgpXTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICAgIC8vIGh0bWw6ICc8YnViYmxlIHg9XCInICsgeCArICdcIiByYWRpdXM9XCInICsgciArICdcIiB2YWx1ZT1cIicgKyB2YWx1ZSArICdcIiBjb2xvcj1cIicgKyBjb2xvciArICdcIiBjbGFzcz1cImRyb3BcIj48L2J1YmJsZT4nXG4gICAgICB9O1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnbmV3QnViYmxlJywgZGF0YSk7XG4gICAgfTtcbiAgICB2YXIgYnViYmxlU3RyZWFtID0gZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgbmV3QnViYmxlKCk7XG4gICAgICB2YXIgdGltZSA9IHJhbmRvbUJldHdlZW4oMjAwLCA1MDApO1xuICAgICAgYnViYmxlU3RyZWFtVGltZXIgPSAkdGltZW91dChidWJibGVTdHJlYW0sIHRpbWUpO1xuICAgIH07XG4gICAgdmFyIGNhbmNlbFRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAkdGltZW91dC5jYW5jZWwoYnViYmxlU3RyZWFtVGltZXIpO1xuICAgIH07XG4gICAgJHJvb3RTY29wZS4kb24oJ2dhbWVDYW5jZWwnLCBjYW5jZWxUaW1lcik7XG4gICAgJHJvb3RTY29wZS4kb24oJ2dhbWVEb25lJywgY2FuY2VsVGltZXIpO1xuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9mZiA9ICRyb290U2NvcGUuJG9uKCdnYW1lU3RhcnQnLCBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgICAgdmFsdWVzID0gZGF0YS52YWx1ZXM7XG4gICAgICAgICAgYnViYmxlU3RyZWFtKCk7XG4gICAgICAgICAgb2ZmKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
