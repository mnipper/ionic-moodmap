angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'ionic.utils'])

.run(function($ionicPlatform, $uuid) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $uuid.getUUID();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'MapCtrl'
  })

  .state('mood', {
    url: '/mood',
    templateUrl: 'templates/mood.html',
    controller: 'MoodSliderCtrl'
  });

  $urlRouterProvider.otherwise('/');
});
