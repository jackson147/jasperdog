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
        if (msg.content.toLowerCase().startsWith("jasper")) {
            msg.reply(jaspertools.getRandomImageUrl(true))
        }else if(msg.content.toLocaleLowerCase().startsWith("@jasperdog")){
            msg.reply("Woof Woof!")
        }else if(msg.content.toLocaleLowerCase().startsWith("jasper carrot")){
            msg.reply("https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg")
        }
    })
    client.login(discordSecret)
}