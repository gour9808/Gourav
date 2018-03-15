// set server port. SERVER_PORT varibale will come from Dockerfile
var port = process.env.SERVER_PORT;
if (!port) {
    port = 3000;
}
// set internal communication url
global.internalURL = "http://localhost:" + port;

var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var router = express.Router(express);
app.use("/ezdx-patient-ui", router);

router.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(port, function() {
    console.log("server on " + port);
});