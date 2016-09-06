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
    $facebookProvider.setPermissions('email, public_profile, user_posts, publish_actions, user_photos');
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
          $scope.isLoggedIn = true;
          refresh();
        });
    }

    $scope.logout = function() {
      $facebook.logout()
        .then(function() {
          $scope.isLoggedIn = false;
          refresh();
        })
    }

    function refresh() {
      $facebook.api('/me')
        .then(function(response){
          $scope.userInfo = response;
          $scope.welcomeMessage = "Welcome " + response.name;
          $scope.userInfo.first_name = response.name.split(" ")[0];
          $scope.userInfo.last_name = response.name.split(" ")[1];
          $facebook.api('/me/picture')
            .then(function(response) {
              $scope.picture = response.data.url;
              $facebook.api('/me/permissions')
                .then(function(response) {
                  $scope.permissions = response.data;
                  $facebook.api('/me/posts')
                    .then(function(response) {
                      $scope.posts = response.data;
                    });
                });
            });
        }, function(error) {
          $scope.welcomeMessage = "Please log in";
        })
    }

    $scope.postStatus = function() {
      var body = this.newPost;

      $facebook.api('/me/feed', 'post', { message: body })
                  .then(function(response) {
                    $scope.msg = 'Thanks for posting.';
                    refresh();
                  })
    }

    refresh();
  }]);
