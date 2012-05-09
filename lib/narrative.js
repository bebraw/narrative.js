var f = require('funkit');

exports.ask = ask;

var ops = {
    choice: {
        match: function(e) {return e.choices;},
        exec: function(t, e) {
            var selected = e.choices[f.atoi(t) - 97];

            if(selected) return selected;
        }
    },
    boolean: {
        exec: function(t) {
            t = t.toLowerCase();

            if(['yes', 'true', 'y'].indexOf(t) > -1) return true;
            if(['no', 'false', 'n'].indexOf(t) > -1) return false;
        }
    },
    text: {}
};

// TODO: hook up predefined answers
function ask(questions, finish, answers, input, output) {
    finish = finish || function() {};
    input = input || function(cb) {process.stdin.on('data', cb);};
    output = output || function(a) {console.log(a);};

    var i = 0;
    var e = questions[0];
    var ret = {};

    output(questions[0].q);
    input(getInput);

    function getInput(t) {
        t = t.trim();
        var v = match(ops, e)(t, e);

        if(f.isDefined(v)) {
            ret[e.id] = v;
            i++;

            if(i >= questions.length) {
                // XXX: separate this somehow
                process.stdin.removeListener('data', getInput);
                process.stdin.pause();

                finish(ret);
            }
            else {
                e = questions[i];
                output(e.q);
            }
        }
    }
}

function match(ops, e) {
    for(var type in ops) {
        var v = ops[type];

        if(e.type == type) return v.exec;
        if(v.match && v.match(e)) return v.exec;
    }

    return f.id;
}

