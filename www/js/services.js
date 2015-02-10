angular.module('starter.services', []).factory('MoodItem', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS) {
	return {
		getAll:function() {
            return $http.get('https://api.parse.com/1/classes/MoodItem',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create:function(data) {
            return $http.post('https://api.parse.com/1/classes/MoodItem',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
	}	
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '4rrfwKEXMVFOGdbyNDVbzfcgh8GJkIaowFqHwwgT',
    REST_API_KEY:'IAH8wQeusMStVE7L3SeAMGoCI9RId1HNoDBSNIib'
});