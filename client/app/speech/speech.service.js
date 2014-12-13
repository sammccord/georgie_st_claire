'use strict';

angular.module('georgieStClaireApp')
  .service('speak', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return function (message,callback) {
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
              callback();
          };

          speechSynthesis.speak(msg);
        };
  });
