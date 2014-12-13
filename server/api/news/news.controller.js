'use strict';

var _ = require('lodash');
var Twit = require('twit');
var config = require('../../config/environment');
var http = require('http');

var news = require('./news.model.js');
var newsify = require('../../../node_modules/newsify');
var subliminal = require('../../../node_modules/subliminal');

var T = new Twit(config.twit);
var stream = T.stream('statuses/sample');

var call = true;
var postTweet = true;

var tweet = function (text){
	postTweet = false;
	console.log(text);
		T.post('statuses/update', { status:text}, function(err, data, response) {
		console.log('constructing tweet');
	  if(err) console.log(err);
	  console.log(data);
	  news.trigger('speak_news',text);

	  setTimeout(function(){
	  	postTweet = true;
	  },30000)
	})
}

var constructNews = function(data,keyword,callback){
	var arr = [];
	data.forEach(function(doc,i){
		console.log(i)
		console.log(JSON.parse(doc));
		console.log(doc);
		var headline = doc.headline.print_headline? doc.headline.print_headline : doc.headline.main
			var headlines = headline.match(/\w+/g).join(' ');
			newsify(headlines,keyword,function(headline){
				callback(headline);
			})
	});
}

var getJSON = function(options, cb)
{
		console.log('getting json');
		call = false;
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        res.on('data', function (chunk) {
            output += chunk;
        });
        res.on('end', function() {
            var obj = JSON.parse(output);
            console.log('on end');
            console.log(obj);
            if(obj.response.docs.length === 0){
            	req.end();
            }
            else{
            	cb(obj.response.docs);
            }
        });
    });
    setTimeout(function(){
    	call = true;
    },5000)
    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });
    req.end();
};

var buildQuery = function(y,m,d,k,p,callback) {
		//getYear being weird
    //var year = y ? y : 2014;
    var year = 2014;
    var day = d ? d : Math.floor(Math.random() * 29)+1;
    var month = m ? m : Math.floor(Math.random() * 13)+1;
    var urlKeyword = k ? 'q=' + k[Math.floor(Math.random()*k.length)] + '&' : '';
    var keyword = k[Math.floor(Math.random()*k.length)];
    var page = p ? p : 0;

    month = month<10?'0'+month:month;
    day = day<10?'0'+day:day;


    console.log('building query')
    console.log(month<10?'0'+month:month);
    var options = {
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?' + urlKeyword + 'sort=newest&begin_date='+year +month+day+'&page='+page+'&api-key=' + config.nyt,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log('keyword'+keyword);
    callback(options,keyword);
}

// stream.on('tweet', function(tweet) {
//     if(tweet.lang == 'en' && call === true){
//     	console.log(new Date(tweet.created_at).getMonth());
//     	var date = new Date(tweet.created_at);
//     	 var year =date.getYear(),
//     	 day = date.getDate(),
//     	 month = date.getMonth(), keywords;

//     //Interpret some string
//     var valids = tweet.text.match(/([0-9]+|[a-zA-Z]+)/g);
//     var texts = [];
//     if (valids && valids.length) {
//         valids.forEach(function(valid) {
//             if (!parseInt(valid)) {
//                 texts.push(valid);
//             }
//         })
//         if (texts.length > 0) keywords = texts;
//     }
//     console.log(keywords);

//     buildQuery(year,month,day,keywords,0,function(options,keyword) {
//     		getJSON(options, function(data) {
//             // constructNews(data,keyword,function(headline){
//             // 	//tweet(headline);
//             // 	// console.log(headline);
//             // });
//         });
//     });
//     }
// });

// Creates a new tweet
var create = function(req, res) {
  console.log(req.body);
};

// Get list of things
exports.index = function(req, res) {
    return res.json(200);
};

exports.create = create;

function handleError(res, err) {
    return res.send(500, err);
}
