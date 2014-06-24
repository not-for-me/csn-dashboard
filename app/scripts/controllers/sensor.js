'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:SensorController
 * @description
 * # SensorController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('SensorController', function ($scope, $resource, $http) {

    $scope.setSensorMeta = function() {
      var postResource = $resource('/CSN-REST/sensors');
      var seed = {seed: $scope.seed};
      postResource.save(seed).$promise
        .then(function(response) {
          console.log(response);
          window.alert('Succefully add Sensor Metadata');
        });
    };

    $scope.getSensorMeta = function() {
      console.log('Checked');
      var sensorResource = $resource('/CSN-REST/sensors/:snsrID', {snsrID:'@id'});
      sensorResource.get({snsrID:$scope.findID}).$promise
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

    $scope.getSensorIDs = function() {
      $http.get('/CSN-REST/sensors/ids').success(function(data){
        console.log(data);
        $scope.snsrIDs = data;
      });
    };

    $scope.inputSnsrID = function(data) {
      $scope.findID = data;
    };

  });
