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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/csn', {
        templateUrl: 'views/csn.html',
        controller: 'CSNController'
      })
      .when('/topic', {
        templateUrl: 'views/topic.html',
        controller: 'TopicController'
      })
      .when('/sensor-network', {
        templateUrl: 'views/network.html',
        controller: 'SensorNetworkController'
      })
      .when('/sensor', {
        templateUrl: 'views/sensor.html',
        controller: 'SensorController'
      })
      .when('/virtual', {
        templateUrl: 'views/virtual.html',
        controller: 'VirtualController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });