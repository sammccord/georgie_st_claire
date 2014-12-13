'use strict';

angular.module('georgieStClaireApp')
    .controller('MainCtrl', function($scope, $http, socket) {
        $scope.awesomeThings = [];

        function speak (message) {
        	var msg = new SpeechSynthesisUtterance();
          var voices = window.speechSynthesis.getVoices();
          msg.voice = voices[10]; // Note: some voices don't support altering params
          msg.voiceURI = 'native';
          msg.volume = 1; // 0 to 1
          msg.rate = .82; // 0.1 to 10
          msg.pitch = 2; //0 to 2
          msg.text = message;
          msg.lang = 'en-US';

          msg.onend = function(e) {
              console.log('Finished in ' + event.elapsedTime + ' seconds.');
          };


          speechSynthesis.speak(msg);

        }

        speak('testing testing one two three');

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            //socket.syncUpdates('thing', $scope.awesomeThings);
        });

        socket.syncUpdates('speak_news', null, function(e, data) {
        		console.log(e);
            console.log(data);
            speak(data);
        });

        $scope.addThing = function() {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: $scope.newThing
            });
            $scope.newThing = '';
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });
    });
