angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key];
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$uuid', ['$localstorage', function($localstorage) {
  var factory = {};

  factory.generateUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

  factory.getUUID = function() {
    if ($localstorage.get('device_uuid') === undefined) {
      $localstorage.set('device_uuid', factory.generateUUID());
    }

    return $localstorage.get('device_uuid');
  }

  return factory;
}])

.factory('$mood', ['$localstorage', 'Mood', function($localstorage, Mood) {	
	var factory = {};	
	
	factory.fetchMoods = function() {
		Mood.getAll().success(function(data) {
			$localstorage.set('moods', JSON.stringify(data.results));
			for (var i = 0; i < data.results.length; i++) {	//TODO refactor this
				var objectId = data.results[i].objectId;
				$localstorage.set(objectId, JSON.stringify(data.results[i]));
			}
		});
	}
	
	factory.getMood = function(moodId) {
		var mood = $localstorage.get(moodId);
		return JSON.parse(mood);
	}
	
	factory.getMoods = function() {
		var moods = $localstorage.get('moods');
		return JSON.parse(moods);
	}
	
	return factory;
}]);
