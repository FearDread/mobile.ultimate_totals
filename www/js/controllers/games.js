angular
    .module('controller.games', ['ionic'])
    .controller('GamesCtrl', function($scope, $stateParams, $ionicModal, ApiProvider, LoadingService) {

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
       
        function getUpcommingGames(callback) {
            ApiProvider
              .index('sdata/schedule')
              .success(function (response) {
                  console.log('schedule = ', response);
                  if (response && response.success) {

                      if (callback && response.data) {
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

        $scope.newGame = {};

        $scope.noGames = null;

        getMyGames(function (games) {
            if (games) {

                $scope.games = games;
            } else {
                $scope.noGames = true;
            }
        });

        getUpcommingGames(function (data) {
            if (data) {

                $scope.schedule = data;

                LoadingService.hide();
            }
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
