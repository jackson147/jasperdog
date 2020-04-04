const express = require('express')
const app = express()
const port =  8080
const cors = require('cors');
const bodyParser = require('body-parser')
const Minio = require('minio')
 
var minioClient = new Minio.Client({
    endPoint: 'minio.newlinkedlist.xyz',
    port: 443,
    useSSL: true,
    accessKey: 'jackson147',
    secretKey: 'jklsadhoahjsd7876*^&(*^alskdjahsd675^£^0)8*&^*&&0jasiudh'
});

// Get all of the jasper image urls.
var objectsStream = minioClient.listObjects('jasper', '', true)

function streamToString (stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => {
            // console.log(chunk.name);
            chunks.push(chunk.name);
        })
        stream.on('error', reject)
        stream.on('end', () => resolve(chunks))
    })
}

streamToString(objectsStream)
    .then(function(filenames){
        // use it before all route definitions
        app.use(cors({origin: '*'}));
        app.use(bodyParser.json())

        require('./routes.js')(app, filenames);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    })


