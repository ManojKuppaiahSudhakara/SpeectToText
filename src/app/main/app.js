/**
*
* This is the Angularjs Application file.
* We are initiating routing, modules & load extenal configurations files.
* Date : November 12th, 2017
* Author : Manoj Kuppaiah Sudhakara (sudhakara.sailoint@gmail.com/ksr.manoj@gmail.com)
*
**/

'use strict';

var STTApp = angular.module('STTApp', [
		'FileUpload'
]);

STTApp.config(function ($stateProvider, $urlRouterProvider, uibDatepickerConfig) {

	//Disabled Date Picker Weeks column
	uibDatepickerConfig.showWeeks = false;
	$stateProvider

	.state('main', {
		url: '/',
		abstract: true,
		views: {
			menus: {
				},
			'header@': {
				controller: 'authenticationCtrl'
			},
		},
	})
	.state('main.fileupload', {
		url: 'main/fileupload',
		data: {
			roles: []
		},
		views: {
			'main@': {
				templateUrl: 'app/modules/dashboard/fileupload.html',
				controller: 'mainController'
			},
		},
		params: {
	    
	  }
	})
	
	.state('login', {
		url: '/login',
		data: {
			roles: []
		},
		views: {
			'header': {
				templateUrl: 'app/common/header.html'
			},
			'login': {
				templateUrl: 'app/modules/auth/login.view.html',
				controller: 'authenticationCtrl'
			}
		},
	})
	.state('register', {
		url: '/register',
		data: {
			roles: []
		},
		views: {
			'header': {
				templateUrl: 'app/common/header.html'
			},
			'login': {
				templateUrl: 'app/modules/auth/register.view.html',
				controller: 'authenticationCtrl',
			}
		},
	});
	//Re-directs
	$urlRouterProvider.otherwise(function ($injector, $location) {
		var $state = $injector.get('$state');
		$state.go('login');
	});

});

/**
* The run phase of the "STTApp" could be useful for any initialization procedure.
**/
STTApp.run(function ($log, $http, $rootScope, $state, $urlRouter, $location, $window) { // Inject Service to load data
	$log.debug('STTApp.run');
	$rootScope.$state = $state;

	$rootScope.$on('$stateChangeSuccess', function (event, next) {
		
			$state.go('login');
		});
});

STT.factory('httpRequestInterceptor', ['$rootScope', function ($rootScope) {
	return {
		request: function ($config) {
			var token = window.localStorage.getItem('auth_token');
			$config.headers['Authorization'] = token;
			return $config;
		}
	};
}]);

STTApp.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
}]);

STTApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

$.get('/config', function (data) {
	STTApp.constant('CONFIG', data);
	angular.bootstrap(document, ['STTApp']);
})
