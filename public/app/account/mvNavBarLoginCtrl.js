angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', 'mvNotifier', 'mvIdentity', 'mvAuth',
	function ($scope, mvNotifier, mvIdentity, mvAuth) {
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password) {
		mvAuth.authenticateUser(username, password).then(function(success) {
			if (success) {
				mvNotifier.notify('You have successfully signed in!');
			} else {
				mvNotifier.notify('Username/Password combination incorrect');
			}
		});
	};
}]);