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
	app.controller('PlayController', ['$scope', function($scope){
		
	}]);
}(angular.module('abc-bubbles')));
(function(app) {
  app.directive('bubble', [function() {
    var animationEndEvent = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend';

    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'bubble/bubble.html',
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

		var gameStart = function (topic, timeLimit, difficulty) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInRpbWVyL3RpbWVyLmpzIiwidGFyZ2V0L3RhcmdldC5qcyIsInNjb3JlL3Njb3JlLmpzIiwicGxheS9wbGF5LmpzIiwiaHVkL2h1ZC5qcyIsImpzL3J1bi5qcyIsImpzL3JvdXRlcy5qcyIsImhvbWUvaG9tZS5qcyIsImdhbWUvZ2FtZS5qcyIsImJ1YmJsZS9idWJibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKGFwcCkge30oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbi8vIGlvbmljIGJyb3dzZXIgYWRkIGNyb3Nzd2Fsa0AxNi40NS40MjEuMTlcbihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgIH1cbiAgXSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJywgW1xuICAnYWJjLWJ1YmJsZXMuY29uZmlnJyxcbiAgJ2FiYy1idWJibGVzLnRlbXBsYXRlcycsXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2UnXG5dKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICAgIGFwcC5kaXJlY3RpdmUoJ3RpbWVyJywgW2Z1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RpbWVyL3RpbWVyLmh0bWwnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhhdHRycy5jb2xvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnYm91bmNlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcbiAgICBhcHAuZGlyZWN0aXZlKCd0YXJnZXQnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGFyZ2V0L3RhcmdldC5odG1sJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYXR0cnMuY29sb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZChhbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gICAgYXBwLmRpcmVjdGl2ZSgnc2NvcmUnLCBbZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2NvcmUvc2NvcmUuaHRtbCcsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRycy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKGF0dHJzLmNvbG9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnYm91bmNlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXHRhcHAuY29udHJvbGxlcignUGxheUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG5cdFx0XG5cdH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ2J1YmJsZScsIFtmdW5jdGlvbigpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHt9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYnViYmxlL2J1YmJsZS5odG1sJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5jb2xvcikge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYXR0cnMuY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5ydW4oWyckaW9uaWNQbGF0Zm9ybScsICckc3RhdGUnLFxuICAgIGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkc3RhdGUpIHtcbiAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgLy8gdGVtcGxhdGVVcmw6ICdodG1sL2FwcC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQXBwQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgIHVybDogJy9hcHAvaG9tZScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgncGxheScsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwL3BsYXknLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnYXBwLXZpZXcnOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGxheS9wbGF5Lmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUGxheUNvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9ob21lJyk7XG4gICAgfVxuICBdKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIGNvbnNvbGUubG9nKCdob21lIGNvbnRyb2xsZXInKTtcbiAgICAkc2NvcGUudGVzdCA9ICdIZWxsbyc7XG4gIH1dKTtcblxufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXHRhcHAuc2VydmljZSgnJGdhbWUnLCBbJyRyb290U2NvcGUnLCAnZ2FtZVRvcGljcycsIGZ1bmN0aW9uKCRyb290U2NvcGUsIGdhbWVUb3BpY3MpIHtcblxuXHRcdHZhciBjdXJyZW50U2NvcmUgPSAwO1xuXHRcdHZhciBidWJibGVzQ291bnQgPSAwO1xuXG5cdFx0dmFyIGdhbWVTdGFydCA9IGZ1bmN0aW9uICh0b3BpYywgdGltZUxpbWl0LCBkaWZmaWN1bHR5KSB7XG5cdFx0XHRjdXJyZW50U2NvcmUgPSAwO1xuXHRcdFx0YnViYmxlc0NvdW50ID0gMDtcblx0XHRcdHZhciBnYW1lRGF0YSA9IHtcblx0XHRcdFx0dmFsdWVzOiBnYW1lVG9waWNzW3RvcGljXSxcblx0XHRcdFx0dGltZUxpbWl0OiB0aW1lTGltaXQsXG5cdFx0XHRcdGRpZmZpY3VsdHk6IGRpZmZpY3VsdHksXG5cdFx0XHRcdGN1cnJlbnRTY29yZTogY3VycmVudFNjb3JlXG5cdFx0XHR9O1xuXG5cdFx0XHQkcm9vdFNjb3BlLiRlbWl0KCdnYW1lU3RhcnQnLCBnYW1lRGF0YSk7XG5cdFx0fTtcblxuXHRcdHZhciBidWJibGVQb3BwZWQgPSBmdW5jdGlvbihzY29yZSkge1xuXHRcdFx0Y3VycmVudFNjb3JlICs9IHNjb3JlO1xuXHRcdFx0YnViYmxlc0NvdW50Kys7XG5cdFx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdFx0c2NvcmU6IHNjb3JlLFxuXHRcdFx0XHR0b3RhbFNjb3JlOiBjdXJyZW50U2NvcmUsXG5cdFx0XHRcdGJ1YmJsZXNDb3VudDogYnViYmxlc0NvdW50XG5cdFx0XHR9O1xuXHRcdFx0JHJvb3RTY29wZS4kZW1pdCgnYnViYmxlUG9wcGVkJywgZGF0YSk7XG5cdFx0fTtcblxuXHRcdHZhciBnYW1lRG9uZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGdhbWVEb25lRGF0YSA9IHtcblx0XHRcdFx0dG90YWxTY29yZTogY3VycmVudFNjb3JlLFxuXHRcdFx0XHRidWJibGVzQ291bnQ6IGJ1YmJsZXNDb3VudFxuXHRcdFx0fTtcblxuXHRcdFx0JHJvb3RTY29wZS4kZW1pdCgnZ2FtZURvbmUnLCBnYW1lRG9uZURhdGEpO1xuXHRcdH07XG5cblx0XHR2YXIgZ2FtZUNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JHJvb3RTY29wZS4kZW1pdCgnZ2FtZUNhbmNlbCcpO1xuXHRcdH07XG5cblx0XHR2YXIgcHVibGljTWV0aG9kcyA9IHtcblx0XHRcdHN0YXJ0OiBnYW1lU3RhcnQsXG5cdFx0XHRkb25lOiBnYW1lRG9uZSxcblx0XHRcdGNhbmNlbDogZ2FtZUNhbmNlbCxcblx0XHRcdGJ1YmJsZVBvcHBlZDogYnViYmxlUG9wcGVkXG5cdFx0fTtcblxuXHRcdHJldHVybiBwdWJsaWNNZXRob2RzO1xuXHRcdFxuXHR9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7IiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuZGlyZWN0aXZlKCdidWJibGUnLCBbZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHg6ICdAJyxcbiAgICAgICAgdmFsdWU6ICdAJyxcbiAgICAgICAgcmFkaXVzOiAnQCcsXG4gICAgICAgIGNvbG9yOiAnQCdcbiAgICAgIH0sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYnViYmxlL2J1YmJsZS5odG1sJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3BvcCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
