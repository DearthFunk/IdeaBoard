angular.module('globalFilters', [])

	.filter('acceptSCE', function($sce) {
		return function(item) {
			return $sce.trustAsHtml(item);
		};
	})

	.filter('toArray', function () {
		'use strict';
		return function (obj) {
			if (!(obj instanceof Object)) {
				return obj;
			}
			return Object.keys(obj).map(function (key) {
				return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
			});
		}
	});