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
    $scope.initTempNetwork = function() {
      $scope.newNetwork = {name:"", members: [], metadata: [], tags:[]};
      $scope.temp = {metaKey:"", metaValue:"", tag:""};
    }

    $scope.setSensorNetworkMeta = function() {
      var postResource = $resource('/csn-restapi/csn/networks');
      postResource.save($scope.newNetwork).$promise
        .then(function(response) {
          $log.info("Network Registered: " + JSON.stringify(response));
          window.alert('Succefully add SensorNetwork Metadata');
          $scope.getSensorNetworks(1);
          $scope.initTempNetwork();
          $scope.getSensorNetworkCount();
        });
    };

    

    $scope.addMetadata = function() {
      var conflictFlag = false;

      if($scope.temp.metaKey === "" || $scope.temp.metaValue === "") {
        window.alert("Please correctly input metadata key or value");
      } else {
        $scope.newNetwork.metadata.forEach(function(meta){
          if( meta.metaKey == $scope.temp.metaKey )
            conflictFlag = true;
        });
        if(conflictFlag)
          window.alert("You can't put identical metadata key");
        else 
          $scope.newNetwork.metadata.push( { metaKey:$scope.temp.metaKey, metaValue:$scope.temp.metaValue } );
        
        $log.info("Added Metadata: " + JSON.stringify($scope.newNetwork.metadata));
      }
    };

     $scope.addTag = function() {
      if($scope.temp.tag === "") {
        window.alert("Please correctly input tag");
      }
      else {
       $log.info("Added Tag: " + JSON.stringify($scope.newNetwork.tags));
       $scope.newNetwork.tags.push($scope.temp.tag);
      }
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
          $log.info("Deleted Network: " + JSON.stringify(response));
          window.alert('Succefully Delete SensorNetwork Metadata');
          $scope.getSensorNetworks(1);
          $scope.getSensorNetworkCount();
        });
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.getSensorNetworks = function(curPage) {
      $scope.currentPage = curPage;
      $scope.itemsPerPage = 4;
      $scope.pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;

      var SensorNetworkIDResource = $resource('/csn-restapi/csn/networks', {index:$scope.pageIndex, num:$scope.itemsPerPage});
      SensorNetworkIDResource.get().$promise
        .then(function(data) {
          $log.info("Network Data: " + JSON.stringify(data));
          $scope.snData = data;
        })
        .catch(function(response) {
           $log.info("Error: " + JSON.stringify(response));
        });

        $scope.pageChanged();
    };

    $scope.getSensorNetworkCount = function() {
      $http.get('/csn-restapi/csn/networks?select=counts').success(function(data){
        $log.info("Network Count: " + JSON.stringify(data));
        $scope.snCount = data;
        $scope.totalItems = $scope.snCount.operatingCNT;
      });
    };

    $scope.getSensorNetworkMeta = function() {
      console.log('Checked');
      var SensorNetworkResource = $resource('/csn-restapi/csn/networks/:snID', {snID:'@id'});
      SensorNetworkResource.get({snID:$scope.findID}).$promise
        .then(function(response) {
          $log.info("Network Metadata: " + JSON.stringify(response));
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
        $log.info("Network IDs: " + JSON.stringify(data));
        $scope.snIDs = data;
      });
    };

    $scope.inputSnID = function(data) {
      $scope.findID = data;
    };

  });

angular.module('csnDashboardApp')
  .controller('ModalInstanceCtrl', function ($scope, $resource, $modalInstance, $log) {
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
      $log.info("Added Tags: " + JSON.stringify($scope.search.tags));
    };

    $scope.searchNetworkWithTag = function() {
      var searchResource = $resource('/csn-restapi/csn/search');
      searchResource.save($scope.search.tags).$promise
        .then(function(response) {
          var resultNetworkArray = response.searchResult;
          $scope.search.members = resultNetworkArray;
          $log.info("Network Search Member: " + JSON.stringify($scope.search.members));
        });
    };
  });

angular.module('csnDashboardApp')
  .controller('ModalInstanceCtrl2', function ($scope, $resource, $modalInstance, $log) {
    $scope.temp = {members:[]};
    $scope.tempMember = "";

    $scope.ok = function () {
      $modalInstance.close($scope.temp.members);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.addTempMember = function() {
      var tempMember = false;
      if($scope.tempMember == "") {
        window.alert("Please correctly input a member");
      } else {
        $scope.temp.members.forEach(function(member){
          if( meta == $scope.tempMember )
            conflictFlag = true;
        });
        
        if(conflictFlag)
          window.alert("You can't put identical metadata key");
        else {
          $scope.temp.members.push($scope.tempMember);
          $log.info("Network Search Member: "  + JSON.stringify($scope.temp.members));
        }
      }
    };

    $scope.setNetworkID = function(id) {
      $scope.tempMember = id;
    }

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.pagingNetworks = function(curPage) {
      $scope.currentPage = curPage;
      $scope.itemsPerPage = 4;
      var pageIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
      $scope.pagedIDList = $scope.pagedTempIDList.slice(pageIndex, pageIndex+$scope.itemsPerPage);
      $scope.pageChanged();
    };

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

  });
