angular
    .module('controller.totals', ['ionic'])
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
            console.log('odds = ', data);
            LoadingService.hide();
        });

        // temp
        LoadingService.hide();
    });
