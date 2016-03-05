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
    app.directive('timer', ['$rootScope', '$interval', '$game', function($rootScope, $interval, $game) {
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
                            $game.done();
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
(function(app) {

  app.controller('HomeController', ['$scope', function($scope) {
    console.log('home controller');
    $scope.test = 'Hello';
  }]);

}(angular.module('abc-bubbles')));

(function(app) {
  app.service('$game', ['$rootScope', 'gameTopics', function($rootScope, gameTopics) {

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
  app.directive('bubble', ['$game', function($game) {
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
          $game.bubblePopped();
          element.remove();
        });
        element.on(animationEndEvent, function() {
          element.remove();
        })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInRpbWVyL3RpbWVyLmpzIiwidGFyZ2V0L3RhcmdldC5qcyIsInNjb3JlL3Njb3JlLmpzIiwianMvcnVuLmpzIiwianMvcm91dGVzLmpzIiwicGxheS9wbGF5LmpzIiwiaG9tZS9ob21lLmpzIiwiZ2FtZS9nYW1lLmpzIiwiaHVkL2h1ZC5qcyIsImJ1YmJsZS9idWJibGUuanMiLCJidWJibGUvYnViYmxlLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKGFwcCkge30oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbi8vIGlvbmljIGJyb3dzZXIgYWRkIGNyb3Nzd2Fsa0AxNi40NS40MjEuMTlcbihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgIH1cbiAgXSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJywgW1xuICAnYWJjLWJ1YmJsZXMuY29uZmlnJyxcbiAgJ2FiYy1idWJibGVzLnRlbXBsYXRlcycsXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2UnXG5dKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICAgIGFwcC5kaXJlY3RpdmUoJ3RpbWVyJywgWyckcm9vdFNjb3BlJywgJyRpbnRlcnZhbCcsICckZ2FtZScsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRpbnRlcnZhbCwgJGdhbWUpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29wZToge30sXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0aW1lci90aW1lci5odG1sJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVyVmFsdWUgPSAxMDtcblxuICAgICAgICAgICAgICAgIHZhciBzdG9wO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVyU3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qgc3RhcnQgYSBuZXcgZmlnaHQgaWYgd2UgYXJlIGFscmVhZHkgZmlnaHRpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHN0b3ApKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9ICRpbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS50aW1lclZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVyVmFsdWUgPSBzY29wZS50aW1lclZhbHVlIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUudGltZXJTdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGdhbWUuZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRpbWVyU3RhcnQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignZ2FtZVN0YXJ0JywgdGltZXJTdGFydCk7XG5cbiAgICAgICAgICAgICAgICBzY29wZS50aW1lclN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHN0b3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHN0b3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBzY29wZS50aW1lclJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVyVmFsdWUgPSA2MFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBpbnRlcnZhbCBpcyBkZXN0cm95ZWQgdG9vXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnRpbWVyU3RvcCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICAgIGFwcC5kaXJlY3RpdmUoJ3RhcmdldCcsIFtmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RhcmdldC90YXJnZXQuaHRtbCcsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICAgIGFwcC5kaXJlY3RpdmUoJ3Njb3JlJywgWyAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2NvcmUvc2NvcmUuaHRtbCcsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuc2NvcmVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlVXBkYXRlID0gZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zY29yZVZhbHVlID0gZGF0YS5idWJibGVzQ291bnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm9vdFNjb3BlXCIsICRyb290U2NvcGUpXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJ2J1YmJsZVBvcHBlZCcsIHNjb3JlVXBkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5ydW4oWyckaW9uaWNQbGF0Zm9ybScsICckc3RhdGUnLFxuICAgIGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkc3RhdGUpIHtcbiAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgLy8gdGVtcGxhdGVVcmw6ICdodG1sL2FwcC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQXBwQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgIHVybDogJy9hcHAvaG9tZScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgncGxheScsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwL3BsYXknLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnYXBwLXZpZXcnOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGxheS9wbGF5Lmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUGxheUNvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9ob21lJyk7XG4gICAgfVxuICBdKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLmNvbnRyb2xsZXIoJ1BsYXlDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckZ2FtZScsICdidWJibGVGYWN0b3J5JywgJyRkb2N1bWVudCcsICckY29tcGlsZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJGdhbWUsIGJ1YmJsZUZhY3RvcnksICRkb2N1bWVudCwgJGNvbXBpbGUsICR0aW1lb3V0KSB7XG4gICAgdmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoODAwLCA2MDAsIFBoYXNlci5BVVRPLCAnZ2FtZScsIHtcbiAgICAgIHByZWxvYWQ6IHByZWxvYWQsXG4gICAgICBjcmVhdGU6IGNyZWF0ZSxcbiAgICAgIHVwZGF0ZTogdXBkYXRlXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdidWJibGVTaGVldCcsICd2ZW5kb3IvaW1nL29pZV90cmFuc3BhcmVudC5wbmcnLCAyMTMsIDI4NCk7XG4gICAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbiAgICAgIC8vSW5pdGlhbGl6ZSBnYW1lIGNvbXBvbmVudHNcbiAgICAgIGJ1YmJsZUZhY3RvcnkuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIGNyZWF0ZVdhbGxzKCk7XG4gICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICAgICRnYW1lLnN0YXJ0KHRvcGljLCB0aW1lTGltaXQsIGRpZmZpY3VsdHlMZXZlbCk7XG4gICAgICB3aW5kKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgY3VsbCgpO1xuICAgICAgY2hlY2tDb2xsaXNpb24oKTtcbiAgICB9XG4gICAgdmFyIHdhbGxMZWZ0O1xuICAgIHZhciB3YWxsUmlnaHQ7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXYWxscygpIHtcblxuICAgICAgLy9TdGFydCBnYW1lXG4gICAgICB3YWxsTGVmdCA9IGdhbWUuYWRkLnRpbGVTcHJpdGUoKDggKiA0KSwgMCwgOCwgZ2FtZS5oZWlnaHQsICdibGFuaycpO1xuICAgICAgd2FsbFJpZ2h0ID0gZ2FtZS5hZGQudGlsZVNwcml0ZShnYW1lLndpZHRoIC0gKDggKiA0KSwgMCwgOCwgZ2FtZS5oZWlnaHQsICdibGFuaycpO1xuXG4gICAgICBnYW1lLnBoeXNpY3MuZW5hYmxlKFt3YWxsTGVmdCwgd2FsbFJpZ2h0XSwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgICAgd2FsbExlZnQuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuICAgICAgd2FsbExlZnQuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcblxuICAgICAgd2FsbFJpZ2h0LmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbiAgICAgIHdhbGxSaWdodC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB0b3BpYyA9ICdsZXR0ZXJzJztcbiAgICB2YXIgZGlmZmljdWx0eUxldmVsID0gJ2Vhc3knO1xuICAgIHZhciB0aW1lTGltaXQgPSA2MDtcblxuICAgIC8vUmVhZHkgZ2FtZSBsaXN0ZW5lcnNcbiAgICAkcm9vdFNjb3BlLiRvbignbmV3QnViYmxlJywgYWRkQnViYmxlVG9HYW1lKTtcbiAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgJGdhbWUuY2FuY2VsKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgYnViYmxlU3ByaXRlQ29sb3JMb2NhdGlvbnMgPSB7XG4gICAgICAnb3JhbmdlJzogMCxcbiAgICAgICdncmVlbic6IDYsXG4gICAgICAneWVsbG93JzogMTIsXG4gICAgICAncmVkJzogMThcbiAgICB9O1xuICAgIHZhciBidWJibGVzID0gW107XG4gICAgLy9HYW1lIEZ1bmN0aW9uc1xuICAgIGZ1bmN0aW9uIGFkZEJ1YmJsZVRvR2FtZShlLCBkYXRhKSB7XG4gICAgICAvLyB2YXIgYnViYmxlR3JvdXAgPSBnYW1lLmFkZC5ncm91cCgpO1xuICAgICAgdmFyIGJ1YmJsZSA9IGdhbWUuYWRkLnNwcml0ZShkYXRhLngsIC0yODQsICdidWJibGVTaGVldCcsIGJ1YmJsZVNwcml0ZUNvbG9yTG9jYXRpb25zW2RhdGEuY29sb3JdKTtcbiAgICAgIC8vIGJ1YmJsZUdyb3VwLmFkZChidWJibGUpO1xuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBmb250OiBcIjMycHggQXJpYWxcIixcbiAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgICB9O1xuICAgICAgdmFyIHRleHQgPSBnYW1lLmFkZC50ZXh0KGJ1YmJsZS53aWR0aCAvIDIsIGJ1YmJsZS5oZWlnaHQgLyAyLCBkYXRhLnZhbHVlLCBzdHlsZSk7XG4gICAgICBidWJibGUuYWRkQ2hpbGQodGV4dCk7XG4gICAgICB0ZXh0LmFuY2hvci5zZXQoMC41KTtcbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKGJ1YmJsZSk7XG4gICAgICBidWJibGUuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBidWJibGUuYm9keS5ncmF2aXR5LnkgPSAyMDtcbiAgICAgIGJ1YmJsZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xuICAgICAgYnViYmxlLmV2ZW50cy5vbklucHV0RG93bi5hZGQocmVtb3ZlQnViYmxlLCB0aGlzKTtcbiAgICAgIGJ1YmJsZXMucHVzaChidWJibGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUJ1YmJsZShidWJibGUpIHtcbiAgICAgIGJ1YmJsZS5kZXN0cm95KCk7XG4gICAgICBidWJibGUuZ29uZSA9IHRydWU7XG4gICAgICAkZ2FtZS5idWJibGVQb3BwZWQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdWxsKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWJibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChidWJibGVzW2ldLmdvbmUgPT0gdHJ1ZSkge1xuICAgICAgICAgIGJ1YmJsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYnViYmxlc1tpXS55ID09PSBcIm51bWJlclwiICYmIGJ1YmJsZXNbaV0ueSA+PSA4MDApIHtcbiAgICAgICAgICBidWJibGVzW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgICBidWJibGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgY29uc29sZS5sb2coJ2N1bGwnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbUJldHdlZW5XaXRoTmVnKGEsIGIpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogYiAqIDIpICsgYSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHdpbmQoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSByYW5kb21CZXR3ZWVuV2l0aE5lZygtMTAwLCAxMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndpbmQ6IFwiLCByKVxuICAgICAgICBidWJibGVzW2ldLmJvZHkuYWNjZWxlcmF0aW9uLnggPSByO1xuICAgICAgfVxuICAgICAgJHRpbWVvdXQod2luZCwgMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1YmJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGJ1YmJsZXNbaV0sIHdhbGxSaWdodCwgYm91bmNlKTtcbiAgICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGJ1YmJsZXNbaV0sIHdhbGxMZWZ0LCBib3VuY2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJvdW5jZShidWJibGUsIHdhbGwpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVyZTogXCIpO1xuICAgICAgYnViYmxlLmJvZHkudmVsb2NpdHkueCAqPSAtMTtcbiAgICAgIGJ1YmJsZS5ib2R5LmFjY2VsZXJhdGlvbi54ICo9IC0xO1xuICAgIH1cbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIGNvbnNvbGUubG9nKCdob21lIGNvbnRyb2xsZXInKTtcbiAgICAkc2NvcGUudGVzdCA9ICdIZWxsbyc7XG4gIH1dKTtcblxufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuc2VydmljZSgnJGdhbWUnLCBbJyRyb290U2NvcGUnLCAnZ2FtZVRvcGljcycsIGZ1bmN0aW9uKCRyb290U2NvcGUsIGdhbWVUb3BpY3MpIHtcblxuICAgIHZhciBjdXJyZW50U2NvcmUgPSAwO1xuICAgIHZhciBidWJibGVzQ291bnQgPSAwO1xuXG4gICAgdmFyIGdhbWVTdGFydCA9IGZ1bmN0aW9uKHRvcGljLCB0aW1lTGltaXQsIGRpZmZpY3VsdHkpIHtcbiAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICBidWJibGVzQ291bnQgPSAwO1xuICAgICAgdmFyIGdhbWVEYXRhID0ge1xuICAgICAgICB2YWx1ZXM6IGdhbWVUb3BpY3NbdG9waWNdLFxuICAgICAgICB0aW1lTGltaXQ6IHRpbWVMaW1pdCxcbiAgICAgICAgZGlmZmljdWx0eTogZGlmZmljdWx0eSxcbiAgICAgICAgY3VycmVudFNjb3JlOiBjdXJyZW50U2NvcmVcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZygndGVzdCcpXG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCdnYW1lU3RhcnQnLCBnYW1lRGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBidWJibGVQb3BwZWQgPSBmdW5jdGlvbihzY29yZSkge1xuICAgICAgY3VycmVudFNjb3JlICs9IHNjb3JlIHx8IDE7XG4gICAgICBidWJibGVzQ291bnQrKztcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgIHRvdGFsU2NvcmU6IGN1cnJlbnRTY29yZSxcbiAgICAgICAgYnViYmxlc0NvdW50OiBidWJibGVzQ291bnRcbiAgICAgIH07XG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCdidWJibGVQb3BwZWQnLCBkYXRhKTtcbiAgICB9O1xuXG4gICAgdmFyIGdhbWVEb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZ2FtZURvbmVEYXRhID0ge1xuICAgICAgICB0b3RhbFNjb3JlOiBjdXJyZW50U2NvcmUsXG4gICAgICAgIGJ1YmJsZXNDb3VudDogYnViYmxlc0NvdW50XG4gICAgICB9O1xuXG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCdnYW1lRG9uZScsIGdhbWVEb25lRGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBnYW1lQ2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCdnYW1lQ2FuY2VsJyk7XG4gICAgfTtcblxuICAgIHZhciBwdWJsaWNNZXRob2RzID0ge1xuICAgICAgc3RhcnQ6IGdhbWVTdGFydCxcbiAgICAgIGRvbmU6IGdhbWVEb25lLFxuICAgICAgY2FuY2VsOiBnYW1lQ2FuY2VsLFxuICAgICAgYnViYmxlUG9wcGVkOiBidWJibGVQb3BwZWRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHB1YmxpY01ldGhvZHM7XG5cbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLmRpcmVjdGl2ZSgnaHVkJywgW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzY29wZToge30sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdodWQvaHVkLmh0bWwnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblxuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLmRpcmVjdGl2ZSgnYnViYmxlJywgWyckZ2FtZScsIGZ1bmN0aW9uKCRnYW1lKSB7XG4gICAgdmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHg6ICdAJyxcbiAgICAgICAgdmFsdWU6ICdAJyxcbiAgICAgICAgcmFkaXVzOiAnQCcsXG4gICAgICAgIGNvbG9yOiAnQCdcbiAgICAgIH0sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYnViYmxlL2J1YmJsZS5odG1sJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygncG9wJyk7XG4gICAgICAgICAgJGdhbWUuYnViYmxlUG9wcGVkKCk7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQub24oYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7IiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuZmFjdG9yeSgnYnViYmxlRmFjdG9yeScsIFsnJHdpbmRvdycsICdnYW1lVG9waWNzJywgJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkd2luZG93LCBnYW1lVG9waWNzLCAkcm9vdFNjb3BlLCAkdGltZW91dCkge1xuICAgIHZhciByYW5kb21CZXR3ZWVuID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBiKSArIGEpO1xuICAgIH07XG4gICAgdmFyIGNvbG9ycyA9IFsnb3JhbmdlJywgJ2dyZWVuJywgJ3llbGxvdycsICdyZWQnXTtcbiAgICB2YXIgdG9waWMgPSAnJztcbiAgICB2YXIgYnViYmxlU3RyZWFtVGltZXI7XG4gICAgdmFyIF9XID0gJHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHZhciB2YWx1ZXM7XG4gICAgdmFyIG5ld0J1YmJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHIgPSAxODUgLy9yYW5kb21CZXR3ZWVuKF9XIC8gMzIsIF9XIC8gMTYpO1xuICAgICAgdmFyIHggPSByYW5kb21CZXR3ZWVuKDAsIDgwMCAtIHIgKiAyKTtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tyYW5kb21CZXR3ZWVuKDAsIHZhbHVlcy5sZW5ndGgpXTtcbiAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21CZXR3ZWVuKDAsIGNvbG9ycy5sZW5ndGgpXTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgICAgIC8vIGh0bWw6ICc8YnViYmxlIHg9XCInICsgeCArICdcIiByYWRpdXM9XCInICsgciArICdcIiB2YWx1ZT1cIicgKyB2YWx1ZSArICdcIiBjb2xvcj1cIicgKyBjb2xvciArICdcIiBjbGFzcz1cImRyb3BcIj48L2J1YmJsZT4nXG4gICAgICB9O1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnbmV3QnViYmxlJywgZGF0YSk7XG4gICAgfTtcbiAgICB2YXIgYnViYmxlU3RyZWFtID0gZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgbmV3QnViYmxlKCk7XG4gICAgICB2YXIgdGltZSA9IHJhbmRvbUJldHdlZW4oMjAwLCA1MDApO1xuICAgICAgYnViYmxlU3RyZWFtVGltZXIgPSAkdGltZW91dChidWJibGVTdHJlYW0sIHRpbWUpO1xuICAgIH07XG4gICAgdmFyIGNhbmNlbFRpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAkdGltZW91dC5jYW5jZWwoYnViYmxlU3RyZWFtVGltZXIpO1xuICAgIH07XG4gICAgJHJvb3RTY29wZS4kb24oJ2dhbWVDYW5jZWwnLCBjYW5jZWxUaW1lcik7XG4gICAgJHJvb3RTY29wZS4kb24oJ2dhbWVEb25lJywgY2FuY2VsVGltZXIpO1xuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9mZiA9ICRyb290U2NvcGUuJG9uKCdnYW1lU3RhcnQnLCBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgICAgdmFsdWVzID0gZGF0YS52YWx1ZXM7XG4gICAgICAgICAgYnViYmxlU3RyZWFtKCk7XG4gICAgICAgICAgb2ZmKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
