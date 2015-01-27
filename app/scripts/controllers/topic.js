'use strict';

/**
 * @ngdoc function
 * @name csnDashboardApp.controller:TopicController
 * @description
 * # TopicController
 * Controller of the csnDashboardApp
 */
angular.module('csnDashboardApp')
  .controller('TopicController', function ($scope, $resource) {
    $scope.getTopicStatus = function() {
      var statusResource = $resource('/csn-restapi/csn/broker/topics');
      statusResource.get().$promise
        .then(function(response) {
          var tempTopicList = response
          $scope.topicList = tempTopicList.data;
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.getBrokerStatus = function() {
      var metadataResource = $resource('/csn-restapi/csn/broker/status');
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
