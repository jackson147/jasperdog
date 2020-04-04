const version = require('./package.json').version
const host = require('./package.json').host

module.exports = function(app, filenames){
    app.get('/version', (req, res) => {
        res.json({'version' : version})
    });

    app.post('/', (req, res) => {
        var filename = filenames[Math.floor(Math.random() * filenames.length)];
        res.send(host + "/jasper/" + filename);
    });
}
