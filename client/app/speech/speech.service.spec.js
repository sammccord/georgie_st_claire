'use strict';

describe('Service: speech', function () {

  // load the service's module
  beforeEach(module('georgieStClaireApp'));

  // instantiate service
  var speech;
  beforeEach(inject(function (_speech_) {
    speech = _speech_;
  }));

  it('should do something', function () {
    expect(!!speech).toBe(true);
  });

});
