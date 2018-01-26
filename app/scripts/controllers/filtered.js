'use strict';

/*
 * @ngdoc function
 * @name moviesApp.controller:FilteredCtrl
 * @description
 * # FilteredCtrl
 * Controller of the moviesApp
 */
 moviesApp.controller('FilteredCtrl', ['$scope', 'moviesService', 'TMDBKey', '$location', '$rootScope','ngToast', function($scope, Movies, TMDBKey, $location, $rootScope,ngToast) {
 	$rootScope.currentPage = "filtered";
 	if (!localStorage.currentUser) {
 		$location.path('/');
 	} else {
 		$rootScope.currentUser = JSON.parse(localStorage.currentUser);
 	}
 	$scope.params = $location.search().keyword;
 	var page = 1;
 	$scope.getMovies = function() {
 		Movies.getFilteredMovies(TMDBKey, $scope.params,page).then(function(result) {
 			$scope.moviesObj = result;
 			$scope.moviesObj.getMovieDetails = function(movie){
 				$scope.fetchMovie(movie);
 			};
 			$scope.moviesObj.addToFav = function(movie){
 				$scope.addToFav(movie);
 			};
 		}).catch(function(reason) {
 			console.log(reason);
 		});
 	};
 	$scope.getMovies();
 	$scope.fetchMoreMovies = function(){
 		$scope.requestSent = true;
 		if($scope.moviesObj){
 			page++;
 			Movies.getFilteredMovies(TMDBKey, $scope.params,page).then(function(result) {
 				Array.prototype.push.apply($scope.moviesObj.results, result.results);
 				$scope.moviesObj.page = result.page;
 				page = result.page;
 				$scope.requestSent = false;
 			}).catch(function(reason) {
 				console.log(reason);
 			});
 		}
 	};
 	$scope.fileLimitReached = false;
 	$scope.requestSent = false;

 	$('#filtered').bind('scroll', function(e) {
 		if (($(this).scrollTop() + $(this).innerHeight()) >= (0.95 * $(this)[0].scrollHeight)) {
 			if ($scope.fileLimitReached === false && $scope.requestSent === false) {
 				$scope.fetchMoreMovies();
 				if (!$scope.$$phase) {
 					$scope.$apply();
 				}
 			}
 			e.preventDefault();
 			e.stopPropagation();
 			return false;
 		}
 	});


 	$scope.getMoviePath = function(poster_path){
 		if(poster_path!==null){
 			return "https://image.tmdb.org/t/p/w300_and_h450_bestv2"+$scope.selectedMovie.poster_path;
 		}
 		else{
 			return "images/filmreel.png"
 		}
 	};

 	$scope.fetchMovie = function(movie){
 		Movies.getMovieData(TMDBKey, movie.id).then(function(result) {
 			$scope.selectedMovie = result;
 			Movies.getMovieCast(TMDBKey, movie.id).then(function(resp) {
 				$scope.selectedMovie.cast = resp.cast;
 				$scope.selectedMovie.release_date = moment($scope.selectedMovie.release_date).format("MMM Do YYYY");
 				console.log($scope.selectedMovie);
 				$('#movieModal').modal('show');
 			}).catch(function(reason) {
 				console.log(reason);
 			});
 		}).catch(function(reason) {
 			console.log(reason);
 		});
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
 	$rootScope.logout = function() {
 		localStorage.removeItem('currentUser');
 		$location.path('/');
 	};
 }]);