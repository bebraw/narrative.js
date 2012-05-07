#!/usr/bin/env node
var suite = require('suite.js');
var f = require('funkit');
var n = require('./narrative.js');


suite(n.ask, [
    [[
    {id: 'projectName', q: 'Project name?'},
    {id: 'author', q: 'Author?'}],
    {},
    gen(['foo', 'joe'])], {projectName: 'foo', author: 'joe'}
]);

function gen(a) {
    var i = 0;

    return function() {
        return a[i++];
    };
}

