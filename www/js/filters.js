angular.module('starter.filters', [])

.filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow();
    };
  });