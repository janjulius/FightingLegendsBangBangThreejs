var MAX_PLAYERS = 4;
var GAME_NAME = "Fighting Legends: bang bang";

var DEBUG_MODE = true;

var INTERFACE_DAMAGE_TEXT_SIZE = "50px";
var INTERFACE_STOCK_TEXT_SIZE = "40px";

var MUSIC_VOLUME = 0.1;
var ANNOUNCER_VOLUME = 0.13;

var TIPS = ["Willem is allergic to peanuts.",
"Willem can cancel his ult by pressing the special button again.",
"Jens is a pirate and also a panda.",
"Jens his CANNONBALL will be fired at a random target (this can also be Jens himself).",
"Berend is a yeti.",
"After Berend Lets out his rage with a loud warcry he becomes a lot stronger for a few seconds.",
"Kees is based on Leon Schubert.",
"When Kees removes the bag from his head everyone that faces his way will be stunned in agony.",
"When Boom Stronk was little, a mean woodcutter came and robbed him of his upper body.",
"Boom Stronk is the only character with a multi-purpose ultimate, his ultimate can both deal damage aswell as heal him.",
"Fred is german and does not understand nor speak english.",
"Fred hates Kees because Kees stole bananas from the goblinreich.",
"Rocky has devoted all his free time (off Fighting Legends : bang bang) to chasing the love of a raccoon name Rodny.",
"Rocky his ultimate makes him leap to the nearest target to kick their butt.",
"Paardman is half human, half horse, but unlike an average centaur his bottom half is human and top half horse.",
"Paardman plays Rock, paper or scissors and based on the result he throws an object.",
"Once your special bar has been filled, you can press Y to use your ultimate ability!",
"Flying Legends: bang bang does not own any of the music or sounds that can be heard during the game, except for the announcer.",
"All maps have been made by our own designers, the ideas have definitely not been stolen from other brawlers.",
"Emily only faked cancer once.",
"If you don't have three friends to play with, you can also play the game with one or two!",
"You lose some of your special bar when you die.",
"two plus two is four, minus one, that's three. quick maths.",
"You have an edge in battle if you make good use of your block ability!",
"You can only block once every two seconds.",
"When you block, you don't get any damage nor knockback from being hit, even if it's an ultimate!",
"Each map has it's own unique soundtrack."
];

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

async function deleteAfter(object, dTime){
    await sleep(dTime); 

    scene.remove(object);
}

async function startGameCountDown(){
    console.log("counting down");
    gameInterface.UpdateCountDown("3");
    await sleep(1000);
    //play sound
    gameInterface.UpdateCountDown("2");
    await sleep(1000);
    gameInterface.UpdateCountDown("1");
    await sleep(1000);
    gameInterface.UpdateCountDown("GO!");
    await sleep(300);
    gameInterface.DisplayCountDown(false);
    gameStartUp = false;
    var timeElapsed = clock.getDelta();
    scene.simulate(undefined, 1); // run physics
}

async function doEvery(task, time, amount){ //can only run global tasks maybe useful later
    var _task = task;
    if(amount != 1){
        await sleep(time);
        _task;
        doEvery(_task, time, amount-1);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function deg2Rad(degree)   { return degree*(Math.PI/180); }