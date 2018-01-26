'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesApp
 */
moviesApp.controller('MainCtrl', ['$scope', 'moviesService', 'TMDBKey', '$location', '$rootScope', function($scope, Movies, TMDBKey, $location, $rootScope) {
  $rootScope.currentPage = "main";
  $scope.getMovies = function() {
    Movies.getRecentMovies(TMDBKey, 1).then(function(result) {
      $('#loader').hide();
      $scope.recentMoviesObj = result;
    }).catch(function(reason) {
      console.log(reason);
    });
    Movies.getTopMovies(TMDBKey, 1).then(function(result) {
      $('#loader').hide();
      $scope.topMoviesObj = result;
    }).catch(function(reason) {
      console.log(reason);
    });

  };
  $scope.getMovies();
  if (!localStorage.currentUser) {
    $location.path('/');
  } else {
    $rootScope.currentUser = JSON.parse(localStorage.currentUser);
  }

  $rootScope.logout = function() {
    localStorage.removeItem('currentUser');
    $location.path('/');
  };

  $scope.findSearchData = function() {
    if ($scope.searchParams.length > 0) {
      $location.path('/search').search({
        keyword: $scope.searchParams
      });
    }
  };
  $scope.watchKeywords = function(keyCode) {
    if (keyCode === 13) {
      if ($scope.searchParams.length > 0) {
        $location.path('/search').search({
          keyword: $scope.searchParams
        });
      }
    }
  };
  $scope.viewMore = function(dest) {
    $location.path('/filtered').search({
      keyword: dest
    });
  };

}]).value('TMDBKey', '8e5594772b8e85b8e760d7098ff7b212');