angular
    .module('controller.app', ['ionic', 'ui.router'])
    .controller('AppCtrl', function ($scope, $state, $ionicModal, $timeout, LoadingService, ApiProvider) {

        $scope.submitted = null;

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
            $scope.submitted = false;

            $state.go('app.signup');
        };

        $scope.doLogin = function (valid) {

            $scope.submitted = true;

            if (valid && $scope.submitted) {

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
            }
        };

        $scope.doCreateUser = function () {

            $scope.submitted = true;

            if ($scope.signUpForm.$valid && $scope.submitted) {
                console.log('is valid');

                ApiProvider
                  .post('user', $scope.signupData)
                  .success(function (response) {
                      if (response && response.success) {

                          $state.go('app.totals');
                      }
                  })
                  .error(function (error) {
                      if (error && error.message) {
                          $scope.error = error.message;
                      }
                  });
            }
        };
    });
