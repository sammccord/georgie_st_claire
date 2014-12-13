'use strict';

angular.module('georgieStClaireApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('24hr', {
        url: '/24hr',
        templateUrl: 'app/24hr/24hr.html',
        controller: '24hrCtrl'
      });
  });