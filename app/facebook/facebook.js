'use strict';

angular.module('myApp.facebook', ['ngRoute'])

  .config([$routeProvider, function($routeProvider) {
    $routeProvider.when('/facebook', {
      templateUrl: 'facebook/facebook.html'
      controller: 'FacebookController'
    });
  }])

  .controller('FacebookController', [function() {

  }]);
