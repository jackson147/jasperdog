const express = require('express')
const app = express()
const port =  8080
const bodyParser = require('body-parser')
const jaspertools = require('./jasper-tools')

// use it before all route definitions
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Init the image cache
jaspertools.refreshImages()
//Setup a loop to ensure images are refreshed
setInterval(function() {
  jaspertools.refreshImages()
}, 30000);

//Support whatever we can in DEV mode.
if (process.env.NODE_ENV !== 'production') {
  require('./discord/jasperdog-discord-dev')(app);
}else{
  require('./slack/jasperdog-slack')(app);
  require("./discord/jasperdog-discord")();
}

app.listen(port, () => console.log(`JasperDog is listening on port ${port}!`))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something went wrong. Jasper is sad dog...')
})

