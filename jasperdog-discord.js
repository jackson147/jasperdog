const fs = require('fs');
const jaspertools = require('./jasper-tools');

const Discord = require("discord.js");
const client = new Discord.Client();
let discordSecret = fs.readFileSync("/run/secrets/discord-secret").toString('utf8').trim();

module.exports = function(){
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    })
    client.on("message", msg => {
        let messageContent = msg.content.toLowerCase()
        if (messageContent.match("jasper").length > 0) {
            if(messageContent.includes("carrot")){
                msg.reply("https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg")
            }else{
                //To stop someone taking the piss
                const numOfJaspers = messageContent.match("/jasper/gm").length <= 5 ? messageContent.match("jasper").length : 5;

                for (let i = 0; i < numOfJaspers; i++) {
                    msg.reply(jaspertools.getRandomImageUrl(true))
                }
            }
        }
    });
    client.login(discordSecret)
};
