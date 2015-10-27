angular
    .module('controller.games', ['ionic'])
    .controller('GamesCtrl', function($scope, $stateParams, $ionicModal, ApiProvider, LoadingService, StorageProvider) {

        var schedule;

        function getMyGames(callback) {
            ApiProvider
              .index('sdata/game')
              .success(function (response) {
                  console.log('my games = ', response);
                  if (response && response.success) {

                      if (response.data) {
                          callback(response.data);
                      }
                  } else {
                      callback();
                  }
              })
              .error(function (error) {
                  if (error && error.message) {
                      $scope.error = error.message;
                  }
                  callback();
              });
        }
       
        LoadingService.show();

        schedule = StorageProvider.get('schedule');

        $scope.newGame = {};

        $scope.noGames = null;

        $scope.schedule = (schedule) ? schedule : null;

        getMyGames(function (games) {
            $scope.games = (games) ? games : null;
            $scope.noGames = (!games) ? true : false;

            LoadingService.hide();
        });

        $scope.closeNewGame = function () {
            $scope.gameModal.hide();
        };

        $scope.showNewGame = function () {
            $scope.gameModal = $ionicModal.fromTemplateUrl('templates/modals/game.html', {
                scope: $scope
            }).then(function (modal) {

                $scope.gameModal = modal;
                $scope.gameModal.show();
            });
        };

        $scope.doCreateGame = function () {

        };

    });
