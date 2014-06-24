'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:VirtualController
 * @description
 * # VirtualController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('VirtualController', function ($scope, $resource) {
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
