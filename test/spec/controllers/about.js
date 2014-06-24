'use strict';

describe('Controller: AboutController', function () {

  // load the controller's module
  beforeEach(module('csnDashboardApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.test.length).toBe(4);
  });
});
