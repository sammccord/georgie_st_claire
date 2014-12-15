'use strict';

angular.module('georgieStClaireApp')
    .controller('24hrCtrl', function($scope, speak, socket) {

        $scope.speaking = false;
        $scope.spokeonce = false;

        socket.syncUpdates('speak_news', null, function(e, data) {
            console.log(data);
            if ($scope.speaking === false) {
                $scope.speaking = true;
                angular.element('#georgieMouth').addClass('animated').addClass(' bounce');
            }
            console.log($scope.spokeonce);
            if ($scope.spokeonce === false) {
                $scope.spokeonce = true;
            }
            speak(data, function() {
                $scope.speaking = false;
            });

        });

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('speak_news');
        });
    });
