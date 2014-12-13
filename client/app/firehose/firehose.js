'use strict';

angular.module('georgieStClaireApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('firehose', {
        url: '/firehose',
        templateUrl: 'app/firehose/firehose.html',
        controller: 'FirehoseCtrl'
      });
  });