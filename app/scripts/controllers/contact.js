'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:ContactController
 * @description
 * # ContactController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('ContactController', function ($scope, $resource) {
    $scope.getTopicStatus = function() {
      var statusResource = $resource('/CSN-REST/csn/broker/topics');
      statusResource.get().$promise
        .then(function(response) {
          $scope.topics = response;
        })
        .catch(function(response) {
          console.log(response);
        });
    };
  });
