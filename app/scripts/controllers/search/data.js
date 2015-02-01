'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:DataSearchController
 * @description
 * # DataSearchController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('DataSearchController', function ($scope, $resource, $http, $log) {
    $scope.search = { id: "-", tagSearchList:[]  };

    $scope.getSensorNetworkCount = function() {
      $http.get('/csn-restapi/csn/networks?select=counts').success(function(data){
        $log.info("Network Count: " + JSON.stringify(data));
        $scope.snCount = data;
        $scope.totalItems = $scope.snCount.operatingCNT;
      });
    };

    $scope.getSensorNetworks = function(curPage) {
      $scope.currentPage = curPage;
      $scope.itemsPerPage = 4;
      $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;

      var SensorNetworkIDResource = $resource('/csn-restapi/csn/networks?select=ids', {index:$scope.pageIndex, num:$scope.itemsPerPage});
      SensorNetworkIDResource.get().$promise
        .then(function(response) {
          var data = response
          $scope.idList = data.ids;
          $log.info("Network IDs: " + JSON.stringify(data));
        })
        .catch(function(response) {
          console.log(response);
        });

        $scope.pageChanged();
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.addSearchTagTerm = function(newTag) {
      $scope.search.tagSearchList.push(newTag);
      $log.info("Added Search Tag: " + JSON.stringify($scope.search.tagSearchList));
    };

    $scope.searchNetworkWithTag = function() {
      var searchResource = $resource('/csn-restapi/csn/search');
      searchResource.save($scope.search.tagSearchList).$promise
        .then(function(response) {
          var resultNetworkArray = response.searchResult;
          $scope.search.idListUsingTag = resultNetworkArray;
          $log.info("Network Tag: "+ JSON.stringify($scope.search.idListUsingTag));
        });
    };

  
    $scope.setNetworkID = function(id){
      $scope.search.id = id;
    };

    $scope.getNetworkInfo = function(id) {
      var getResource = $resource('/csn-restapi/csn/networks/:snID', {snID:'@id'});
      getResource.get({snID:$scope.search.id}).$promise
        .then(function(response) {
          $scope.search.network = response;
          $log.info("Network Info: " + JSON.stringify($scope.search.network));
          window.alert('Search SensorNetwork Metadata');
        });
    };
  });
