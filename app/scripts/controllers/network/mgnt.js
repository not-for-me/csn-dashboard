'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:NetworkMgntController
 * @description
 * # NetworkMgntController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('NetworkMgntController', function ($scope, $resource, $http, $modal, $log) {
    $scope.newNetwork = {members: [], metadata: [], tags:[]};

    $scope.setSensorNetworkMeta = function() {
      var postResource = $resource('/csn-restapi/csn/networks');
      postResource.save($scope.newNetwork).$promise
        .then(function(response) {
          console.log(response);
          window.alert('Succefully add SensorNetwork Metadata');
        });
    };

    $scope.addMetadata = function() {
      $scope.newNetwork.metadata.push( { key:$scope.temp.metaKey, value:$scope.temp.metaValue } );
      console.log($scope.newNetwork.metadata);
    };

     $scope.addTag = function() {
      $scope.newNetwork.tags.push($scope.temp.tag);
      console.log($scope.newNetwork.tags);
    };

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(function (tempMembers) {
        tempMembers.forEach(function(member){
          $scope.newNetwork.members.push(member);
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.open2 = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent2.html',
        controller: 'ModalInstanceCtrl2',
        size: size
      });

      modalInstance.result.then(function (tempMembers) {
        tempMembers.forEach(function(member){
          $scope.newNetwork.members.push(member);
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.deleteNetwork = function(id) {
      var deleteResource = $resource('/csn-restapi/csn/networks/:snID', {snID:'@id'});
      deleteResource.delete({snID:id}).$promise
        .then(function(response) {
          console.log(response);
          window.alert('Succefully Delete SensorNetwork Metadata');
        });
    };

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

    $scope.getSensorNetworkMeta = function() {
      console.log('Checked');
      var SensorNetworkResource = $resource('/csn-restapi/csn/networks/:snID', {snID:'@id'});
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
      $http.get('/csn-restapi/csn/networks?select=ids').success(function(data){
        console.log(data);
        $scope.snIDs = data;
      });
    };

    $scope.inputSnID = function(data) {
      $scope.findID = data;
    };

  });

angular.module('csnDashboardApp')
  .controller('ModalInstanceCtrl', function ($scope, $resource, $modalInstance) {
    $scope.search = {tags:[], members:[]};
    $scope.temp = {members:[]};

    $scope.ok = function () {
      $scope.search.members.forEach(function(member){
        $scope.temp.members.push(member);
      });
      
      console.log($scope.temp.members);
      $modalInstance.close($scope.temp.members);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.addSearchTerm = function() {
      $scope.search.tags.push($scope.tempTag);
      console.log($scope.search.tags);
    };

    $scope.searchNetworkWithTag = function() {
      var searchResource = $resource('http://54.64.74.178:8080/csn-restapi/csn/search');
      searchResource.save($scope.search.tags).$promise
        .then(function(response) {
          var resultNetworkArray = response.searchResult;
          $scope.search.members = resultNetworkArray;
          console.log($scope.search.members);
        });
    };
  });

angular.module('csnDashboardApp')
  .controller('ModalInstanceCtrl2', function ($scope, $resource, $modalInstance) {
    $scope.temp = {members:[]};

    $scope.ok = function () {
      $modalInstance.close($scope.temp.members);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.addTempMember = function() {
      $scope.temp.members.push($scope.tempMember);
      console.log($scope.temp.members);
    };
  });
