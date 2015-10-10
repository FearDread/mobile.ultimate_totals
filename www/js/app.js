/*----------------------------\
|                             |
\*---------------------------*/
angular.module('ultimate_totals', [
    'ionic',
    'filters',
    'services',
    'directives',
    'controllers'
])

.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");
  $ionicConfigProvider.backButton.text("");
  $ionicConfigProvider.backButton.previousTitleText(false);

  $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.home', {
        url: "/home",
        views: {
            'tab-home': {
                templateUrl: "templates/tabs/home.html",
                controller: 'HomeCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

});
