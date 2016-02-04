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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInBsYXkvcGxheS5qcyIsImpzL3J1bi5qcyIsImpzL3JvdXRlcy5qcyIsImhvbWUvaG9tZS5qcyIsImJ1YmJsZS9idWJibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uKGFwcCkge30oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbi8vIGlvbmljIGJyb3dzZXIgYWRkIGNyb3Nzd2Fsa0AxNi40NS40MjEuMTlcbihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxuICAgIH1cbiAgXSk7XG5cbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJywgW1xuICAnYWJjLWJ1YmJsZXMuY29uZmlnJyxcbiAgJ2FiYy1idWJibGVzLnRlbXBsYXRlcycsXG4gICdpb25pYycsXG4gICduZ0NvcmRvdmEucGx1Z2lucy5kZXZpY2UnXG5dKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXHRhcHAuY29udHJvbGxlcignUGxheUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG5cdFx0XG5cdH1dKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTsiLCIoZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5ydW4oWyckaW9uaWNQbGF0Zm9ybScsICckc3RhdGUnLFxuICAgIGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkc3RhdGUpIHtcbiAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgLy8gdGVtcGxhdGVVcmw6ICdodG1sL2FwcC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQXBwQ29udHJvbGxlcidcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgIHVybDogJy9hcHAvaG9tZScsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdhcHAtdmlldyc6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgncGxheScsIHtcbiAgICAgICAgICB1cmw6ICcvYXBwL3BsYXknLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnYXBwLXZpZXcnOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGxheS9wbGF5Lmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUGxheUNvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9ob21lJyk7XG4gICAgfVxuICBdKTtcbn0oYW5ndWxhci5tb2R1bGUoJ2FiYy1idWJibGVzJykpKTtcbiIsIihmdW5jdGlvbihhcHApIHtcblxuICBhcHAuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIGNvbnNvbGUubG9nKCdob21lIGNvbnRyb2xsZXInKTtcbiAgICAkc2NvcGUudGVzdCA9ICdIZWxsbyc7XG4gIH1dKTtcblxufShhbmd1bGFyLm1vZHVsZSgnYWJjLWJ1YmJsZXMnKSkpO1xuIiwiKGZ1bmN0aW9uKGFwcCkge1xuICBhcHAuZGlyZWN0aXZlKCdidWJibGUnLCBbZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHg6ICdAJyxcbiAgICAgICAgdmFsdWU6ICdAJyxcbiAgICAgICAgcmFkaXVzOiAnQCcsXG4gICAgICAgIGNvbG9yOiAnQCdcbiAgICAgIH0sXG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYnViYmxlL2J1YmJsZS5odG1sJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3BvcCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KGFuZ3VsYXIubW9kdWxlKCdhYmMtYnViYmxlcycpKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
