angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'ionic.utils'])

.run(function($ionicPlatform, $uuid, $mood) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $uuid.getUUID();
    $mood.fetchMoods();
  });
}).config(function($stateProvider, $urlRouterProvider) {
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
