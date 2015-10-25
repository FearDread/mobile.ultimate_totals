angular
    .module('controller.app', ['ionic', 'ui.router'])
    .controller('AppCtrl', function ($scope, $state, $ionicModal, $timeout, LoadingService, ApiProvider) {

        $scope.loginData = {};
        $scope.signupData = {};

        $scope.$on('$ionicView.enter', function (e) {
            console.log('entered menu event, good place to make api calls or ui updates.');
        });

        $ionicModal.fromTemplateUrl('templates/modals/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        $scope.login = function () {
            $scope.modal.show();
        };

        $scope.signup = function () {
            $scope.closeLogin();

            $state.go('app.signup');
        };

        $scope.doLogin = function () {
            ApiProvider
              .post('login', $scope.loginData)
              .success(function (response) {
                  if (response && response.success) {
                      $scope.closeLogin();
                  }
              })
              .error(function (error) {
                  if (error && error.message) {
                      $scope.error = error.message;
                  }
              });
        };

        $scope.doCreateUser = function () {
            ApiProvider
              .post('signup', $scope.signupData)
              .success(function (response) {
                  console.log('signup response = ', response);
                  if (response && response.success) {

                  }
              })
              .error(function (error) {
                  if (error && error.message) {
                      $scope.error = error.message;
                  }
              });
        };
    });
