angular
    .module('service.loading', [])
    .factory('LoadingService', function ($ionicLoading) {

        return {
            show: function () {

                $ionicLoading.show({
                    template: '<div class="preloader"><div class="loader"><div class="la-ball-clip-rotate-multiple la-2x"><div></div><div></div></div></div></div>',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            },

            hide: function () {

                $ionicLoading.hide();
            }
        };
    });
