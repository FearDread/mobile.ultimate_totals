angular
    .module('controller.injuries', ['ionic'])
    .controller('InjuriesCtrl', function($scope, LoadingService, ApiProvider, Utils) {

        function getInjuries(callback) {
            ApiProvider
              .index('sdata/injury')
              .success(function (res) {
                  if (res&& res.success) {
                      if (res.data && Utils.isObj(res.data)) {
                          callback(res.data);
                      }
                  } else {
                      callback();
                  }
              })
              .error(function (err) {
                  if (Utils.isObj(err)) {
                      $scope.error = err;
                  }
                  callback();
              });
        }

        function searchForInjuries(query, callback) {
            ApiProvider
              .index('sdata/injury')
              .success(function (res) {

              })
              .error(function (err) {

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

        $scope.doSearch = function (queryText) {
            var first, last, query, waitTime;

            query = '';
            query += queryText;

            waitTime = 500;

            Utils.delay(function () {

                searchForInjries(query);

            }, waitTime);
        };

    });
