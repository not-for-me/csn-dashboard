'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:CSNController
 * @description
 * # CSNController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('CSNController', function ($scope, $resource) {
    
    $scope.setCSNData = function() {
      var postResource = $resource('/CSN-REST/csn');
      var config = {config: $scope.meta};
      postResource.save(config).$promise
        .then(function(response) {
          $scope.meta = response.ret.data;
          console.log(response);
        });
    };

    $scope.getCSNData = function() {
      var metadataResource = $resource('/CSN-REST/csn');
      metadataResource.get().$promise
        .then(function(response) {
          $scope.meta = response;
        })
        .catch(function(response) {
          console.log(response);
          $scope.meta = {csnName:'-', adminName:'-', adminEmail:'-', creationTime:'-'};
        });
    };

    $scope.removeCSNData = function() {
      var metadataResource = $resource('/CSN-REST/csn');
      metadataResource.remove().$promise
        .then(function() {
          $scope.meta = {csnName:'-', adminName:'-', adminEmail:'-', creationTime:'-'};
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.startCSN = function () {
      var postResource = $resource('/CSN-REST/csn/start');
      if($scope.meta.csnName === '-') {
        window.alert('Please Input Metadata');
      }
      else if($scope.status.working === 'Running') {
        window.alert('Already Running...');
      }
      else {
        var config = {config: $scope.meta};
        postResource.save(config).$promise
          .then(function(response){
            console.log(response);
            window.alert('Successfully Start the CSN!');
            $scope.getCSNStatus();
            $scope.getCSNData();
            $scope.getBrokerStatus();
          });
      }
    };

    $scope.restartCSN = function () {
      var postResource = $resource('/CSN-REST/csn/restart');
      if($scope.meta.csnName === '-') {
        window.alert('CSN isn\'t running');
      }
      else {
        var config = {config: $scope.meta};
        postResource.save(config).$promise
          .then(function(response){
            console.log(response);
            window.alert('Successfully Retart the CSN!');
            $scope.getCSNStatus();
            $scope.getCSNData();
            $scope.getBrokerStatus();
          });
      }
    };

    $scope.stopCSN = function () {
      var postResource = $resource('/CSN-REST/csn/stop');
      postResource.save().$promise
        .then(function(response){
          console.log(response);
          window.alert('Successfully Stop the CSN!');
          $scope.getCSNStatus();
          $scope.getCSNData();
          $scope.getBrokerStatus();
        });
    };

    $scope.getCSNStatus = function() {
      var statusResource = $resource('/CSN-REST/csn/status');
      statusResource.get().$promise
        .then(function(response) {
          $scope.status = response;
          if($scope.status.working === 'OK') {
            $scope.status = {working:'Running', label: 'primary'};
          }
          else {
            $scope.status = {working:'Stopped', label: 'warning'};
          }
        })
        .catch(function(response) {
          console.log(response);
          $scope.status = {working:'Not Connected', label: 'danger'};
        });
    };

    $scope.getBrokerStatus = function() {
      var metadataResource = $resource('/CSN-REST/csn/broker/status');
      metadataResource.get().$promise
        .then(function(response) {
          $scope.broker = response;
        })
        .catch(function(response) {
          console.log(response);
          $scope.broker = {status:'-', proNum:'-', conNum:'-', inNum:'-', outNum:'-', storage:'-', mem:'-'};
        });
    };
  });