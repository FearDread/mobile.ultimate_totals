angular
    .module('controller.stats', ['ionic'])
    .controller('StatsCtrl', function($scope) {

        $scope.stats = [
            { title: 'Ranks', id: 1 },
            { title: 'Schedules', id: 2 },
            { title: 'Injury Reports', id: 3 }
        ];
    });
