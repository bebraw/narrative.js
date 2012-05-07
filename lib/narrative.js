exports.ask = ask;

function ask(questions, answers, input) {
    var ret = {};
    
    questions.forEach(function(e) {
        ret[e.id] = input();
    });

    return ret;
}

