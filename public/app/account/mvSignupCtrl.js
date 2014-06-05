angular.module('app').controller('mvSignupCtrl', [
    '$scope',
    'mvAuth',
    'mvNotifier',
    '$location',
    function($scope, mvAuth, mvNotifier, $location) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstname,
            lastName: $scope.lastname
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        });
    };
}]);