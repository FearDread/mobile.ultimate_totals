angular
    .module('controller.app', ['ionic'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, LoadingService, ApiProvider) {

        // listen for the $ionicView.enter event:
        $scope.$on('$ionicView.enter', function (e) {
            console.log('entered menu event, good place to make api calls or ui updates.');
        });

        // Form data for the login modal
        $scope.loginData = {};

        $ionicModal.fromTemplateUrl('templates/modals/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        $scope.closeSignup = function () {
            $scope.signup_modal.hide();
        };

        $scope.login = function () {
            $scope.modal.show();
        };

        $scope.signup = function () {
            console.log('hit signup');
            $scope.signup_modal = $ionicModal.fromTemplateUrl('templates/modals/signup.html', {
                scope: $scope
            }).then(function (modal) {

                $scope.signup_modal = modal;
                $scope.signup_modal.show();
            });
        };

        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            ApiProvider
              .post('login', $scope.loginData)
              .success(function (response) {
                  console.log('login res = ', response);

                  $scope.closeLogin();
              })
              .error(function (error) {
                  console.log('login error : ', error);

                  $scope.closeLogin();
              });
        };
    });
