'use strict';

var hooks = {}

module.exports = {

	on: function(eventName,fn) {
		console.log(fn);
		if(hooks[eventName]) {
			hooks[eventName].push(fn)
		} else {
			hooks[eventName] = [fn]
		}
		console.log(hooks);
	},

	trigger: function(eventName, data) {
		console.log('triggering');
		console.log(hooks[eventName])
		hooks[eventName].forEach(function(fn) {
			fn(data);
		})
	}

}