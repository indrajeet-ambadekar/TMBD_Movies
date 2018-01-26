'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the moviesApp
 */
moviesApp.controller('LoginCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $rootScope.currentPage = "login";
  if (localStorage.currentUser) {
    $location.path('/main');
  }


  var loginUser = function(uname, pwd) {
    if (uname.length === 0 || pwd.length === 0) {
      $scope.__loginModule.loginError = "Please enter username and password";

    } else {
      var userList = JSON.parse(localStorage.users);
      $scope.currentUser = {};

      $.each(userList, function(index, item) {
        if (item.username === uname && item.password === pwd) {
          $scope.currentUser = item;
          localStorage.setItem('currentUser', JSON.stringify($scope.currentUser));
          $location.path('/main');
        } else {
          $scope.__loginModule.loginError = "Invalid user credentials";
        }
      });
    }
    return true;
  };

  $scope.__loginModule = {
    username: 'testuser',
    password: 'testuser',
    login: function(uname, pwd) {
      loginUser(uname, pwd);
    },
    loginError: ''
  };
  $scope.users = [{
      id: 1,
      username: 'testuser1',
      password: 'testuser1',
      favs:[]
    },
    {
      id: 2,
      username: 'testuser2',
      password: 'testuser2',
      favs:[]
    }
  ];
  if (localStorage.users === undefined) {
    localStorage.setItem('users', JSON.stringify($scope.users));
  }
  if (!$scope.$$phase) {
    $scope.$apply();
  }

}]);