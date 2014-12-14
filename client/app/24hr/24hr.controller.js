'use strict';

angular.module('georgieStClaireApp')
  .controller('24hrCtrl', function ($scope,speak,socket) {

  	$scope.speaking = false;

	   socket.syncUpdates('speak_news', null, function(e, data) {
	   			if($scope.speaking === false){
	   				$scope.speaking = true;
	   				angular.element('#georgieMouth').addClass('animated').addClass(' bounce');
	   			}
	      	speak(data,function(){
	      		console.log('spoken');
	      		$scope.speaking = false;
	      	});

	  		}
	  );

	   $scope.$on('$destroy', function() {
            socket.unsyncUpdates('speak_news');
      });
  });
