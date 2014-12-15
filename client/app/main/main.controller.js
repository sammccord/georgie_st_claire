'use strict';

angular.module('georgieStClaireApp')
    .controller('MainCtrl', function($scope, $http, socket, speak, $modal) {

    		$scope.speaking = '';

        $scope.max = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.opendate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];

        $scope.get_news = function() {
            console.log($scope.dt);
            $http.post('/api/news/', {
                keyword: $scope.keyword,
                date: new Date($scope.dt)
            })
            .success(function(data){
            	angular.element('#georgieMouth').addClass('animated').addClass(' bounce');
            	//console.log(speak);
            	$scope.speaking = 'animated bounce';
            	speak(data.headline,function(){
								angular.element('#georgieMouth').removeClass('animated').removeClass(' bounce');
            	});
            });
        }

    });
