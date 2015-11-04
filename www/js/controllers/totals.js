angular
    .module('controller.totals', ['ionic', 'ui.router'])
    .controller('TotalsCtrl', function($scope, $state, $stateParams, ApiProvider, StorageProvider, Utils, LoadingService) {

        function getOdds(callback) {
            if (!Utils.isFunc(callback)) {
                return false;
            }

            ApiProvider
              .index('sdata/odds')
              .success(function (response) {

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

        getOdds(function (data) {
            $scope.odds = (data) ? data : null;

            LoadingService.hide();
        });

        $scope.goToStats = function () {
            $state.go('app.stats');
        };

        $scope.goToRanks = function () {
            $state.go('app.ranks');
        };
    });
