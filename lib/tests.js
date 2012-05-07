#!/usr/bin/env node
var suite = require('suite.js');
var f = require('funkit');
var n = require('./narrative.js');


suite(n.ask, [
    [[{}, {}, {}], answers([])], {}
]);

function answers() {
    // TODO
}
