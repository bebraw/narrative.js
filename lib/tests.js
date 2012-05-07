#!/usr/bin/env node
var suite = require('suite.js');
var n = require('./narrative.js');

var bool = [
    {id: 'failWhale', q: 'Do you like fail whale?', type: 'boolean'}
];

suite(testableAsk, [
    // str narrative
    [
    [{id: 'projectName', q: 'Project name?'},
    {id: 'author', q: 'Author?'}],
    ['foo', 'joe']
    ], {projectName: 'foo', author: 'joe'},
    // choice narrative
    [
    [{id: 'license', q: 'License?', choices: ['GPLv3', 'MIT', 'Other']}],
    ['d', 'abbabba', 'a']
    ], {license: 'GPLv3'},
    // boolean narrative
    [
    bool,
    ['perhaps', 'nope', 'yes']
    ], {failWhale: true},
    [
    bool,
    ['hmm', 'no']
    ], {failWhale: false}
]).async(); // TODO!!!

function testableAsk(questions, answers, testCb) {
    n.ask(questions, function(e) {
        testCb(e);
    }, {}, gen(answers));
}

function gen(a) {
    var i = 0;

    return function(done) {
        return done(a[i++]);
    };
}

