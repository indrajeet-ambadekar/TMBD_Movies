'use strict';

describe('Controller: FavouritesCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesApp'));

  var FavouritesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavouritesCtrl = $controller('FavouritesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FavouritesCtrl.awesomeThings.length).toBe(3);
  });
});
