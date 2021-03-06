var container;
var controls;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var clockAnim = new THREE.Clock(true);
var gameInterface;
var players = [];
var playersPlaying = 4;
var charSelect = true;
var levelSelect = false;
var selectedLevel;
var charScreens = [];
var levelScreens = [];
var playerFiches = [];
var playerBlockIcons = [];
var controls = new THREE.GamepadControls();
var level;
var placesLeft = 4;
var mixers = [];
var playerWon = -1;
var gameEnded = false;
var gamePaused = false;
var gameStartUp = false;
var spawnOverheads = true;
var blockingPossible = true;
var previousWinner;
var music = new Audio('Music/selectMusic.mp3');
var thisGameWinnerAudio = new Audio('Music/this_games_winner_is.m4a');
var stages = [Brawlhaven, Deserto, FlyingIsland, HyruleCastle, Metalplant, PretPaleis, MarioLevel, Thundergart, ZeldaMap]
gameInterface = new Interface();

'use strict';
Physijs.scripts.worker = 'physi/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

init();

function init() {
    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -30, 0));

    renderer = new THREE.WebGLRenderer({});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    container.appendChild(render_stats.domElement);

    physics_stats = new Stats();
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.zIndex = 100;
    container.appendChild(physics_stats.domElement);



    if (charSelect) {
        runCharSelect();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('keydown', function (event) {
    if (charSelect) {
        if (event.keyCode == 65) {
            console.log("test");
            charSelect = false;
            //runLevelSelect();
            runGame();
        }
    }
});

function CalculateTargetsBoundingBox() {
    var padding = 0;
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;

    var pAlive = playersPlaying;

    for (var i = 0; i < playersPlaying; i++) {

        if (!players[i].isAlive) {
            pAlive--;
            continue;
        }

        var pos = players[i].geometry.position;
        minX = Math.min(minX, pos.z);
        minY = Math.min(minY, pos.y);
        maxX = Math.max(maxX, pos.z);
        maxY = Math.max(maxY, pos.y);
    }

    if (pAlive == 0) {
        minX = 0;
        minY = 0;
        maxX = 0;
        maxY = 0;
    }

    var result = new Rect(minX - padding, minY - padding, (maxY - minY) + padding, (maxX - minX) + padding);

    return result;
}

function CalculateCameraPosition(bb) {
    var center = bb.GetCenter();
    var multi = Math.abs(bb.GetMagnitude() / 50);
    //console.log(multi);
    newPos = clamp(150 + multi, 200, 400);

    var result = new THREE.Vector3(newPos, center.y - (multi / 2), center.x);

    result.y = clamp(result.y, level.bottomRight.y + 80, level.topLeft.y - 80) - 10;
    result.z = clamp(result.z, level.bottomRight.z + 80, level.topLeft.z - 80);

    return result;
}

scene.addEventListener('update', function () {
    if (!charSelect) {
        physics_stats.update();
        var timeElapsed = clock.getDelta();
        for (var i = 0; i < playersPlaying; i++) {
            var element = players[i];
            element.Update(timeElapsed);
            element.UpdateChar(timeElapsed);
        }

        var boundingBox = CalculateTargetsBoundingBox();
        var np = CalculateCameraPosition(boundingBox);
        camera.position.lerp(placesLeft > 0 ? new THREE.Vector3(np.x, np.y, np.z) : new THREE.Vector3(50, players[playerWon].geometry.position.y, players[playerWon].geometry.position.z), timeElapsed);
        camera.position.x = clamp(camera.position.x, placesLeft > 0 ? 150 : 0, 400);
        camera.position.y = clamp(camera.position.y, -200, 200);
        camera.position.z = clamp(camera.position.z, -200, 200);
        if (!gameEnded && !gamePaused && !gameStartUp)
            scene.simulate(undefined, 1); // run physics
    }
});

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    render_stats.update();
    var animDelta = clockAnim.getDelta();
    if (mixers.length > 0) {
        for (var i = 0; i < mixers.length; i++) {
            mixers[i].update(animDelta);
        }
    }

    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.clear();

    if (placesLeft <= 1 && !gameEnded) {
        if (placesLeft == 1) {
            for (var j = 0; j < playersPlaying; j++) {
                var plr = players[j];
                if (plr.Tplace == -1) {
                    plr.Tplace = 1;
                    playerWon = j;
                    placesLeft = 0;
                    plr.isStunned = true;
                    previousWinner = plr.cid;
                    this.thisGameWinnerAudio.play();
                    this.thisGameWinnerAudio.addEventListener('ended', function () {
                        var winnerSound = new Audio("Music/Class" + previousWinner + ".m4a");
                        winnerSound.play();
                    });
                }
            }
        }

        if (camera.position.x < 55) {
            gameEnded = true;
            gameInterface.ClearGameInterface();
            gameInterface.LoadEndGameScreen();
        }
    }

    renderer.render(scene, camera);
    renderer.clearDepth();
}

