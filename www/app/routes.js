define([
  'app',
  // Load Controllers here
  'controllers/app',
  'controllers/dashboard',
  'controllers/results',
  'controllers/detail'
], function (app) {
  'use strict';
  // definition of routes
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      // url routes/states
      $urlRouterProvider.otherwise('/');

      $stateProvider
        // app states
        .state('phone', {
          url: '/phone/',
          abstract: true,
          templateUrl: 'app/templates/phone/base.html'
        })
        .state('tablet', {
          url: '/tablet/',
          abstract: true,
          templateUrl: 'app/templates/tablet/base.html'
        })
        .state('tablet.dashboard', {
          url: 'dashboard',
          templateUrl: 'app/templates/shared/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('phone.dashboard', {
          url: 'dashboard',
          templateUrl: 'app/templates/phone/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('tablet.results', {
          url: 'results/:search/:satTrans/:wheelChair/:wheelChairLift',
          controller: 'ResultsCtrl',
          templateUrl: 'app/templates/shared/results.html'
        })
        .state('phone.results', {
          url: 'results/:search/:satTrans/:wheelChair/:wheelChairLift',
          templateUrl: 'app/templates/phone/results.html',
          controller: 'ResultsCtrl'
        })
        .state('tablet.detail', {
          url: 'detail/:id',
          controller: 'DetailCtrl',
          templateUrl: 'app/templates/tablet/detail.html'
        })
        .state('phone.detail', {
          url: 'detail/:id',
          templateUrl: 'app/templates/phone/detail.html',
          controller: 'DetailCtrl'
        });
    }
  ]);
});
