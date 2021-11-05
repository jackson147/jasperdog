const fs = require('fs')
const jasperService = require('./jasperdog-discord-service')

module.exports = function(app){
    app.get('/:message', (req, res) => {
       res.json({'response' : jasperService.getImage(req.params.message)})
    });
}