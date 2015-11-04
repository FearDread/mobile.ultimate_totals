/* Ultimate Totals Ionic App */
angular
    .module('ultimate', [
        'ionic',
        'services',
        'providers',
        'controllers'
    ])

    .run(function ($window, $ionicPlatform, $timeout, LoadingService, ApiProvider, StorageProvider) {

        $ionicPlatform.ready(function () {

            LoadingService.show();

            if ($window.cordova && $window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if ($window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (StorageProvider.get('schedule') === null) {
                ApiProvider
                  .index('sdata/schedule')
                  .success(function (response) {
                      if (response && response.success) {
                          if (response.data) {

                              StorageProvider.set('schedule', response.data);
                          }
                      }
                      LoadingService.hide();
                  })
                  .error(function (error) {
                      if (error && error.message) {
                          $scope.error = error.message;
                      }
                      LoadingService.hide();
                  });
            } else {

                LoadingService.hide();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.icon("ion-ios-arrow-left");
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText(false);
    
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/signup.html',
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.totals', {
                url: '/totals',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/totals.html',
                        controller: 'TotalsCtrl'
                    }
                }
            })

            .state('app.ranks', {
                url: '/ranks',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tabs/ranks.html',
                        controller: 'RanksCtrl'
                    }
                }
            })

            .state('tab.stats', {
                url: '/stats',
                views: {
                    'tab-stats': {
                        templateUrl: 'templates/tabs/stats.html',
                        controller: 'StatsCtrl'
                    }
                }
            })

            .state('tab.comments', {
                url: "/comments",
                views: {
                    'tab-comments': {
                        templateUrl: 'templates/tabs/season.html', 
                        controller: 'CommentsCtrl' 
                    }
                }
            })

            .state('app.injuries', {
                url: '/injuries',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/injuries.html',
                        controller: 'InjuriesCtrl'
                    }
                }
            })

            .state('app.games', {
                url: '/games',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/games.html',
                        controller: 'GamesCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/game/:gameId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/game.html',
                        controller: 'GameCtrl'
                    }
                }
            });
          
        $urlRouterProvider.otherwise('/app/totals');
    });
