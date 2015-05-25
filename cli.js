#!/usr/bin/env node
'use strict';

var batchPost = require('./'),
    chalk = require('chalk'),
    args = process.argv.slice(2),
    fs = require('fs');

fs.readFile(args[0], 'utf8', function(err, data) {
    if (err) {
        console.log('FATAL An error occurred trying to read in the file: ' + chalk.red(err));
        process.exit(1);
    }

    if (data, args[1]) {
        batchPost(JSON.parse(data), args[1]);
    }
});
