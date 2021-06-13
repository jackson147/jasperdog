const jaspertools = require('../jasper-tools')

const getImage = function(messageContent){
    console.log(messageContent.match("/jasper/gm"));
    console.log(messageContent.regexp("/jasper/gm"));

    if (messageContent.match("/jasper/gm").length > 0) {
        if(messageContent.includes("carrot")){
            return "https://i2-prod.birminghammail.co.uk/incoming/article14143650.ece/ALTERNATES/s810/Jasper-face-crop.jpg"
        }else{
            // return jaspertools.getRandomImageUrl(true)
            let response;


            //To stop someone taking the piss
            const numOfJaspers = messageContent.match("/jasper/gm").length <= 5 ? messageContent.match("/jasper/gm").length : 5;

            for (let i = 0; i < numOfJaspers; i++) {
                response =+ " " + jaspertools.getRandomImageUrl(true);
            }
        }
    }
    return undefined
}

module.exports = {
    'getImage': getImage
}
