angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})

.controller('MoodSliderCtrl', function($scope, $uuid) {
  $scope.currentIndex = 0;

  $scope.slideHasChanged = function(index) {
    $scope.currentIndex = index;
  };

  $scope.selectMood = function() {
    //var uuid = $uuid.getUUID();    
    // Send UUID, current longitude, current latitude and $scope.currentIndex to server
  };
});
