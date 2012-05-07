exports.ask = ask;

function ask(questions, answers, input) {
    var ret = {};
    
    function iCb() {
        return input().trim();
    }

    questions.forEach(function(e) {
        if(e.choices) ret[e.id] = choice(e, iCb);
        else ret[e.id] = iCb();
    });

    return ret;
}

function choice(e, iCb) {
    var selected = e.choices[atoi(iCb()) - 97];

    if(selected) return selected;
    else return choice(e, iCb);
}

function atoi(chr) {
    return chr.charCodeAt();
}

