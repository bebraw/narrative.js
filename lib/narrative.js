exports.ask = ask;

function ask(questions, answers, input) {
    var ret = {};
    
    function iCb() {
        return input().trim();
    }

    questions.forEach(function(e) {
        if(e.choices) ret[e.id] = choice(iCb, e);
        else if(e.type === 'boolean') ret[e.id] = bool(iCb);
        else ret[e.id] = str(iCb);
    });

    return ret;
}

function bool(iCb) {
    var i = iCb().toLowerCase();

    if(['yes', 'true', 'y'].indexOf(i) > -1) return true;
    else if(['no', 'false', 'n'].indexOf(i) > -1) return false;
    else return bool(iCb);
}

function choice(iCb, e) {
    var selected = e.choices[atoi(iCb()) - 97];

    if(selected) return selected;
    else return choice(iCb, e);
}

function str(iCb) {
    return iCb();
}

function atoi(chr) {
    return chr.charCodeAt();
}

