const fs = require('fs')
const allUrls = fs.readFileSync("./urls.txt").toString('utf8');
const urlsArray = allUrls.split("\n");

module.exports.getRandomImageUrl = function(stripMedium){
    let url = urlsArray[Math.floor(Math.random() * urlsArray.length)];
    if(stripMedium){
        url = url.replace("m.jpg", ".jpg");
    }
    return url;
}