function EndGame() {
    for (var i = scene.children.length - 1; i >= 0; i--) {
        scene.remove(scene.children[i]);
    }
    for (var j = 0; j < playersPlaying; j++) {
        players[j] = players[j].cid;
        console.log("last picks" + players[j]);
    }
    gameInterface.ClearEndInterface();

    gameEnded = false;
    playersPlaying = 4;
    charSelect = true;
    gamePaused = false;
    gameStartUp = false;
    placesLeft = 4;
    playerWon = -1;
    level.StopMusic();

    runCharSelect();
}

function runCharSelect() {

    music = new Audio('Music/selectMusic.mp3');
    music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    music.volume = MUSIC_VOLUME;
    music.play();

    if (charSelect) {

        camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);

        scene.add(camera);
        camera.zoom = 40;
        camera.updateProjectionMatrix();

        gameInterface.LoadCharSelectInterface();
        var material;
        var baseZ = 0;
        var baseY = -8;
        var constZ = -8;
        var constY = -5;
        var amount = 8;
        for (var i = 0; i < amount; i++) {
            material = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: THREE.ImageUtils.loadTexture(getCharImgByNameOrId(i))
                }),
                0,
                1
            );
            if (i % 4 == 0) {
                baseY += 6;
                baseZ = constZ;
            }
            baseZ += 5.5;
            charScreen = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5, 5), material, 0);
            charScreen.position.set(-3, baseY, baseZ);
            charScreens[i] = charScreen;
            charScreens.castShadow = true;
            charScreens[i].myCharId = i;
            if (i != 1 && i != 4)
                scene.add(charScreen);

        }
        camera.lookAt(charScreens[0].position);
        camera.position.set(40, 0, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        for (var i = 0; i < playersPlaying; i++) {
            var c = 0xff0000;
            switch (i) {
                case 0:
                    c = 0xff0000;
                    break;
                case 1:
                    c = 0x0000ff;
                    break;
                case 2:
                    c = 0xffff00;
                    break;
                case 3:
                    c = 0x33cc33;
                    break;
            }

            material =
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('sprites/p' + (i + 1) + 'Hand.png'),
                    transparent: true
                });
            fische = new Physijs.BoxMesh(new THREE.BoxGeometry(0.00001, 2, 2), material, 0);
            playerFiches[i] = fische;
            scene.add(fische);
            console.log(players[i]);
            players[i] = players[i] ? players[i] : 3;
        }
    }
}

function runLevelSelect() {
    if (levelSelect) {
        gameInterface.ClearCharSelectInterface();
        for (var i = scene.children.length - 1; i >= 0; i--) {
            scene.remove(scene.children[i]);
        }
        scene.add(playerFiches[0]);
        var material;
        var baseZ = 0;
        var baseY = -10;
        var constZ = -12.5;
        var constY = -5;
        var amount = stages.length + 1;
        for (var i = 0; i < amount; i++) {
            material = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: THREE.ImageUtils.loadTexture(getStageImgByNameOrId(i))
                }),
                0,
                1
            );
            if (i % 4 == 0) {
                baseY += 6;
                baseZ = constZ;
            }
            baseZ += 5.5;
            levelScreen = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5, 5), material, 0);
            levelScreen.position.set(-3, baseY, baseZ);
            levelScreens[i] = levelScreen;
            levelScreens.castShadow = true;
            levelScreens[i].myLevelId = i;
            if (i != 1)
                scene.add(levelScreen);

        }
        camera.lookAt(levelScreens[0].position);
        camera.position.set(40, 0, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        for (var i = 0; i < playersPlaying; i++) {
            var c = 0xff0000;
            switch (i) {
                case 0:
                    c = 0xff0000;
                    break;
                case 1:
                    c = 0x0000ff;
                    break;
                case 2:
                    c = 0xffff00;
                    break;
                case 3:
                    c = 0x33cc33;
                    break;
            }

            material =
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('sprites/p' + (i + 1) + 'Hand.png'),
                    transparent: true
                });
        }
    }

}

