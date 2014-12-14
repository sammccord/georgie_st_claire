'use strict';

var hooks = {}

module.exports = {

	on: function(eventName,fn) {
		if(hooks[eventName]) {
			hooks[eventName].push(fn)
		} else {
			hooks[eventName] = [fn]
		}
	},

	trigger: function(eventName, data) {
		console.log('triggering');
		console.log(hooks[eventName])
		if(hooks[eventName]){
			hooks[eventName].forEach(function(fn) {
				fn(data);
			});
		}
		else{
			console.log('no hook')
		}
	}

}