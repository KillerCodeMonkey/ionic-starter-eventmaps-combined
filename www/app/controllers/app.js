define([
  'app',
  'directives/elementSize',
  'directives/googleMaps',
  'services/page'
], function (app) {
  'use strict';

  app.controller('AppCtrl', [
    '$scope',
    '$rootScope',
    '$ionicModal',
    '$window',
    '$ionicScrollDelegate',
    '$ionicPlatform',
    '$sce',
    '$state',
    'pageService',
    function ($scope, $rootScope, $ionicModal, $window, $ionicScrollDelegate, $ionicPlatform, $sce, $state, pageService) {
      var screenWidth = $window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          screenHeight = $window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
          screenSize = screenWidth > screenHeight ? screenWidth : screenHeight;
      $rootScope.isWideScreen = screenSize >= 1024;
      $rootScope.statePrefix = $rootScope.isWideScreen ? 'tablet.' : 'phone.';
      $scope.ready = true;

      $scope.dashboard = 1;

      // need to install
      // https://github.com/gbenvenuti/cordova-plugin-screen-orientation
      if (window.screen && window.screen.lockOrientation) {
        if ($rootScope.isWideScreen) {
          window.screen.lockOrientation('landscape');
        } else {
          window.screen.lockOrientation('portrait');
        }
      }

      var currentState;

      $scope.back = function () {
        $window.history.back();
      };

      $scope.$on('$stateChangeStart', function () {
        $scope.dashboard = 0;
      });

      $scope.$on('$stateChangeSuccess', function (event, toState) {
        if (toState.name === $rootScope.statePrefix + 'dashboard') {
          $scope.dashboard = 1;
        } else {
          $scope.dashboard = 2;
        }
        currentState = toState;
        $ionicScrollDelegate.resize();
        $ionicScrollDelegate.scrollTop();
      });

      if ($rootScope.isWideScreen) {
        $ionicPlatform.registerBackButtonAction(function () {
            if (currentState && currentState.name !== $rootScope.statePrefix + 'dashboard') {
              $scope.back();
            } else {
              $window.navigator.app.exitApp();
            }
        }, 100);
      }

      pageService.get().then(function (pages) {
        $scope.pages = pages;
      });

      $ionicModal.fromTemplateUrl('app/templates/shared/page.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function (index) {
        var notEqual = index !== $scope.currentPage;
        if (notEqual) {
          $scope.opening = true;
          $scope.currentPage = index;
        }
        $scope.modal.show().then(function () {
          if (notEqual) {
            $ionicScrollDelegate.$getByHandle('modal').scrollTop();
          }
          $scope.opening = false;
        });
      };

      $scope.trustHtml = function (html) {
        return $sce.trustAsHtml(html);
      };

      $scope.closeModal = function () {
        $scope.modal.hide();
      };

      $scope.goToDetail = function (id) {
        $state.go($rootScope.statePrefix + 'detail', {id: id});
      };
      $state.go($rootScope.statePrefix + 'dashboard');
    }
  ]);
});
