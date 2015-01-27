'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:NetworkSearchController
 * @description
 * # NetworkSearchController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('NetworkSearchController', function ($scope, $resource, $http, $log) {
    $scope.search = { id: "-", tagSearchList:[]  };

    $scope.getSensorNetworkCount = function() {
      $http.get('/csn-restapi/csn/networks?select=counts').success(function(data){
        console.log(data);
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
        })
        .catch(function(response) {
          console.log(response);
        });

        $scope.pageChanged();
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.addSearchTagTerm = function(newTag) {
      $scope.search.tagSearchList.push(newTag);
      $log.info("Added Search Tag: " + $scope.search.tagSearchList);
    };

    $scope.searchNetworkWithTag = function() {
      var searchResource = $resource('http://54.64.74.178:8080/csn-restapi/csn/search');
      searchResource.save($scope.search.tagSearchList).$promise
        .then(function(response) {
          var resultNetworkArray = response.searchResult;
          $scope.search.idListUsingTag = resultNetworkArray;
          $log.info($scope.search.idListUsingTag);
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
          window.alert('Search SensorNetwork Metadata');
        });
    };
  });
