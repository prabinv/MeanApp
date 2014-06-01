angular.module('app').factory('mvIdentity', ['$window', 'mvUser', function ($window, mvUser) {
	var currentUser;
	if(!!$window.bootstrappedUserObject) {
		var user = new mvUser();
		angular.extend(user, $window.bootstrappedUserObject);
		currentUser = user;
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		}
	};
}]);