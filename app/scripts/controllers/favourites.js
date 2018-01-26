'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:FavouritesCtrl
 * @description
 * # FavouritesCtrl
 * Controller of the moviesApp
 */
 angular.module('moviesApp')
 .controller('FavouritesCtrl', ['$scope', 'moviesService', 'TMDBKey', '$location', '$rootScope','$timeout', function($scope, Movies, TMDBKey, $location, $rootScope,$timeout) {
  $rootScope.currentPage = "favs";
 	if (!localStorage.currentUser) {
 		$location.path('/');
 	} else {
 		$rootScope.currentUser = JSON.parse(localStorage.currentUser);
 	}
 	var users = JSON.parse(localStorage.users);
 	$.each(users,function(index,item){
 		if(item.id === $rootScope.currentUser.id){
 			$scope.favMovies = {};
 			$scope.favMovies.results=item.favs;
 			$scope.favMovies.getMovieDetails = function(movie){
 				$scope.fetchMovie(movie);
 			};
 			if(!$scope.$$phase){
 				$scope.$apply();
 			}
 			$timeout(function(){
 				$('#favs').find('.AddFav').addClass('hide');
 			},500);
 		}
 	});
 	$scope.getMoviePath = function(poster_path){
 		if(poster_path!==null){
 			return "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+$scope.selectedMovie.poster_path;
 		}
 		else{
 			return "images/filmreel.png";
 		}
 	};
 	$scope.fetchMovie = function(movie){
 		Movies.getMovieData(TMDBKey, movie.id).then(function(result) {
 			$scope.selectedMovie = result;
 			Movies.getMovieCast(TMDBKey, movie.id).then(function(resp) {
 				$scope.selectedMovie.cast = resp.cast;
 				$scope.selectedMovie.release_date = moment($scope.selectedMovie.release_date).format("MMM Do YYYY");
 				$('#movieModal').modal('show');
 			}).catch(function(reason) {
 				console.log(reason);
 			});
 		}).catch(function(reason) {
 			console.log(reason);
 		});
 	};
 	$rootScope.logout = function() {
    localStorage.removeItem('currentUser');
    $location.path('/');
  };
 }]);