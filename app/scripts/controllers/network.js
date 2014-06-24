'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:SensorNetworkController
 * @description
 * # SensorNetworkController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('SensorNetworkController', function ($scope, $resource, $http) {

    $scope.setSensorNetworkMeta = function() {
      var postResource = $resource('/CSN-REST/sensors');
      var seed = {seed: $scope.seed};
      postResource.save(seed).$promise
        .then(function(response) {
          console.log(response);
          window.alert('Succefully add SensorNetwork Metadata');
        });
    };

    $scope.getSensorNetworkMeta = function() {
      console.log('Checked');
      var SensorNetworkResource = $resource('/CSN-REST/sensor-networks/:snID', {snID:'@id'});
      SensorNetworkResource.get({snID:$scope.findID}).$promise
        .then(function(response) {
          console.log(response);
          $scope.meta = response;
          $scope.metaOK = true;
        })
        .catch(function(response) {
          console.log(response);
          $scope.metaOK = false;
        });
    };

    $scope.getSensorNetworkIDs = function() {
      $http.get('/CSN-REST/sensor-networks/ids').success(function(data){
        console.log(data);
        $scope.snIDs = data;
      });
    };

    $scope.inputSnID = function(data) {
      $scope.findID = data;
    };

  });
