angular
    .module('controller.games', ['ionic'])
    .controller('GamesCtrl', function($scope, $stateParams, $ionicModal, ApiProvider, LoadingService) {

        function getMyGames(callback) {
            ApiProvider
              .get('game')
              .success(function (response) {

              })
              .error(function (error) {

              });
        }
       
        function getUpcommingGames(callback) {
            ApiProvider
              .get('/sdata/schedule')
              .success(function (resonse) {
                  console.log('game schedule = ', response);
                  if (response && response.success) {

                      if (callback && response.data) {

                          callback(response.data);
                      }
                  }
              })
              .error(function (error) {

              });
        }

        LoadingService.show();

        getMyGames(function (games) {

            $scope.games = games;

            getUpcommingGames(function (data) {

                $scope.schedule = response.data;

                LoadingService.hide();
            });
        });

        $scope.newGame = {};

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
