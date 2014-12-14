/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var news = require('./news.model.js');

exports.register = function(socket) {

	news.on('speak_news',function(data){
		speak_news(socket,data);
	})

}

function speak_news(socket, data, cb) {
  socket.emit('speak_news', data);
}