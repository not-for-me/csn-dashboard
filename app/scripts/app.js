'use strict';

/**
 * @ngdoc overview
 * @name csnDashboardApp
 * @description
 * # csnDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('csnDashboardApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/csn', {
        templateUrl: 'views/csn.html',
        controller: 'CSNController'
      })
      .when('/networks/status', {
        templateUrl: 'views/network/status.html',
        controller: 'NetworkStatusController'
      })
      .when('/networks/mgnt', {
        templateUrl: 'views/network/management.html',
        controller: 'NetworkMgntController'
      })
      .when('/topic', {
        templateUrl: 'views/topic.html',
        controller: 'TopicController'
      })
      .when('/search/network', {
        templateUrl: 'views/search/network.html',
        controller: 'NetworkSearchController'
      })
      .when('/search/data', {
        templateUrl: 'views/search/data.html',
        controller: 'DataSearchController'
      })
      .when('/virtual', {
        templateUrl: 'views/5-virtual.html',
        controller: 'VirtualController'
      })
      .when('/etc/about', {
        templateUrl: 'views/etc/about.html'
      })
      .when('/etc/contact', {
        templateUrl: 'views/etc/contact.html'
      })
      .when('/etc/help', {
        templateUrl: 'views/etc/help.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });