var f = require('funkit');

exports.ask = ask;

var ops = {
    choice: {
        match: function(e) {return e.choices;},
        exec: function(t, e) {
            var selected = e.choices[f.atoi(t) - 97];

            if(selected) return selected;
        },
        output: function(e) {
            return '\n' + e.choices.map(function(e, i) {
                return f.itoa(i + 97) + '. ' + e;
            }).join('\n');
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
    var ret = {};
    var e = questions[0];
    var v = match(ops, e);

    output(getOutput(e, v));
    input(getInput);

    function getOutput(e, v) {
        var o = f.isFunction(v.output)? v.output(e): '';

        return e.q + o;
    }

    function getInput(t) {
        t = t.trim();
        var r = v.exec(t, e);

        if(f.isDefined(r)) {
            ret[e.id] = r;
            i++;

            if(i >= questions.length) {
                // XXX: separate this somehow
                process.stdin.removeListener('data', getInput);
                process.stdin.pause();

                finish(ret);
            }
            else {
                e = questions[i];
                v = match(ops, e);
                output(getOutput(e, v));
            }
        }
    }
}

function match(ops, e) {
    for(var type in ops) {
        var v = ops[type];

        if(e.type == type) return v;
        if(v.match && v.match(e)) return v;
    }

    return {exec: f.id};
}