function getPlayers() {
    return players;
}

function runGame() {
    this.music.pause();
    this.music.currentTime = 0;

    if (!charSelect) {
        gameStartUp = true;
        startGameCountDown();

        for (var i = scene.children.length - 1; i >= 0; i--) {
            scene.remove(scene.children[i]);
        }

        light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(20, 40, -15);
        light.target.position.copy(scene.position);
        light.castShadow = false;
        scene.add(light);
        var alight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(alight);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.set(150, 0, 0);
        camera.lookAt(scene.position);
        scene.add(camera);

        console.log("attempting to load level " + selectedLevel);

        if (selectedLevel == 9) {
            var r = Math.floor((Math.random() * stages.length) + 1)

            level = new stages[r]();
        } else {
            level = new stages[selectedLevel]();
        }

        var bound = new THREE.BoxGeometry(1, level.topLeft.y + Math.abs(level.bottomRight.y), level.topLeft.z + Math.abs(level.bottomRight.z));
        var object = new THREE.Mesh(bound, new THREE.MeshBasicMaterial(0xff0000));
        var box = new THREE.BoxHelper(object, 0xffff00);
        scene.add(box);

        placesLeft = playersPlaying;
        console.log(playersPlaying);
        for (var k = 0; k < playersPlaying; k++) {
            var choice = getClassByCharId(players[k]);
            players[k] = new choice(level.spawn[k].y, level.spawn[k].z);
            players[k].setId(k);
            players[k].AddGrounded();
            players[k].geometry.name = k;
            players[k].geometry.isPlayer = true;
            players[k].geometry.rotation.set(0, 0, 0);
            players[k].geometry.__dirtyRotation = true;
            if (spawnOverheads) {
                this.playerFloaterMaterial = THREE.ImageUtils.loadTexture(getPlayerIndicatorSprite(k));
                this.playerFloater = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 5),
                    new THREE.MeshBasicMaterial({
                        transparent: true,
                        map: this.playerFloaterMaterial
                    }));

                this.playerFloater.position.set(5.1, players[k].modelHeight !== undefined ? players[k].modelHeight : 7, 0);

                players[k].geometry.add(playerFloater);
            }
            if (blockingPossible) {
                this.blockMaterial = THREE.ImageUtils.loadTexture('sprites/Characters/BlockIcon.png');

                playerBlockIcons[k] = new THREE.Mesh(
                    new THREE.BoxGeometry(0.1, 4, 4),
                    new THREE.MeshBasicMaterial({
                        transparent: true,
                        map: this.blockMaterial
                    }), 0, 1
                )
                playerBlockIcons[k].position.set(5.1, 0, 0);
                players[k].geometry.add(playerBlockIcons[k]);
                playerBlockIcons[k].material.opacity = 0;
            }
        }

        //console.log(box.getvelocity());


        gameInterface.ClearCharSelectInterface();
        gameInterface.LoadGameInterface(players[0], players[1], players[2], players[3]);
        scene.simulate();
        physics_stats.update();
        requestAnimationFrame(animate);
        if (DEBUG_MODE) {
            window.addEventListener('keydown', function (event) {
                if (event.keyCode == 65) { //a
                    players[0].direction = 1;
                } else if (event.keyCode == 68) { //d
                    players[0].direction = -1;
                } else if (event.keyCode == 87) { //w
                    players[0].setDamage(players[0].getDamage() + 1); //test code for color coding and spacing
                    players[0].normalAtk();
                } else if (event.keyCode == 83) { //s
                    players[0].setStock(players[0].getStock() - 1);
                }
            });
        }
        for (var i = 0; i < playersPlaying; i++) {
            gameInterface.UpdateGameInterface(i);
        }
    }
}