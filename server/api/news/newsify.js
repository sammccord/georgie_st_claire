var markov = require('markov');

var m = markov(1);

function newsify (headlines,keyword,limit,callback) {
	m.seed(headlines,function(){
		var ret = [];
		var headline = m.respond(keyword?keyword:'');
		headline.forEach(function(word){
			if(limit) {
				if(ret.join(' ').length + word.length <= 140){
					ret.push(word);
				}
			}
			else{
				ret.push(word);
			}

		});
		callback(ret.join(' '));
	});
}

module.exports = newsify;