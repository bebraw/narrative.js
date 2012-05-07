#!/usr/bin/env node
var n = require('../lib/narrative');
var data = require('./simple_questions');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var result = n.ask(data, function(e) {
    // could inject this to template ie.
    console.log(e);
});

