#!/usr/bin/env node
var suite = require('suite.js');
var f = require('funkit');
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
    ['d', 'babbabba', 'a']
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
], {async: true});

function testableAsk(questions, answers, testCb) {
    n.ask(questions, testCb, {}, gen(answers), f.id);
}

function gen(answers) {
    return function(cb) {
        answers.forEach(function(a) {
            cb(a);
        });
    };
}

