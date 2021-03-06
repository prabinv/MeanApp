angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', ['mvToastr', function(mvToastr) {
	return {
        notify: function(msg) {
            mvToastr.success(msg);
            console.log('msg ' , msg);
        },
		error: function(errorMsg) {
			mvToastr.error(errorMsg);
			console.log('error ' , errorMsg);
		}
	};
}]);