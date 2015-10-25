angular
    .module('controller.games', ['ionic'])
    .controller('GamesCtrl', function($scope, $stateParams, $ionicModal) {

        function doCreateGame() {

        }

        $scope.showNewGame = function () {
            $scope.gameModal = $ionicModal.fromTemplateUrl('templates/modals/game.html', {
                scope: $scope
            }).then(function (modal) {

                $scope.gameModal = modal;
                $scope.gameModal.show();
            });
        };
    });
