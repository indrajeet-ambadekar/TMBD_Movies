'use strict';

/**
 * @ngdoc overview
 * @name moviesApp
 * @description
 * # moviesApp
 *
 * Main module of the application.
 */
var moviesApp = angular
  .module('moviesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'react',
    'flux',
    'ngToast'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/movies', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/watchLater', {
        templateUrl: 'views/favourites.html',
        controller: 'FavouritesCtrl',
        controllerAs: 'favourites'
      })
      .when('/filtered', {
        templateUrl: 'views/filtered.html',
        controller: 'FilteredCtrl',
        controllerAs: 'filtered'
      })
      .otherwise({
        redirectTo: '/'
      });
  });