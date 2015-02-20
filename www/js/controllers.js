angular.module('starter.controllers', [])

.controller('MapCtrl', ['$scope', '$ionicLoading', 'locationService', 'MoodItem', '$mood', '$timeout', '$window', '$rootScope',
                        function($scope, $ionicLoading, locationService, MoodItem, $mood, $timeout, $window, $rootScope) {
	
	$scope.myLocation;
	$scope.mapCreated = function(map) {
		$scope.map = map;
		$scope.centerOnMe();
	};
	
	MoodItem.getHoursAgo(24).success(function(data) {
		$scope.moodItems = data.results;
		$scope.drawMoods();
	});

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
			google.maps.event.addListener($scope.myLocation, 'dragend', function (event) {
			    locationService.addLocation(this.getPosition());
			});
			locationService.addLocation($scope.myLocation.position);
			$ionicLoading.hide();
		}, function (error) {
			$ionicLoading.hide();
			alert('Unable to get location: ' + error.message);
		}, {timeout: 10000});
	};
	
	$scope.drawMoods = function() {
		for (var i = 0; i < $scope.moodItems.length; i++) {
			var item = $scope.moodItems[i];  
			var mood = $mood.getMood(item.mood);
			var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(item.location.latitude, item.location.longitude),
				  map: $scope.map,
				  title: mood.label,
				  icon: {
				      path: google.maps.SymbolPath.CIRCLE,
				      fillColor: mood.color,
				      fillOpacity: 1.0,
				      strokeColor: mood.color,
				      scale: 3
				    }
			  });

      google.maps.event.addListener(marker, 'click', (function(_mood) {
        return function() {
          $scope.$apply(function() {
            $scope.clickedMood = _mood;
            $timeout(function() {
              $scope.clickedMood = null;
            }, 3000);
          });
        }
      })(mood));
		}
	};
	
	$scope.reload = function() {
		$window.location.reload(true);
	}
	
	$rootScope.$on('moodItem:listChanged', function() {
	    $scope.updateMoodItems();
	})
	
	$scope.updateMoodItems = function() {
		MoodItem.getHoursAgo(24).success(function(data) {
			$scope.moodItems = data.results;
			$scope.drawMoods();
		});
	}
	
}])

.controller('MoodSliderCtrl', ['$scope', '$uuid', 'MoodItem', '$mood', 'locationService', '$state',
                               function($scope, $uuid, MoodItem, $mood, locationService, $state) {  
	$scope.currentIndex = 0;
	$scope.moodItem = {};
	$scope.moods = $mood.getMoods();

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
		}).success(function(data) {
			$scope.$emit('moodItem:listChanged');
			$state.go('index', {}, {reload: true});
		});
	};

}])

.controller('HistoryCtrl', ['$scope', '$window', '$uuid', '$mood', 'MoodItem', function($scope, $window, $uuid, $mood, MoodItem) {
	$scope.moods = {};
	$scope.times = {}
	MoodItem.getPastMoods($uuid.getUUID()).success(function(data) {
		$scope.pastMoods = data.results;
		for (var k = 0; k < $scope.pastMoods.length; k++) {
			$scope.moods[$scope.pastMoods[k].mood] = $mood.getMood($scope.pastMoods[k].mood);
			$scope.times[$scope.pastMoods[k].objectId] = new Date($scope.pastMoods[k].createdAt);
		}
	});
	
	$scope.mapCreated = function(map, location, moodId) {
		$scope.map = map;
		$scope.map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
		new google.maps.Marker({
			position: new google.maps.LatLng(location.latitude, location.longitude),
			map: $scope.map,
			title: $mood.getMood(moodId).label
		});
	};
	
	$scope.reload = function() {
		$window.location.reload(true);
	}
	
}]);
