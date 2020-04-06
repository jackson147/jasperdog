# JasperDog Slack bot

NodeJS API that returns a random imgur link of Jasper the dog. 
Hooks up with slack to be used as a slash command.

## Getting Started

`./build-deploy-log.sh`

### Prerequisites

#### Following installed:
* docker-ce
* docker-compose
 
#### Server setup:
* Your node as a docker swarm (you don't need multiple servers).

#### Docker swarm secrets:
* slack-signing-secret
* slack-client-id
* slack-client-secret

#### Docker swarm overlay network:
* web

## Notes
I've left the labels in that work with traefik, you'll need to edit them to work with your deployment. If you're not using traefik the labels should just be ignored.
