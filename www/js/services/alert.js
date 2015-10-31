angular
    .module('service.alert', [])
    .factory('AlertService', function ($window) {

        "use strict";

        return {
            toast: function (msg) {

                if (!$window.navigator.notification) {

                    $window.alert(msg);

                } else {

                    $window.navigator.notification.alert(
                        msg,
                        false,
                        'Ultimate Totals',
                        'Okay'
                    );
                }
            }
        };
    });
