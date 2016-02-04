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
    app.directive('timer', [function() {
        var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'timer/timer.html',
            replace: true,
            link: function($scope, element, attrs) {
                if (attrs.color) {
                    element.addClass(attrs.color);
                }

                element.bind(animationEndEvent, function() {
                    element.removeClass('bounce');
                });

                element.bind('click', function() {
                    element.addClass('bounce');
                });
            }
        };
    }]);
}(angular.module('abc-bubbles')));

(function(app) {
    app.directive('target', [function() {
        var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'target/target.html',
            replace: true,
            link: function($scope, element, attrs) {
                if (attrs.color) {
                    element.addClass(attrs.color);
                }

                element.bind(animationEndEvent, function() {
                    element.removeClass('bounce');
                });

                element.bind('click', function() {
                    element.addClass('bounce');
                });
            }
        };
    }]);
}(angular.module('abc-bubbles')));

(function(app) {
    app.directive('score', [function() {
        var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'score/score.html',
            replace: true,
            link: function($scope, element, attrs) {
                if (attrs.color) {
                    element.addClass(attrs.color);
                }

                element.bind(animationEndEvent, function() {
                    element.removeClass('bounce');
                });

                element.bind('click', function() {
                    element.addClass('bounce');
                });
            }
        };
    }]);
}(angular.module('abc-bubbles')));

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

      $rootScope.$emit('gameStart', gameData);
    };

    var bubblePopped = function(score) {
      currentScore += score;
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
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'hud/hud.html',
      replace: true,
      link: function($scope, element, attrs) {
        if (attrs.color) {
          element.addClass(attrs.color);
        }

        element.bind(animationEndEvent, function() {
          element.removeClass('bounce');
        });

        element.bind('click', function() {
          element.addClass('bounce');
        });
      }
    };
  }]);
}(angular.module('abc-bubbles')));

