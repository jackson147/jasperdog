const version = require('./package.json').version

module.exports = function(app, urls){
    app.get('/version', (req, res) => {
        res.json({'version' : version})
    });

    app.post('/', (req, res) => {
        var url = urls[Math.floor(Math.random() * urls.length)];
	jsonResponse = {
	    "response_type": "in_channel",
	    "text": url
	}
        res.json(jsonResponse);
    });
}
