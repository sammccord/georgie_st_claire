'use strict';

angular.module('georgieStClaireApp')
    .controller('MainCtrl', function($scope, $http, socket, speak) {

        speak('testing testing one two three',function(){
        	console.log('done');
        });

        socket.syncUpdates('speak_news', null, function(e, data) {
        		console.log(e);
            console.log(data);
            speak(data);
        });

        $scope.post = function(){
        	console.log('stuff');
        }

        $scope.addThing = function() {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: $scope.newThing
            });
            $scope.newThing = '';
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('speak_news');
        });
    });
