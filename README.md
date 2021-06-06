# JasperDog Discord/Slack bot

NodeJS API that returns a random imgur link of Jasper the dog. 
Hooks up with discord and slack to be used as a bot.

### Note
Setting this up is a pain in the ass, you're going to need bots setup in discord and slack with the secrets listed below.
I host this app in a single node swarm so I can make use of docker secrets.
Really it is much easier to simply contribute to this repository by:

1. Submit a PR to develop
2. Merge yourself (or ask me)
3. A jenkins pipeline will pickup your change and deploy a new dev instance.
4. We will test in the discord dev server.

### New - Dev mode
1. Run `npm run-script dev-start`
2. Browse to `localhost:8080/<INPUT>` - Your input can be any string to test the service class. For example `localhost:8080/jasper` will return an image url.
3. Test your changes here as you work on them. Try and keep you changes to the `jasperdog-discord-dev.js` file. 

#### Docker swarm secrets:
* slack-signing-secret
* slack-client-id
* slack-client-secret
* discord-secret