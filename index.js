'use strict';

var http = require('http'),
    querystring = require('querystring'),
    url = require('url'),
    counter = 0,
    postData,
    postOptions;

/**
 * Initializes options and starts the post loop
 *
 * @param {Object} data JSON data to send
 * @param {String} apiUrl API url to send POST request
 */
function batchPost(data, apiUrl) {
    var parsedUrl = url.parse(apiUrl);

    postData = data;

    postOptions = {
        host: parsedUrl.hostname,
        path: parsedUrl.pathname,
        port: parsedUrl.port,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    post();
}

/**
 * Makes the actual post requests
 */
function post() {
    var query = querystring.stringify(postData[counter]);

    postOptions.headers['Content-Length'] = query.length;

    var postRequest = http.request(postOptions, function(res) {
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

module.exports = batchPost;
