const fs = require('fs')
const jaspertools = require('./jasper-tools')

const Discord = require("discord.js")
const client = new Discord.Client()
let discordSecret = fs.readFileSync("/run/secrets/discord-secret").toString('utf8').trim();

module.exports = function(){
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    client.on("message", msg => {
        let messageContent = msg.content.toLowerCase()
        if (messageContent.startsWith("jasper")) {
            if(messageContent.includes("carrot")){
                msg.reply("https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg")
            }else{
                msg.reply(jaspertools.getRandomImageUrl(true))
            }
        }
    })
    client.login(discordSecret)
}