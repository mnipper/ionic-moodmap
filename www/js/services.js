angular.module('starter.services', [])

.factory('MoodItem', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {
	return {
		getAll:function() {
			return $http.get('https://api.parse.com/1/classes/MoodItem',{
				headers:{
					'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
					'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
				}
			});
		},
		create: function(data) {
			return $http.post('https://api.parse.com/1/classes/MoodItem',data,{
				headers:{
					'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
					'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
					'Content-Type':'application/json'
				}
			});
		},
		getHoursAgo: function(hours) {
			var cutoffTime = new Date();
			cutoffTime.setHours(cutoffTime.getHours() - hours);
			return $http.get('https://api.parse.com/1/classes/MoodItem',{
				headers:{
					'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
					'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
				},
				params: {
					where:{'createdAt': {'$gt': cutoffTime}}
				}
			});
		},
		getPastMoods: function(uuid) {
			return $http.get('https://api.parse.com/1/classes/MoodItem', {
				headers: {
					'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
					'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
				}, 
				params: {
					where: {'uuid': uuid},
					order: '-createdAt'
				}
			});
		}
	}	
}])

.factory('Mood', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {
	return {
		getAll:function() {
			return $http.get('https://api.parse.com/1/classes/Mood', {
				headers: {
					'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
					'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
				}
			});
		}
	}
}])

.service('locationService', function() {
	var myLocation;
	var addLocation = function(newLocation) {
		myLocation = newLocation;
	}
	var getLocation = function(){
		return myLocation;
	}
	return {
		addLocation: addLocation,
		getLocation: getLocation
	};
})

.value('PARSE_CREDENTIALS', {
	APP_ID: '4rrfwKEXMVFOGdbyNDVbzfcgh8GJkIaowFqHwwgT',
	REST_API_KEY:'IAH8wQeusMStVE7L3SeAMGoCI9RId1HNoDBSNIib'
});
