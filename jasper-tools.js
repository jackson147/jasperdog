const fs = require('fs')
const allUrls = fs.readFileSync("./urls.txt").toString('utf8');
const urlsArray = allUrls.split("\n");
const config = require('./config.json')

var Minio = require('minio')

var minioConfig = config.minio

//Try and load the secret if present
try{
    let minioSecretKey = fs.readFileSync("/run/secrets/minio-secret").toString('utf8').trim();
    minioConfig['accessKey'] = minioSecretKey
}catch(e){
    console.warn("Can't load secret, you must have the minio key set in the config file built into this image.")
}

//Init minio connection
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