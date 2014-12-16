'use strict';

var _ = require('lodash');
var Twit = require('twit');
var config = require('../../config/environment/index.js');
var http = require('http');

var news = require('./news.model.js');
var newsify = require('./newsify.js');
var subliminal = require('./subliminal.js');

var T = new Twit(config.twit);
var stream = T.stream('statuses/sample');

var call = true;
var postTweet = true;
var requestNews = true;

var new_tweet = function(text) {
    postTweet = false;
    T.post('statuses/update', {
        status: text
    }, function(err, data, response) {
        if (err) console.log(err);

        setTimeout(function() {
            postTweet = true;
        }, 7200000);
    })
}

var constructNews = function(data, keyword, limit, callback) {
    var arr = [];
    var arr = [];
    data.forEach(function(doc, i) {
        var headline = doc.headline.print_headline ? doc.headline.print_headline : doc.headline.main
        var headlines;
        console.log(headline);
        if (headline) {
            if (headline.match(/\w+/g)) {
                headlines = headline.match(/\w+/g).join(' ');
                newsify(headlines, keyword, limit, function(headline) {
                    callback(headline);
                })
            }
        }

    })
}

var getJSON = function(options, cb) {
    console.log('getting json');
    call = false;
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res) {
        var output = '';
        var obj;
        res.on('data', function(chunk) {
            output += chunk;
        });
        res.on('end', function() {
            try {
                JSON.parse(output);
            } catch (e) {
                console.log(e);
                cb(null);
                req.end()
            }
            console.log('on end');
            obj = JSON.parse(output);
            if (obj.response) {
                if (obj.response.docs.length === 0) {
                    req.end();
                } else {
                    cb(obj.response.docs);
                }
            } else {
                req.end();
            }
        });
    });
    setTimeout(function() {
        call = true;
    }, 16000)
    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });
    req.end();
}

var buildQuery = function(y, m, d, k, p, callback) {
    //getYear being weird
    //var year = y ? y : 2014;
    var year = 2014;
    var day = d ? d : Math.floor(Math.random() * 29) + 1;
    var month = m ? m : Math.floor(Math.random() * 13) + 1;
    var urlKeyword = '';
    var keyword;
    if (k) {
        urlKeyword = k ? 'q=' + k[Math.floor(Math.random() * k.length)] + '&' : '';
        keyword = k[Math.floor(Math.random() * k.length)];
    }
    console.log(k);
    console.log(urlKeyword);

    var page = p ? p : 0;

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    var options = {
        host: 'api.nytimes.com',
        path: '/svc/search/v2/articlesearch.json?' + urlKeyword + 'sort=newest&end_date=' + year + '' + month + '' + day + '&page=' + page + '&api-key=' + config.nyt,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    callback(options, keyword);
}

stream.on('tweet', function(tweet) {
    if (tweet.lang == 'en' && call === true) {
        var date = new Date(tweet.created_at);
        var year = date.getFullYear(),
            day = date.getDate(),
            month = date.getMonth() + 1,
            keywords;

        //Interpret some string
        var valids = tweet.text.match(/([0-9]+|[a-zA-Z]+)/g);
        var texts = [];
        if (valids && valids.length) {
            valids.forEach(function(valid) {
                if (!parseInt(valid)) {
                    texts.push(valid);
                }
            })
            if (texts.length > 0) keywords = texts;
        }

        buildQuery(year, month, day, keywords, 0, function(options, keyword) {
            if (requestNews === true) {
                requestNews = false;
                setTimeout(function() {
                    requestNews = true
                }, 12000)
                getJSON(options, function(data) {
                    if (data) {
                        constructNews(data, keyword, false, function(headline) {
                            console.log(headline);
                            if (news.trigger) news.trigger('speak_news', headline);
                            if (postTweet === true) {
                                new_tweet(headline);
                            }
                        });
                    }
                });
            }
        });
    }
});

// Creates a new tweet
var create = function(req, res) {
    var date = new Date(req.body.date),
        keyword;
    keyword = req.body.keyword.split(' ');
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    console.log('creating');
    buildQuery(y, m, d, keyword, 0, function(options, keyword) {
        getJSON(options, function(data) {
            if (data) {
                constructNews(data, keyword, null, function(headline) {
                    res.json({
                        headline: headline
                    });
                });
            }
        });
    });
};

// Get list of things
exports.index = function(req, res) {
    return res.json(200);
};

exports.firehose = function(req, res) {
    var date = new Date(req.body.date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    var key = req.body.keyword.split(' ');

    buildQuery(y, m, d, key, 0, function(options, keyword) {
        if (requestNews === true) {
            requestNews = false;
            setTimeout(function() {
                requestNews = true
            }, 15000)
            getJSON(options, function(data) {
              console.log('data before subliminalizing', data);
                if (data) {
                    subliminal(data, function(subs) {
                        // console.log('data for data set', subs);
                        res.json(subs);
                    })
                }
            });
        }
    });
}

exports.create = create;

function handleError(res, err) {
    return res.send(500, err);
}
