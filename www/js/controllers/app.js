angular
    .module('controller.app', ['ionic'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // listen for the $ionicView.enter event:
        $scope.$on('$ionicView.enter', function (e) {
            console.log('entered menu event, good place to make api calls or ui updates.');
        });

        // Form data for the login modal
        $scope.loginData = {};

        $ionicModal.fromTemplateUrl('templates/login.html', {
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

        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    });
