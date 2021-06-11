const jaspertools = require('../jasper-tools')

const getImage = function(messageContent){
    if (messageContent.startsWith("jasper")) {
        if(messageContent.includes("carrot")){
            return "https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg"
        }else{
           return jaspertools.getRandomImageUrl(true)
        }
    }
    return undefined
}

module.exports = {
    'getImage': getImage
}