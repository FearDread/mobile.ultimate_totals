var app = angular.module('controller.stats', ['ionic']);

app.controller('StatsCtrl', function($scope) {

    $scope.playlists = [
        { title: 'Ranks', id: 1 },
        { title: 'Schedules', id: 2 },
        { title: 'Injury Reports', id: 3 }
    ];
});
