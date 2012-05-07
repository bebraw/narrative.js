#!/usr/bin/env node
var suite = require('suite.js');
var f = require('funkit');
var n = require('./narrative.js');


suite(n.ask, [
    // str narrative
    [
    [{id: 'projectName', q: 'Project name?'},
    {id: 'author', q: 'Author?'}],
    {},
    gen(['foo', 'joe'])
    ], {projectName: 'foo', author: 'joe'},
    // choice narrative
    [
    [{id: 'license', q: 'License?', choices: ['GPLv3', 'MIT', 'Other']}],
    {},
    gen(['d', 'abbabba', 'a'])
    ], {license: 'GPLv3'}
]);

function gen(a) {
    var i = 0;

    return function() {
        return a[i++];
    };
}

