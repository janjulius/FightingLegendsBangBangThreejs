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