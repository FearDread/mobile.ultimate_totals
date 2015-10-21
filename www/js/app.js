// Ultimate Totals Ionic App
angular
    .module('ultimate', [
        'ionic',
        'services',
        'providers',
        'controllers'
    ])

    .run(function ($ionicPlatform, $timeout, LoadingService) {

        /* Loader testing */
        LoadingService.show();

        $timeout(function () {
            /* temp */
            LoadingService.hide();
        }, 2000);

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
    
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
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

            .state('app.stats', {
                url: '/stats',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/stats.html',
                        controller: 'StatsCtrl'
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
          
        // default route
        $urlRouterProvider.otherwise('/app/totals');
    });
