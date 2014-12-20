module.exports = function(docs,cb) {
    var ret = [];
    if (docs) {
        docs.forEach(function(doc) {
        		console.log(doc);
        		if(doc.news_desk){
        			if(doc.news_desk.length != 'None') ret.push(doc.news_desk);
        		}
            if (doc.multimedia.length > 0) {
                doc.multimedia.forEach(function(media) {
                	if(media.type === 'image' && media.subtype === "xlarge"){
                    ret.push(media);
                	}
                })
            }
            if (doc.keywords.length > 0) {
                doc.keywords.forEach(function(keyword) {
                    ret.push(keyword);
                })
            }
        })
        console.log(ret);
        cb(ret);
    }
}