(function(app) {
  app.directive('bubble', [function() {
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
      link: function($scope, element, attrs) {
        element.bind('click', function() {
          element.addClass('pop');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInRpbWVyL3RpbWVyLmpzIiwidGFyZ2V0L3RhcmdldC5qcyIsInNjb3JlL3Njb3JlLmpzIiwicGxheS9wbGF5LmpzIiwianMvcnVuLmpzIiwianMvcm91dGVzLmpzIiwiaG9tZS9ob21lLmpzIiwiZ2FtZS9nYW1lLmpzIiwiaHVkL2h1ZC5qcyIsImJ1YmJsZS9idWJibGUuanMiLCJidWJibGUvYnViYmxlLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKGFwcCkge30oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbi8vIGlvbmljIGJyb3dzZXIgYWRkIGNyb3Nzd2Fsa0AxNi40NS40MjEuMTlcbihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgIH1cbiAgXSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJywgW1xuICAnYWJjLWJ1YmJsZXMuY29uZmlnJyxcbiAgJ2FiYy1idWJibGVzLnRlbXBsYXRlcycsXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2UnXG5dKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICAgIGFwcC5kaXJlY3RpdmUoJ3RpbWVyJywgW2Z1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RpbWVyL3RpbWVyLmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhhdHRycy5jb2xvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnYm91bmNlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCd0YXJnZXQnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGFyZ2V0L3RhcmdldC5odG1sJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYXR0cnMuY29sb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZChhbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gICAgYXBwLmRpcmVjdGl2ZSgnc2NvcmUnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2NvcmUvc2NvcmUuaHRtbCcsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRycy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKGF0dHJzLmNvbG9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnYm91bmNlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuY29udHJvbGxlcignUGxheUNvbnRyb2xsZXInLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRnYW1lJywgJ2J1YmJsZUZhY3RvcnknLCAnJGRvY3VtZW50JywgJyRjb21waWxlJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkZ2FtZSwgYnViYmxlRmFjdG9yeSwgJGRvY3VtZW50LCAkY29tcGlsZSkge1xuXG4gICAgdmFyIHRvcGljID0gJ2xldHRlcnMnO1xuICAgIHZhciBkaWZmaWN1bHR5TGV2ZWwgPSAnZWFzeSc7XG4gICAgdmFyIHRpbWVMaW1pdCA9IDYwO1xuICAgIHZhciBlbGVtZW50R2FtZUNvbnRhaW5lciA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0uZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKSk7XG5cbiAgICAvL0luaXRpYWxpemUgZ2FtZSBjb21wb25lbnRzXG4gICAgYnViYmxlRmFjdG9yeS5pbml0aWFsaXplKCk7XG5cbiAgICAvL1JlYWR5IGdhbWUgbGlzdGVuZXJzXG4gICAgJHJvb3RTY29wZS4kb24oJ25ld0J1YmJsZScsIGFkZEJ1YmJsZVRvRE9NKTtcblxuICAgIC8vR2FtZSBGdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBhZGRCdWJibGVUb0RPTShlLCBkYXRhKSB7XG4gICAgICBlbGVtZW50R2FtZUNvbnRhaW5lci5hcHBlbmQoJGNvbXBpbGUoZGF0YS5odG1sKSgkc2NvcGUpKTtcbiAgICB9XG5cbiAgICAvL1N0YXJ0IGdhbWVcbiAgICAkZ2FtZS5zdGFydCh0b3BpYywgdGltZUxpbWl0LCBkaWZmaWN1bHR5TGV2ZWwpO1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7IiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAucnVuKFsnJGlvbmljUGxhdGZvcm0nLCAnJHN0YXRlJyxcbiAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJHN0YXRlKSB7XG4gICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgIHVybDogJy9hcHAnLFxuICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICAgIC8vIHRlbXBsYXRlVXJsOiAnaHRtbC9hcHAuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0FwcENvbnRyb2xsZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwL2hvbWUnLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnYXBwLXZpZXcnOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ3BsYXknLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcC9wbGF5JyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2FwcC12aWV3Jzoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BsYXkvcGxheS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1BsYXlDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvaG9tZScpO1xuICAgIH1cbiAgXSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG5cbiAgYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICBjb25zb2xlLmxvZygnaG9tZSBjb250cm9sbGVyJyk7XG4gICAgJHNjb3BlLnRlc3QgPSAnSGVsbG8nO1xuICB9XSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnNlcnZpY2UoJyRnYW1lJywgWyckcm9vdFNjb3BlJywgJ2dhbWVUb3BpY3MnLCBmdW5jdGlvbigkcm9vdFNjb3BlLCBnYW1lVG9waWNzKSB7XG5cbiAgICB2YXIgY3VycmVudFNjb3JlID0gMDtcbiAgICB2YXIgYnViYmxlc0NvdW50ID0gMDtcblxuICAgIHZhciBnYW1lU3RhcnQgPSBmdW5jdGlvbih0b3BpYywgdGltZUxpbWl0LCBkaWZmaWN1bHR5KSB7XG4gICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgYnViYmxlc0NvdW50ID0gMDtcbiAgICAgIHZhciBnYW1lRGF0YSA9IHtcbiAgICAgICAgdmFsdWVzOiBnYW1lVG9waWNzW3RvcGljXSxcbiAgICAgICAgdGltZUxpbWl0OiB0aW1lTGltaXQsXG4gICAgICAgIGRpZmZpY3VsdHk6IGRpZmZpY3VsdHksXG4gICAgICAgIGN1cnJlbnRTY29yZTogY3VycmVudFNjb3JlXG4gICAgICB9O1xuXG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCdnYW1lU3RhcnQnLCBnYW1lRGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBidWJibGVQb3BwZWQgPSBmdW5jdGlvbihzY29yZSkge1xuICAgICAgY3VycmVudFNjb3JlICs9IHNjb3JlO1xuICAgICAgYnViYmxlc0NvdW50Kys7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICB0b3RhbFNjb3JlOiBjdXJyZW50U2NvcmUsXG4gICAgICAgIGJ1YmJsZXNDb3VudDogYnViYmxlc0NvdW50XG4gICAgICB9O1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnYnViYmxlUG9wcGVkJywgZGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBnYW1lRG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGdhbWVEb25lRGF0YSA9IHtcbiAgICAgICAgdG90YWxTY29yZTogY3VycmVudFNjb3JlLFxuICAgICAgICBidWJibGVzQ291bnQ6IGJ1YmJsZXNDb3VudFxuICAgICAgfTtcblxuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnZ2FtZURvbmUnLCBnYW1lRG9uZURhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgZ2FtZUNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHJvb3RTY29wZS4kZW1pdCgnZ2FtZUNhbmNlbCcpO1xuICAgIH07XG5cbiAgICB2YXIgcHVibGljTWV0aG9kcyA9IHtcbiAgICAgIHN0YXJ0OiBnYW1lU3RhcnQsXG4gICAgICBkb25lOiBnYW1lRG9uZSxcbiAgICAgIGNhbmNlbDogZ2FtZUNhbmNlbCxcbiAgICAgIGJ1YmJsZVBvcHBlZDogYnViYmxlUG9wcGVkXG4gICAgfTtcblxuICAgIHJldHVybiBwdWJsaWNNZXRob2RzO1xuXG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ2h1ZCcsIFtmdW5jdGlvbigpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHt9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnaHVkL2h1ZC5odG1sJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5jb2xvcikge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYXR0cnMuY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ2J1YmJsZScsIFtmdW5jdGlvbigpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHtcbiAgICAgICAgeDogJ0AnLFxuICAgICAgICB2YWx1ZTogJ0AnLFxuICAgICAgICByYWRpdXM6ICdAJyxcbiAgICAgICAgY29sb3I6ICdAJ1xuICAgICAgfSxcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdGVtcGxhdGVVcmw6ICdidWJibGUvYnViYmxlLmh0bWwnLFxuICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygncG9wJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5mYWN0b3J5KCdidWJibGVGYWN0b3J5JywgWyckd2luZG93JywgJ2dhbWVUb3BpY3MnLCAnJHJvb3RTY29wZScsICckdGltZW91dCcsIGZ1bmN0aW9uKCR3aW5kb3csIGdhbWVUb3BpY3MsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XG4gICAgdmFyIHJhbmRvbUJldHdlZW4gPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGIpICsgYSk7XG4gICAgfTtcbiAgICB2YXIgY29sb3JzID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd5ZWxsb3cnLCAncHVycGxlJ107XG4gICAgdmFyIHRvcGljID0gJyc7XG4gICAgdmFyIGJ1YmJsZVN0cmVhbUNhbmNlbDtcbiAgICB2YXIgX1cgPSAkd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHZhbHVlcztcbiAgICB2YXIgbmV3QnViYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgciA9IHJhbmRvbUJldHdlZW4oX1cgLyAzMiwgX1cgLyAxNik7XG4gICAgICB2YXIgeCA9IHJhbmRvbUJldHdlZW4oMCwgX1cgLSByICogMik7XG4gICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbcmFuZG9tQmV0d2VlbigwLCB2YWx1ZXMubGVuZ3RoKV07XG4gICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tQmV0d2VlbigwLCBjb2xvcnMubGVuZ3RoKV07XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgaHRtbDogJzxidWJibGUgeD1cIicgKyB4ICsgJ1wiIHJhZGl1cz1cIicgKyByICsgJ1wiIHZhbHVlPVwiJyArIHZhbHVlICsgJ1wiIGNvbG9yPVwiJyArIGNvbG9yICsgJ1wiPjwvYnViYmxlPidcbiAgICAgIH07XG4gICAgICAkcm9vdFNjb3BlLiRlbWl0KCduZXdCdWJibGUnLCBkYXRhKTtcbiAgICB9O1xuICAgIHZhciBidWJibGVTdHJlYW0gPSBmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICBuZXdCdWJibGUoKTtcbiAgICAgIHZhciB0aW1lID0gcmFuZG9tQmV0d2Vlbig1MDAsIDIwMDApO1xuICAgICAgYnViYmxlU3RyZWFtQ2FuY2VsID0gJHRpbWVvdXQoYnViYmxlU3RyZWFtLCB0aW1lKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ2dhbWVTdGFydCcsIGZ1bmN0aW9uKGUsIGRhdGEpIHtcbiAgICAgICAgICB2YWx1ZXMgPSBkYXRhLnZhbHVlcztcbiAgICAgICAgICBidWJibGVTdHJlYW0oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
