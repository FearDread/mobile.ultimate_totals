angular
    .module('service.alert', [])
    .factory('AlertService', function ($window) {

        return {
            toast: function (msg) {

                if (!$window.navigator.notification) {

                    $window.alert(msg);

                } else {

                    $window.navigator.notification.alert(
                        msg,
                        false,
                        'UT Alert',
                        'Okay'
                    );
                }
            }
        };
    });
