const crypto = require('crypto');
const qs = require('qs');
const fs = require('fs');

let slackSigningSecret = fs.readFileSync("/run/secrets/slack-signing-secret").toString('utf8').trim();

let authSlack = (req) => {
   let slackSignature = req.headers['x-slack-signature'];
   let requestBody = qs.stringify(req.body, {format : 'RFC1738'});
   let timestamp = req.headers['x-slack-request-timestamp'];
   let time = Math.floor(new Date().getTime()/1000);
   if (Math.abs(time - timestamp) > 300) {
      console.log("Bad timing for request");
      return false;
   }
   if (!slackSigningSecret) {
      console.log("No secret to check against");
      return false;
   }
   let sigBasestring = 'v0:' + timestamp + ':' + requestBody;
   let mySignature = 'v0=' + 
                  crypto.createHmac('sha256', slackSigningSecret)
                        .update(sigBasestring, 'utf8')
                        .digest('hex');
   return crypto.timingSafeEqual(
              Buffer.from(mySignature, 'utf8'),
              Buffer.from(slackSignature, 'utf8'))
}
module.exports = authSlack;
