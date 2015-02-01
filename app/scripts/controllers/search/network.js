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
    $scope.search = { id: "-", tagResult: false, tagSearchList:[], tagSearchedList:[] };
    $scope.pagedTempIDList = [];
    $scope.pagedIDList = [];

    $scope.getSensorNetworks = function() {
      var SensorNetworkIDResource = $resource('/csn-restapi/csn/networks?select=ids', {});
      SensorNetworkIDResource.get().$promise
        .then(function(response) {
          var data = response
          $scope.pagedTempIDList = data.ids;
          $scope.totalItems = $scope.pagedTempIDList.length;
          $log.info("Default Network List Lenght: " + $scope.totalItems);
          $log.info("Default Network List: " + JSON.stringify($scope.pagedTempIDList));
          $scope.pagingNetworks(1);
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.pagingNetworks = function(curPage) {
      $scope.currentPage = curPage;
      $scope.itemsPerPage = 4;
      var pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
      $scope.pagedIDList = $scope.pagedTempIDList.slice(pageIndex, pageIndex+$scope.itemsPerPage);
      $scope.pageChanged();
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.addSearchTagTerm = function(newTag) {
      $scope.search.tagSearchList.push(newTag);
      $log.info("Added Search Tag: " + $scope.search.tagSearchList);
    };

    $scope.clearSearchTagTerm = function() {
      $scope.search.tagSearchList = [];
      $scope.search.tagResult = false;
      $log.info("Cleared Search Tag: " + $scope.search.tagSearchList);
      $scope.getSensorNetworks(1);
      $scope.search.tempTag = "";
    };

    $scope.searchNetworkWithTag = function() {
      var searchResource = $resource('/csn-restapi/csn/search');
      searchResource.save($scope.search.tagSearchList).$promise
        .then(function(response) {
          var resultNetworkArray = response.searchResult;
          $scope.pagedTempIDList = resultNetworkArray;
          $scope.totalItems = $scope.pagedTempIDList.length;
          $log.info("Tag Filtered List Lenght: " + $scope.totalItems);
          $log.info("Tag Filtered List: " + JSON.stringify($scope.pagedTempIDList));
          $scope.pagingNetworks(1);
          $scope.search.tagResult = true;
          $scope.search.tagSearchedList = $scope.search.tagSearchList;
          $scope.search.tagSearchList = [];
          $scope.search.tempTag = "";
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
