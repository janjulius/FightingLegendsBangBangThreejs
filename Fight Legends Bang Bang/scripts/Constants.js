var MAX_PLAYERS = 4;
var GAME_NAME = "Fighting Legends: bang bang";

var DEBUG_MODE = true;

var INTERFACE_DAMAGE_TEXT_SIZE = "75px";
var INTERFACE_STOCK_TEXT_SIZE = "40px";

if(DEBUG_MODE){
    console.log("DEBUG MODE IS ON, TO TURN OFF GO TO CONSTANTS FILE");
}

var percentColors = [
    { pct: 0.0, color: { r: 255, g: 255, b: 255 } },
    { pct: 75, color: { r: 255, g: 165, b: 0 } },
    { pct: 150, color: { r: 255, g: 0, b: 0 } } ];

function getDamagePercentageColor(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}  

function getCharNameById(id){
    switch(id){
        case 0:
        return "Willem";
        case 1:
        return "Paardman";
        case 2:
        return "Rocky";
        case 3:
        return "Fred";
        case 4:
        return "Kees";
        case 5:
        return "Boom Stronk";
        case 6:
        return "Jens";
        case 7:
        return "Berend";
    }
}

function getClassByCharId(id){
    switch(id){
        case 0:
        return Willem;
        case 1:
        return Paardman;
        case 2:
        return Rocky;
        case 3:
        return Fred;
        case 4:
        return Kees;
        case 5:
        return BoomStronk;
        case 6:
        return Jens;
        case 7:
        return Berend;
    }
}

function getCharImgByNameOrId(p){
    switch(p){
    case "Willem":
    case 0:
    return 'sprites/Characters/MenuSprites/willem.png';
    case "Paardman":
    case 1:
    return 'sprites/Characters/MenuSprites/paardman2.png';
    case "Rocky":
    case 2:
    return 'sprites/Characters/MenuSprites/rocky.png';
    case "Fred":
    case 3:
    return 'sprites/Characters/MenuSprites/fred.png';
    case "Kees":
    case 4:
    return 'sprites/Characters/MenuSprites/kees.png';
    case 5:
    case "Boom Stronk":
    return 'sprites/Characters/MenuSprites/boom_stronk.png';
    case "Jens":
    case 6:
    return 'sprites/Characters/MenuSprites/jens.png';
    case "Berend":
    case 7:
    return 'sprites/Characters/MenuSprites/berend.png';
}
}

function getPlayerColors(id, opacity){
    switch(id){
        case 0:
        return "rgba(255, 0, 0,"+ opacity +" )";
        case 1:
            return "rgba(0, 0, 255, " + opacity + ")";
        case 2:
            return "rgba(255, 165, 0,"+ opacity + ")";
        case 3:
            return "rgba(0, 255, 0,"+ opacity +")";

    }
}