'use strict';

angular.module('myApp.facebook', ['ngRoute', 'ngFacebook'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/facebook', {
      templateUrl: 'facebook/facebook.html',
      controller: 'FacebookController'
    });
  }])

  .config(function($facebookProvider) {
    $facebookProvider.setAppId('1502992906393073');
    $facebookProvider.setPermissions("email",
                                     "public_profile",
                                     "user_posts",
                                     "publish_actions",
                                     "user_photos");
  })

  .run(function($rootScope) {
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  })

  .controller('FacebookController', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.isLoggedIn = false;

    $scope.login = function() {
      $facebook.login()
        .then(function(){
          console.log('Testing Login')
        });
    }
  }]);
