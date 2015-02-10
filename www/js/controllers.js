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

.controller('MoodSliderCtrl', ['$scope', '$uuid', 'MoodItem', 'Mood', function($scope, $uuid, MoodItem, Mood) {  
  $scope.currentIndex = 0;
  $scope.moodItem = {};
  
  Mood.getAll().success(function(data) {
	  $scope.moods = data.results;
  });
  
  $scope.slideHasChanged = function(index) {
    $scope.currentIndex = index;
  };

  $scope.selectMood = function() {
	  var selectedMood = $scope.moods[$scope.currentIndex];
    //TODO Get GeoPoint latitude & longitude from map
    MoodItem.create({ 
			uuid: $uuid.getUUID(), 
			mood: selectedMood.objectId, 
			location: { __type: 'GeoPoint', latitude: 0, longitude: 0 }
		});
  };
  
}]);
