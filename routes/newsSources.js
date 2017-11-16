var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

router.get('/', function(req, res, next) {

    request('https://newsapi.org/v1/sources?&apiKey=d8e2c7eb2cc4491fa50547eb54c1aa61', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        return res.json(body); // Print data to body.

    });
});


module.exports = router;
