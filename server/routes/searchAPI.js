// var express = require("express");
// var router = express.Router();


// var request = require('request'); // "Request" library

// var client_id = '9b93fdb97a274366bf4f032f0b724082'; // Your client id
// var client_secret = '9fb1ebefad3a446eaaffd31a9cf4daa5'; // Your secret


// router.get("/", function(req, res, next) {

//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//           'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//         },
//         form: {
//           grant_type: 'client_credentials'
//         },
//         json: true
//       };
      
//       request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
      
//           // use the access token to access the Spotify Web API
//           var token = body.access_token;
//           var options = {
              
//             url : 'https://api.spotify.com/v1/search?query=rock&offset=0&limit=20&type=track',
//             headers: {
//               'Authorization': 'Bearer ' + token
//             },
//             json: true
//           };
//           request.get(options, function(error, response, body) {

//             let li = []
//             const items = body["tracks"]["items"]
//             console.log(items)
//             items.forEach(element => {
//               li.push(element["name"])
//             });
            
//             // console.log(li)
//             res.send(li)
//           });
//         }
//       });

//     // res.send("API is working properly");
// });

// module.exports = router;
