var f = require('funkit');

exports.ask = ask;

// TODO: hook up predefined answers
function ask(questions, finish, answers, input, output) {
    finish = finish || function() {};
    input = input || function(cb) {
        process.stdin.on('data', cb);
    };
    output = output || function(a) {console.log(a);};

    var i = 0;
    var e = questions[0];
    var ret = {};

    output(questions[0].q);
    input(getInput);

    function getInput(t) {
        t = t.trim();
        var ok, v;

        if(e.choices) v = choice(t, e);
        else if(e.type === 'boolean') v = bool(t);
        else v = f.id(t);

        if(f.isDefined(v)) {console.log('ok');
            ret[e.id] = v;
            i++;
            
            if(i == questions.length) {
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

function bool(t) {
    t = t.toLowerCase();

    if(['yes', 'true', 'y'].indexOf(t) > -1) return true;
    else if(['no', 'false', 'n'].indexOf(t) > -1) return false;
}

function choice(t, e) {
    var selected = e.choices[atoi(t) - 97];

    if(selected) return selected;
}

function atoi(chr) {
    return chr.charCodeAt();
}

