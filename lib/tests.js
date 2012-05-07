#!/usr/bin/env node
var suite = require('suite.js');
var n = require('./narrative.js');

var bool = [
    {id: 'failWhale', q: 'Do you like fail whale?', type: 'boolean'}
];

suite(n.ask, [
    // str narrative
    [
    [{id: 'projectName', q: 'Project name?'},
    {id: 'author', q: 'Author?'}],
    {},
    gen(['foo', 'joe']),
    id
    ], {projectName: 'foo', author: 'joe'},
    // choice narrative
    [
    [{id: 'license', q: 'License?', choices: ['GPLv3', 'MIT', 'Other']}],
    {},
    gen(['d', 'abbabba', 'a']),
    id
    ], {license: 'GPLv3'},
    // boolean narrative
    [
    bool,
    {},
    gen(['perhaps', 'nope', 'yes']),
    id
    ], {failWhale: true},
    [
    bool,
    {},
    gen(['hmm', 'no']),
    id
    ], {failWhale: false}
]);

function gen(a) {
    var i = 0;

    return function(done) {
        return done(a[i++]);
    };
}

function id(a) {return a;}

