'use strict';

describe('Controller: 24hrCtrl', function () {

  // load the controller's module
  beforeEach(module('georgieStClaireApp'));

  var 24hrCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    24hrCtrl = $controller('24hrCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
