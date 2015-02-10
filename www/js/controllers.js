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

.controller('MoodSliderCtrl', ['$scope', '$uuid', 'MoodItem', function($scope, $uuid, MoodItem) {  
  $scope.currentIndex = 0;
  $scope.moods = [
    {
      color: 'blue', 
      label: 'CALM'
    },
    {
      color: 'turquoise',
      label: 'ANXIOUS'
    },
    {
      color: 'pink',
      label: 'HAPPY'
    }
  ];
  $scope.moodItem = {};

  $scope.slideHasChanged = function(index) {
    $scope.currentIndex = index;
  };

  $scope.selectMood = function() {
    //TODO Get GeoPoint latitude & longitude from map
    MoodItem.create({ 
			uuid: $uuid.getUUID(), 
			mood: $scope.moods[$scope.currentIndex].label, 
			location: { __type: 'GeoPoint', latitude: 0, longitude: 0 }
		});
  };
  
}]);
