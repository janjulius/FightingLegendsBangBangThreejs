var MAX_PLAYERS = 4;
var GAME_NAME = "Fighting Legends: bang bang";

var DEBUG_MODE = true;

var INTERFACE_DAMAGE_TEXT_SIZE = "50px";
var INTERFACE_STOCK_TEXT_SIZE = "40px";

var MUSIC_VOLUME = 0.1;
var ANNOUNCER_VOLUME = 0.13;

if (DEBUG_MODE) {
    console.log("DEBUG MODE IS ON, TO TURN OFF GO TO CONSTANTS FILE");
}

var percentColors = [
    { pct: 0.0, color: { r: 255, g: 255, b: 255 } },
    { pct: 75, color: { r: 255, g: 165, b: 0 } },
    { pct: 150, color: { r: 255, g: 0, b: 0 } }];

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

function getCharNameById(id) {
    switch (id) {
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

function getClassByCharId(id) {
    switch (id) {
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

function getCharImgByNameOrId(p) {
    switch (p) {
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

function getStageImgByNameOrId(a){
    switch(a){
        case "Brawlhaven":
        case 0:
            return 'sprites/Levels/MenuSprites/BrawlHaven.png';
        case "Deserto":
        case 1:
            return 'sprites/Levels/MenuSprites/Deserto.png';
        case "FlyingIsland":
        case 2:
            return 'sprites/Levels/MenuSprites/FlyingIsland.png';
        case "HyruleCastle":
        case 3:
            return 'sprites/Levels/MenuSprites/HyruleCastle.png';
        case "Metalplant":
        case 4:
            return 'sprites/Levels/MenuSprites/Metalplant.png';
        case "PretPaleis":
        case 5:
            return 'sprites/Levels/MenuSprites/PretPaleis.png';
        case "StandardMap":
        case 6:
            return 'sprites/Levels/MenuSprites/StandardMap.png';
        case "Thundergart":
        case 7:
            return 'sprites/Levels/MenuSprites/Thundergart.png';
        case "ZeldaMap":
        case 8:
            return 'sprites/Levels/MenuSprites/ZeldaMap.png';
            case 9:
            return 'sprites/Levels/MenuSprites/Zz_Random.png';
    }

}

function getPlayerIndicatorSprite(id){
    switch(id){
        case 0:
            return 'sprites/P1Icon.png';
        case 1:
            return 'sprites/P2Icon.png';
        case 2:
            return 'sprites/P3Icon.png';
        case 3:
            return 'sprites/P4Icon.png';
    }
}

function getPlayerColors(id, opacity) {
    switch (id) {
        case 0:
            return "rgba(255, 0, 0," + opacity + " )";
        case 1:
            return "rgba(0, 0, 255, " + opacity + ")";
        case 2:
            return "rgba(255, 165, 0," + opacity + ")";
        case 3:
            return "rgba(0, 255, 0," + opacity + ")";

    }
}


function distanceBetweenVector3(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function lerp(a,  b,  c) {
    return a + c * (b - a);
}

class Rect {
    constructor(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.height = h;
        this.width = w;
    }

    GetCenter() {
        return new THREE.Vector2(this.x + this.width / 2, this.y + this.height);
    }

    GetMagnitude() {
        var w = this.width - this.x;
        var h = this.height - this.y;
        return w * h;
    }

    Contains(point) {
        return point.x < this.x && point.x > this.width && point.y < this.y && point.y > this.height;
    }
}