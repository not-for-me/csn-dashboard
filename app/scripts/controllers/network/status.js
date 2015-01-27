'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:NetworkStatusController
 * @description
 * # NetworkStatusController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('NetworkStatusController', function ($scope, $resource, $http, $log) {

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.getSensorNetworks = function(curPage) {
      $scope.currentPage = curPage;
      $scope.itemsPerPage = 4;
      $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;

      var SensorNetworkIDResource = $resource('/csn-restapi/csn/networks', {index:$scope.pageIndex, num:$scope.itemsPerPage});
      SensorNetworkIDResource.get().$promise
        .then(function(data) {
          console.log(data);
          $scope.snData = data;
        })
        .catch(function(response) {
          console.log(response);
        });

        $scope.pageChanged();
    };

    $scope.getSensorNetworkCount = function() {
      $http.get('/csn-restapi/csn/networks?select=counts').success(function(data){
        console.log(data);
        $scope.snCount = data;
        $scope.totalItems = $scope.snCount.operatingCNT;
      });
    };

  });
