const fs = require('fs')
const jaspertools = require('../jasper-tools')
const jasperService = require('./jasperdog-discord-service')

const Discord = require("discord.js")
const client = new Discord.Client()
let discordSecret = fs.readFileSync("/run/secrets/discord-secret").toString('utf8').trim();

module.exports = function(){
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    client.on("message", msg => {
        let messageContent = msg.content.toLowerCase()
        let image = jasperService.getImage(messageContent)
        if(image){
            msg.reply(image)
        }
    })
    client.login(discordSecret)
}