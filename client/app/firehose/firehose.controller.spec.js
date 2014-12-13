'use strict';

describe('Controller: FirehoseCtrl', function () {

  // load the controller's module
  beforeEach(module('georgieStClaireApp'));

  var FirehoseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FirehoseCtrl = $controller('FirehoseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
