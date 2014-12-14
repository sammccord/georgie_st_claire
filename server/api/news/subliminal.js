module.exports = function(docs,cb) {
    var ret = [];
    if (docs) {
        docs.forEach(function(doc) {
            ret.push(doc.news_desk)
            if (doc.multimedia.length > 0 && doc.multimedia.type === "image") {
                doc.multimedia.forEach(function(media) {
                    ret.push(media);
                })
            }
            if (doc.keywords.length > 0) {
                doc.keywords.forEach(function(keyword) {
                    ret.push(keyword);
                })
            }
        })
        cb(ret);
    }
}
