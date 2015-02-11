angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, locationService) {
	$scope.myLocation;
	$scope.mapCreated = function(map) {
		$scope.map = map;
		$scope.centerOnMe();
	};

	$scope.centerOnMe = function () {		
		if (!$scope.map) {
			return;
		}

		$scope.loading = $ionicLoading.show({
			showBackdrop: false,
		});

		navigator.geolocation.getCurrentPosition(function (pos) {
			$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			$scope.myLocation = new google.maps.Marker({
				position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
				map: $scope.map,
				draggable:true,
				title: "My Current Location"
			});  
			google.maps.event.addListener($scope.myLocation, 'click', function (event) {
			    locationService.addLocation(this.getPosition());
			});
			locationService.addLocation($scope.myLocation.position);
			$ionicLoading.hide();
		}, function (error) {
			alert('Unable to get location: ' + error.message);
		});
	};
})

.controller('MoodSliderCtrl', ['$scope', '$uuid', '$ionicSlideBoxDelegate', 'MoodItem', 'Mood', 'locationService', 
                               function($scope, $uuid, $ionicSlideBoxDelegate, MoodItem, Mood, locationService) {  
	$scope.currentIndex = 0;
	$scope.moodItem = {};

	Mood.getAll().success(function(data) {
		$scope.moods = data.results;
		$ionicSlideBoxDelegate.$getByHandle('mood-display').update();
	});

	$scope.slideHasChanged = function(index) {
		$scope.currentIndex = index;
	};

	$scope.selectMood = function() {
		var selectedMood = $scope.moods[$scope.currentIndex];
		var myLocation = locationService.getLocation();
		if (!myLocation) { //if undefined set it to some point in the Atlantic Ocean
			myLocation = new google.maps.LatLng(0,0);
		}
		MoodItem.create({ 
			uuid: $uuid.getUUID(), 
			mood: selectedMood.objectId, 
			location: { __type: 'GeoPoint', 
				latitude: myLocation.lat(), 
				longitude: myLocation.lng() 
			}
		});
	};

}]);
