'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the moviesApp
 */
 angular.module('moviesApp')
 .controller('SearchCtrl', ['$scope', 'moviesService', 'TMDBKey', '$location', '$rootScope','ngToast', function($scope, Movies, TMDBKey, $location, $rootScope,ngToast) {
  $rootScope.currentPage = "search";
  $scope.urlParams = encodeURI($location.search().keyword);
  if (!localStorage.currentUser) {
    $location.path('/');
  } else {
    $rootScope.currentUser = JSON.parse(localStorage.currentUser);
  }

  $rootScope.logout = function() {
    localStorage.removeItem('currentUser');
    $location.path('/');
  };
  $scope.getMoviePath = function(poster_path){
    if(poster_path!==null){
      return "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+poster_path;
    }
    else{
      return "images/filmreel.png";
    }
  };

  Movies.getSearchData(TMDBKey, $scope.urlParams).then(function(result) {
    if (result.results.length > 0) {
      $scope.movieData = result;
      angular.forEach($scope.movieData.results, function(item, index) {
        item.release_year = moment(item.release_date).format('YYYY');
      });
    }
  }).catch(function(reason) {
    console.log(reason);
  });

  $scope.fetchMovieCast = function() {
    Movies.getMovieCast(TMDBKey, $scope.movieData.id).then(function(resp) {
      $scope.movieData.cast = resp.cast;
    }).catch(function(reason) {
      console.log(reason);
    });
  };
  $rootScope.logout = function() {
    localStorage.removeItem('currentUser');
    $location.path('/');
  };
  $scope.addToFav = function(movie){
    var userList = JSON.parse(localStorage.users);
    $.each(userList,function(index,item){
      if(item.id===$rootScope.currentUser.id){
        var buff = $.grep(item.favs, function(obj){return movie.id === obj.id;})[0];
        if(buff===undefined){
          item.favs.push(movie);
          ngToast.create({
            className: 'success',
            timeout:4000,
            content: 'Movie added to your watch list'
          });
        }
        else{
          ngToast.create({
            className: 'danger',
            timeout:4000,
            content: 'Movie already added to your watch list'
          });
        }
      }
    });
    localStorage.setItem('users', JSON.stringify(userList));
  };

}]);