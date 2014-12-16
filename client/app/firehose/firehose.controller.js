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
            console.log('subs', subs);
            $scope.sampleData = subs.map(function(x){ return x });
            $scope.startHose();
        }).error(function(err){
          if(err) throw new Error(err);
        });
    }

    //plays music on first click
    $scope.musicBool = true;
    $scope.musicPlaying = false;
    $scope.submitClick = function() {
      if($scope.musicBool) {
        document.getElementById('audio').play();
        $scope.musicBool = false;
        $scope.musicPlaying = true;
      }
      $scope.respondToSubmission();
      $scope.get_news();
    }

    $scope.waiting15secs = false;

    $scope.respondToSubmission = function() {
      $scope.waiting15secs = true;
      console.log('waiting', $scope.waiting15secs);
      setTimeout(function() { //will disable button temporarily so ppl arent like da ef
          $scope.waiting15secs = false;
          console.log('waiting bak to false?', $scope.waiting15secs);
          $scope.$apply();
      }, 15000)
    }

    $scope.pauseMusic = function() {
      document.getElementById('audio').pause();
      $scope.musicPlaying = false;
    }
    $scope.playMusic = function() {
      document.getElementById('audio').play();
      $scope.musicPlaying = true;
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
    var context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.canvas.style.background = 'black';


    angular.element(window).resize(function () { //responsive canvas
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
    });

    var firstImg = new Image();
    var useThisForNow = 'http://www.photosinbox.com/download/warning-sign.jpg';
    firstImg.src = useThisForNow;
    firstImg.onload = function() {
      context.drawImage(firstImg,0,0,window.innerWidth,window.innerHeight);
    };

    var imageObj = new Image();
    var fonts = ['Verdana', 'Arial', 'Georgia', 'Tahoma','Impact','Comic Sans MS'];

    $scope.startHose = function (){
    	var delayTimer = $timeout(function() {
        var timer = $interval(function() {

                    var idx = Math.floor((Math.random() * $scope.sampleData.length) + 1);
                    var fi = Math.floor((Math.random() * fonts.length) + 1);

                    if($scope.sampleData[idx]){
                      if($scope.sampleData[idx].type == 'image' && $scope.sampleData[idx].width > 500) {
                        var url = 'http://nytimes.com/' + $scope.sampleData[idx].url;
                        imageObj.src = url;
                        imageObj.onload = function() {
                          context.drawImage(imageObj,0,0,window.innerWidth,window.innerHeight);
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
                        context.fillText($scope.sampleData[idx].value,window.innerWidth/2,window.innerHeight/2);
                        context.textAlign = 'center';
                        context.textBaseline = "middle";
                      }
                    }
      },90);
    }, 3000);
    }
  });
