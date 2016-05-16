var Pastee = require('pastee');
var paste = new Pastee();

function pasteContent(content, callback) {
    // Submit a normal paste
    paste.paste(content, function(err, res) {
        // res is a json object with "id", "link", "raw", "download" (and "key" for encrypted)
        callback(res.link);
    });
}

module.exports = {
	pasteContent: pasteContent
}