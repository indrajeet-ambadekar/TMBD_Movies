'use strict';

describe('Service: moviesService', function () {

  // load the service's module
  beforeEach(module('moviesApp'));

  // instantiate service
  var moviesService;
  beforeEach(inject(function (_moviesService_) {
    moviesService = _moviesService_;
  }));

  it('should do something', function () {
    expect(!!moviesService).toBe(true);
  });

});
