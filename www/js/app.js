angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'ionic.utils'])

.run(function($ionicPlatform, $uuid) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $uuid.getUUID();
  });
})
