/**
 * gentle-watch
 * A tool to gently watch object properties, slowing down the browser as less as possible
 * @author Pavel Koryagin [pavel@koryagin.com]
 * @copyright Pavel Koryagin 2015
 * @link https://github.com/ExtPoint/gentle-watch
 * @licence MIT
 * @version 1.0
 */
var gentleWatch;
(function() {

	var o = [];
	var p = [];
	var v = [];
	var h = [];
	var interval = null;

	gentleWatch = function(object, property, handler) {

		// Remember
		o.push(object);
		p.push(property);
		v.push(object[property]);
		h.push(handler);

		// Require interval
		if (interval === null) {
			interval = setInterval(watcher, gentleWatch.poolInterval);
		}
	};

	gentleWatch.poolInterval = 300;

	gentleWatch.unwatch = function(handler) {

		// Forget
		var index;
		while (-1 != (index = h.indexOf(handler))) {
			o.splice(index, 1);
			p.splice(index, 1);
			v.splice(index, 1);
			h.splice(index, 1);
		}

		// Stop interval
		if (o.length === 0 && interval !== null) {
			clearInterval(interval);
			interval = null;
		}
	};

	function watcher() {
		// Cheapest check
		for (var i = 0; i < o.length; i++) {
			if (o[i][p[i]] !== v[i]) {

				// Expensive async call on real change
				setTimeout(h[i].bind(null, o[i][p[i]], o[i], p[i], v[i]), 0);
				v[i] = o[i][p[i]];
			}
		}
	}

})();
