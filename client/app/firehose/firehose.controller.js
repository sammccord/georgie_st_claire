'use strict';

angular.module('georgieStClaireApp')
  .controller('FirehoseCtrl', function ($http, $scope, $interval, $timeout, $location, Auth, speak,socket) {
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

    $scope.open = function($event) {
       $event.preventDefault();
       $event.stopPropagation();

       $scope.opened = true;
    };

    $scope.get_news = function() {
       $http.post('/api/news/firehose',{
            keyword: $scope.keyword,
            date: new Date($scope.dt)
        }).success(function(subs){
            console.log('$scope.sampleData and subs before: ', $scope.sampleData, subs);
            $scope.sampleData = subs.map(function(x){ return x });
            console.log('$scope.sampleData after: ', $scope.sampleData);
            $scope.startHose();
        }).error(function(err){
          if(err) throw new Error(err);
        });
    }

  $scope.sampleData = []

    $scope.dateOptions = {
       formatYear: 'yy',
       startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    var canvas = angular.element('#myCanvas')[0];
    var wHeight = window.innerHeight - 500;
    var wWidth = window.innerWidth - 900;
    // canvas.style.width = window.innerWidth + "px";
    // canvas.style.height = window.innerHeight + "px";
    var context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.canvas.style.background = 'black';

    var firstImg = new Image();
    var useThisForNow = 'http://www.photosinbox.com/download/warning-sign.jpg';
    firstImg.src = useThisForNow;
    firstImg.onload = function() {
      context.drawImage(firstImg,-175,-100,1620,900);
    };

    var count = 100;
    var imageObj = new Image();
    var colors = ['green','red','blue','black','magenta','orange','yellow'];
    var fonts = ['Verdana', 'Arial', 'Georgia', 'Tahoma','Impact','Comic Sans MS'];

    $scope.startHose = function (){
    	var delayTimer = $timeout(function() {
        var timer = $interval(function() {

                    var idx = Math.floor((Math.random() * $scope.sampleData.length) + 1);
                    var ci1 = Math.floor((Math.random() * colors.length) + 1);
                    var ci2 = Math.floor((Math.random() * colors.length) + 1);
                    var ci3 = Math.floor((Math.random() * colors.length) + 1);
                    var fi = Math.floor((Math.random() * fonts.length) + 1);

                    if($scope.sampleData[idx]){
                      if($scope.sampleData[idx].type == 'image' && $scope.sampleData[idx].width > 500) {
                        var url = 'http://nytimes.com/' + $scope.sampleData[idx].url;
                        imageObj.src = url;
                        imageObj.onload = function() {
                          context.drawImage(imageObj,0,0,1620,900);
                          // context.drawImage(imageObj, 0, 0, window.width, window.height);
                        };
                      } else if($scope.sampleData[idx].name) {
                        if($scope.sampleData[idx].value.length > 18) {
                          var fontStr = "50px " + fonts[fi];
                        } else {
                          var fontStr = "150px " + fonts[fi];
                        }
                        context.font = fontStr;
                        // var gradient=context.createLinearGradient(0,0,canvas.width,0);
                        // gradient.addColorStop("0",colors[ci1]);
                        // gradient.addColorStop("0.5",colors[ci2]);
                        // gradient.addColorStop("1.0",colors[ci3]);
                        // context.fillStyle=gradient;
                        context.clearRect ( 0 , 0 , canvas.width, canvas.height );
                        context.fillStyle='white';
                        context.fillText($scope.sampleData[idx].value,600,300);
                        context.textAlign = 'center';
                        context.textBaseline = "middle";
                      }
                    }
                    if( count == 0) clearInterval(timer);
      },90);
    }, 4100);
    }
  });