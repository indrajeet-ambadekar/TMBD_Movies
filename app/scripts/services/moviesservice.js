'use strict';

/**
 * @ngdoc service
 * @name moviesApp.moviesService
 * @description
 * # moviesService
 * Service in the moviesApp.
 */
moviesApp.service('moviesService', function($http, $q) {
  return {
    getRecentMovies: function(ApiKey, page) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&primary_release_year=2017&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=" + page,
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
    getTopMovies: function(ApiKey, page) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&primary_release_year=2017&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=" + page,
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
    getSearchData: function(ApiKey, keyword) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/search/multi?api_key=" + ApiKey + "&language=en-US&query=" + keyword + "&page=1&include_adult=false",
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
    getMovieData: function(ApiKey, movieId) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + ApiKey + "&language=en-US",
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
    getMovieCast: function(ApiKey, movieId) {
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + ApiKey,
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
    getFilteredMovies: function(ApiKey, filter, page) {
      var deferred = $q.defer();
      if(filter==='top'){
      	var params = "popularity.desc";
      }
      else{
      	var params = "release_date.desc";
      }
      $http({
          method: 'GET',
          url: "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&primary_release_year=2017&language=en-US&sort_by="+params+"&include_adult=false&include_video=true&page=" + page,
          data: '',
          'async': true,
          'cache': false,
          'global': false,
          headers: {}
        }).then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          var rejection = {
            response: response,
            status: status
          }
          deferred.reject(rejection);
        });

      return deferred.promise;
    },
  }
  // AngularJS will instantiate a singleton by calling "new" on this function
});