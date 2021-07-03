const jaspertools = require('../jasper-tools')

const getImage = function(messageContent){
    let jaspers = messageContent.match(/jasper/gm);
    let urls = messageContent.match(/http/gm); //stop bot responding to itself

    if (jaspers !== null && jaspers.length > 0 && urls === null) {
        if(messageContent.includes("carrot")){
            return "https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg"
        }else{
            //To reduce potential api spam, limit to 5 per message
            let response = jaspers.length > 5 ? "Limiting to 5 to avoid cuteness overload" : " ";
            let numOfJaspersToReturn = jaspers.length <= 5 ? jaspers.length : 5;

            for (let i = 0; i < numOfJaspersToReturn; i++) {
                response += " " + jaspertools.getRandomImageUrl(true);
            }

            return response;
        }
    }
}

module.exports = {
    'getImage': getImage
}
