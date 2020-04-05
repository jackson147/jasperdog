const version = require('./package.json').version;
const auth = require('./auth');

module.exports = function(app, urls, slackSigningSecret){
    app.get('/version', (req, res) => {
        res.json({'version' : version})
    });

    app.post('/', (req, res) => {
	jsonResponse = {};
        if(auth(req, slackSigningSecret)){
	
          let url = urls[Math.floor(Math.random() * urls.length)];
          jsonResponse = {
	      "response_type": "in_channel",
	      "text": url
          }
	} else {
	  jsonResponse = {
           "response_type": "ephemeral",
           "text": "You are trying to use this bot outside of slack... Jasper is disappointed in you..."
          }
	}
        res.json(jsonResponse);
    });
}
