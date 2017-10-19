var container;
var controls;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var gameInterface;
var players = [];
var playersPlaying = 4;
var charSelect = true;
var charScreens = [];
var playerFiches = [];
var playerBlockIcons = [];
var controls = new THREE.GamepadControls();
var level;
var spawnOverheads = true;
var blockingPossible = true;
var music = new Audio('Music/selectMusic.mp3');
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

    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(60, 25, 0);
    camera.lookAt(scene.position);
    scene.add(camera);

    light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 40, -15);
    light.target.position.copy(scene.position);
    light.castShadow = true;
    light.shadowCameraLeft = -60;
    light.shadowCameraTop = -60;
    light.shadowCameraRight = 60;
    light.shadowCameraBottom = 60;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 200;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    scene.add(light);

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
    newPos = clamp(150 + multi, 150, 400);

    var result = new THREE.Vector3(newPos, center.y - (multi / 2), center.x);

    result.y = clamp(result.y, level.bottomRight.y + 80, level.topLeft.y - 80);
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
        camera.position.lerp(new THREE.Vector3(np.x, np.y, np.z), timeElapsed);
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
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
}

function runCharSelect() {

    music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    music.volume = MUSIC_VOLUME;
    music.play();

    if (charSelect) {
        gameInterface.LoadCharSelectInterface();
        var material;
        var baseZ = 0;
        var baseY = -5;
        var constZ = 0;
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
                baseY += 5;
                baseZ = constZ;
            }
            baseZ += 5;
            charScreen = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5, 5), material, 0);
            charScreen.position.set(-3, baseY, baseZ);
            charScreens[i] = charScreen;
            charScreens.castShadow = true;
            charScreens[i].myCharId = i;
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
            material = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({
                    color: c
                }),
                0,
                1
            );
            fische = new Physijs.BoxMesh(new THREE.BoxGeometry(0, 1, 1), material, 0);
            playerFiches[i] = fische;
            scene.add(fische);
            if (DEBUG_MODE) {
                players[i] = 0;
            }
        }

        window.addEventListener('keydown', function (event) {
            if (event.keyCode == 68) { //d
                ray0 = new THREE.Raycaster(playerFiches[0].position, new THREE.Vector3(-1, 0, 0));
                var intersects = ray0.intersectObjects(scene.children);
                for (var i = 0; i < intersects.length; i++) {
                    players[0] = intersects[i].object.myCharId;
                    gameInterface.UpdateCharSelectInterface(0, players[0]);
                }
                playerFiches[0].position.z = playerFiches[0].position.z + 1;
                //ray0.set(playerFiches[0].position, new THREE.Vector3(1,0,0));
            } else if (event.keyCode == 70) { //f
                ray0 = new THREE.Raycaster(playerFiches[1].position, new THREE.Vector3(-1, 0, 0));
                var intersects = ray0.intersectObjects(scene.children);
                for (var i = 0; i < intersects.length; i++) {
                    players[1] = intersects[i].object.myCharId;
                    gameInterface.UpdateCharSelectInterface(1, players[1]);
                }
                playerFiches[1].position.z = playerFiches[1].position.z + 1;
                playerFiches[0].position.y = playerFiches[0].position.y + 1;
            } else if (event.keyCode == 87) { //w
                ray0 = new THREE.Raycaster(playerFiches[2].position, new THREE.Vector3(-1, 0, 0));
                var intersects = ray0.intersectObjects(scene.children);
                for (var i = 0; i < intersects.length; i++) {
                    players[2] = intersects[i].object.myCharId;
                    gameInterface.UpdateCharSelectInterface(2, players[2]);
                }
                playerFiches[2].position.z = playerFiches[2].position.z + 1;
            } else if (event.keyCode == 83) { //s
                ray0 = new THREE.Raycaster(playerFiches[3].position, new THREE.Vector3(-1, 0, 0));
                var intersects = ray0.intersectObjects(scene.children);
                for (var i = 0; i < intersects.length; i++) {
                    players[3] = intersects[i].object.myCharId;
                    gameInterface.UpdateCharSelectInterface(3, players[3]);
                }
                playerFiches[3].position.z = playerFiches[3].position.z + 1;
            }
        });
    }
}

function runGame() {

    this.music.pause();
    this.music.currentTime = 0;

    if (!charSelect) {


        for (var i = scene.children.length - 1; i >= 0; i--) {
            scene.remove(scene.children[i]);
        }

        for (var i = 0; i < 8; i++) {
            charScreens[i].position.set(100, 100, 100);
        }

        level = new PretPaleis(); //temp level changer

        /*
        //level randomizer
        let randomLevel;
        randomLevel = Math.floor((Math.random() * 7) + 1);
        
        switch(randomLevel){
            case 1 :
                    level = new Brawlhaven();
            break;
            case 2 :
                    level = new Thundergart();
            break;
            case 3 : 
                    level = new StandardMap();
            break;
            case 4 : 
                    level = new ZeldaMap();
            break;
            case 5 : 
                    level = new Deserto();
            break;
            case 6 : 
                    level = new Metalplant();
            break;
            case 7 : 
                    level = new HyruleCastle();
            break;
        }
        */


        var bound = new THREE.BoxGeometry(1, level.topLeft.y + Math.abs(level.bottomRight.y), level.topLeft.z + Math.abs(level.bottomRight.z));
        var object = new THREE.Mesh(bound, new THREE.MeshBasicMaterial(0xff0000));
        var box = new THREE.BoxHelper(object, 0xffff00);
        scene.add(box);

        console.log(playersPlaying);
        for (var k = 0; k < playersPlaying; k++) {
            var choice = getClassByCharId(players[k]);
            players[k] = new choice(level.spawn[k].y, level.spawn[k].z);
            players[k].setId(k);
            players[k].AddGrounded();
            players[k].geometry.name = k;
            players[k].geometry.isPlayer = true;
            if (spawnOverheads) {
                this.playerFloaterMaterial = THREE.ImageUtils.loadTexture(getPlayerIndicatorSprite(k));
                this.playerFloater = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 5),
                    new THREE.MeshBasicMaterial({ transparent: true, map: this.playerFloaterMaterial }));

                this.playerFloater.position.set(5.1, 7, 0);

                players[k].geometry.add(playerFloater);
            }
            if(blockingPossible){ 
                this.blockMaterial = THREE.ImageUtils.loadTexture('sprites/Characters/BlockIcon.png');
            
            playerBlockIcons[k] = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 4, 4),
                new THREE.MeshBasicMaterial(
                    {
                        transparent: true, map: this.blockMaterial
                    }
                ), 0, 1
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
    }
}