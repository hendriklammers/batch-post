'use strict';

var http = require('http'),
    querystring = require('querystring'),
    url = require('url'),
    counter = 0,
    postData,
    apiUrl;

function post() {
    var query = querystring.stringify(postData[counter]);

    var options = {
        host: 'localhost',
        path: '/api/object',
        port: 3000,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': query.length
        }
    };

    var postRequest = http.request(options, function(res) {
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);

            counter++;

            if (counter >= postData.length) {
                return;
            }

            post();
        });
    });

    postRequest.write(query);
    postRequest.end();
}

module.exports = function(data, url) {
    postData = data;
    apiUrl = url;

    post();
};
