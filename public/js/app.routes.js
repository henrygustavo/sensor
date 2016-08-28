angular.module('applicationModule.routes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/pages/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })

            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
  ;
