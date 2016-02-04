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
	app.controller('PlayController', ['$scope', function($scope){
		
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInBsYXkvcGxheS5qcyIsImpzL3J1bi5qcyIsImpzL3JvdXRlcy5qcyIsImhvbWUvaG9tZS5qcyIsImJ1YmJsZS9idWJibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAoZnVuY3Rpb24oYXBwKSB7fShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuLy8gaW9uaWMgYnJvd3NlciBhZGQgY3Jvc3N3YWxrQDE2LjQ1LjQyMS4xOVxuKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlJyxcbiAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSkge1xuXG4gICAgfVxuICBdKTtcblxufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnLCBbXG4gICdhYmMtYnViYmxlcy5jb25maWcnLFxuICAnYWJjLWJ1YmJsZXMudGVtcGxhdGVzJyxcbiAgJ2lvbmljJyxcbiAgJ25nQ29yZG92YS5wbHVnaW5zLmRldmljZSdcbl0pKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG5cdGFwcC5jb250cm9sbGVyKCdQbGF5Q29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcblx0XHRcblx0fV0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpOyIsIihmdW5jdGlvbihhcHApIHtcbiAgYXBwLnJ1bihbJyRpb25pY1BsYXRmb3JtJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRzdGF0ZSkge1xuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgXSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG5cbiAgYXBwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAvLyB0ZW1wbGF0ZVVybDogJ2h0bWwvYXBwLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcC9ob21lJyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2FwcC12aWV3Jzoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdwbGF5Jywge1xuICAgICAgICAgIHVybDogJy9hcHAvcGxheScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwbGF5L3BsYXkuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5Q29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL2hvbWUnKTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgY29uc29sZS5sb2coJ2hvbWUgY29udHJvbGxlcicpO1xuICAgICRzY29wZS50ZXN0ID0gJ0hlbGxvJztcbiAgfV0pO1xuXG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5kaXJlY3RpdmUoJ2J1YmJsZScsIFtmdW5jdGlvbigpIHtcbiAgICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NvcGU6IHt9LFxuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYnViYmxlL2J1YmJsZS5odG1sJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5jb2xvcikge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoYXR0cnMuY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdib3VuY2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2JvdW5jZScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
