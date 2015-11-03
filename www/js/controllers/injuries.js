angular
    .module('controller.injuries', ['ionic'])
    .controller('InjuriesCtrl', function($scope, LoadingService, ApiProvider, Utils) {

        function getInjuries(callback) {
            ApiProvider
              .index('sdata/injury')
              .success(function (response) {
                  if (response && response.success) {
                      if (response.data && Utils.isObj(response.data)) {
                          callback(response.data);
                      }
                  } else {
                      callback();
                  }
              })
              .error(function (error) {
                  if (Utils.isObj(error)) {
                      $scope.error = error;
                  }
                  callback();
              });
        }

        LoadingService.show();

        $scope.noData = false;

        getInjuries(function (data) {
            console.log('injuries = ', data);
            $scope.league = data.league || {};

            if (data && data.teams) {

                if (data.teams && data.teams.length > 0) {

                    $scope.injuries = data.teams;
                } else {
                    $scope.noData = true;
                }
            }

            LoadingService.hide();
        });

    });
