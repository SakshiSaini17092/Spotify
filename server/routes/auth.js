var express = require("express");
var router = express.Router();


var request = require('request'); // "Request" library

var client_id = '9b93fdb97a274366bf4f032f0b724082'; // Your client id
var client_secret = '9fb1ebefad3a446eaaffd31a9cf4daa5'; // Your secret

var token = ""

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;
    token = 'Bearer ' + token
  }
});


router.get("/", function(req, res, next) {

  res.send(token)  

});

module.exports = router;
