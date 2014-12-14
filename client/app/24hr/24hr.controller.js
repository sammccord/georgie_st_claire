'use strict';

angular.module('georgieStClaireApp')
    .controller('24hrCtrl', function($scope, speak, socket) {

        $scope.speaking = false;
        $scope.spokeonce = false;

        console.log('blow it out your dick')

        socket.syncUpdates('speak_news', null, function(e, data) {
            console.log(data);
            console.log('getting');
            if ($scope.speaking === false) {
                $scope.speaking = true;
                angular.element('#georgieMouth').addClass('animated').addClass(' bounce');
            }
            if ($scope.spokeonce = false) {
                console.log('loaded');
                $scope.spokeonce = true;
                console.log(angular.element('#loading'));
                angular.element('#loading').addClass('hide');
            }
            speak(data, function() {
                console.log('spoken');
                $scope.speaking = false;
            });

        });

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('speak_news');
        });
    });
