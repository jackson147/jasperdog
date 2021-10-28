const fs = require('fs')
const allUrls = fs.readFileSync("./urls.txt").toString('utf8');
const urlsArray = allUrls.split("\n");
const config = require('./config.json')

var Minio = require('minio')
var minioClient = new Minio.Client(config.minio);

let imageArray = []

const refreshImages = function(){
    console.log("REFRESHING IMAGE CACHE")
    var stream = minioClient.listObjectsV2('images','', true,'')
    stream.on('data', function (obj) {
        let fileName = obj.name;
        if (fileName.endsWith(".jpg")) {
            if(!imageArray.includes(fileName)){
                imageArray.push(fileName);
            }
        }
    })
}

const getRandomImageUrl = function(stripMedium){
    var stream = minioClient.listObjectsV2('images','', true,'')
    stream.on('data', function (obj) {
        let fileName = obj.name;
        if (fileName.endsWith(".jpg")) {
            imageArray.push(fileName);
        }
    })
    stream.on('error', function(err) { console.log(err) } )

    let url = imageArray[Math.floor(Math.random() * imageArray.length)];
    return url;
}

module.exports = {
    'getRandomImageUrl': getRandomImageUrl,
    'refreshImages' : refreshImages
}