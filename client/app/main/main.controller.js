'use strict';

angular.module('georgieStClaireApp')
    .controller('MainCtrl', function($scope, $http, socket, speak) {

        speak('testing testing one two three', function() {
            console.log('done');
        });

        socket.syncUpdates('speak_news', null, function(e, data) {
            console.log(e);
            console.log(data);
            speak(data);
        });

        $scope.post = function() {
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

        $scope.open = function($event) {
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
                name: $scope.dt
            });
        }

    });
