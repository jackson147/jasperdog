const version = require('../package.json').version;
const auth = require('./slack-auth');
const fs = require('fs');
const request = require('request');
const jaspertools = require('../jasper-tools')

let clientId = fs.readFileSync("/run/secrets/slack-client-id").toString('utf8').trim();
let clientSecret = fs.readFileSync("/run/secrets/slack-client-secret").toString('utf8').trim();

module.exports = function(app, urls){
    app.get('/version', (req, res) => {
        res.json({'version' : version})
    });
    
    app.get('/auth', (req, res) =>{
        res.sendFile(__dirname + '/add_to_slack.html')
    });

    app.get('/auth/redirect', (req, res) =>{
        var options = { 
            uri: 'https://slack.com/api/oauth.v2.access?code='
                +req.query.code+
                '&client_id='+clientId+
                '&client_secret='+clientSecret,
            method: 'GET'
        }
        request(options, (error, response, body) => {
            var JSONresponse = JSON.parse(body)
            if (!JSONresponse.ok){
                console.log(JSONresponse)
                res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
            }else{
                console.log(JSONresponse)
                let team = JSONresponse.team.id;
                res.redirect('http://app.slack.com/client/' + team);
            }
        })
    })

    app.post('/', (req, res) => {
        jsonResponse = {};
        if(auth(req)){
            jsonResponse = {
                "response_type": "in_channel",
                "text": jaspertools.getRandomImageUrl(false)
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
