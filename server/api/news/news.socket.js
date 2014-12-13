/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var news = require('./news.model.js');

exports.register = function(socket) {

	news.on('new_news',function(data){
		emit_news(socket,data);
	})

}

function emit_news(socket, data, cb) {
  socket.emit('new_news', data);
}