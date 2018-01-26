'use strict';

describe('Controller: FilteredCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesApp'));

  var FilteredCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilteredCtrl = $controller('FilteredCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FilteredCtrl.awesomeThings.length).toBe(3);
  });
});
