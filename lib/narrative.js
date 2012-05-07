var f = require('funkit');

exports.ask = ask;

function ask(questions, answers, input, output) {
    input = input || function(done) {
        process.stdin.on('data', function(t) {
            done(t.trim());
        });
    };
    output = output || function(a) {console.log(a);};

    var ret = {};

    questions.forEach(function(e) {
        output(e.q);

        var eSet = f.partial(set, e);
        input(function(t) {
            if(e.choices) choice(eSet, t, input, e);
            else if(e.type === 'boolean') bool(eSet, t, input);
            else str(eSet, t);
        });
    });

    function set(e, v) {
        ret[e.id] = v;
    }

    return ret;
}

function bool(set, t, input) {
    var i = t.toLowerCase();

    if(['yes', 'true', 'y'].indexOf(i) > -1) set(true);
    else if(['no', 'false', 'n'].indexOf(i) > -1) set(false);
    else input(function(t) {
        bool(set, t, input);
    });
}

function choice(set, t, input, e) {
    var selected = e.choices[atoi(t) - 97];

    if(selected) set(selected);
    else input(function(t) {
        choice(set, t, input, e);
    });
}

function str(set, t) {
    return set(t);
}

function atoi(chr) {
    return chr.charCodeAt();
}

