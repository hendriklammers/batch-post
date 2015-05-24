'use strict';
var assert = require('assert');
var batchPost = require('./');

it('should ', function () {
	assert.strictEqual(batchPost('unicorns'), 'unicorns & rainbows');
});
