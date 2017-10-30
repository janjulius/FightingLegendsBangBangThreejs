/**
 * @author spite / https://github.com/spite
 */
/*global THREE, console */
THREE.GamepadControls = function () {

    this.rotMatrix = new THREE.Matrix4();
    this.dir = new THREE.Vector3(0, 0, 1);
    this.tmpVector = new THREE.Vector3();
    this.lon = -90;
    this.lat = 0;
    this.target = new THREE.Vector3();
    this.deadZone = 0.3;
    this.pressedJump = [0, 0, 0, 0];
    this.gamePad;
    this.oldGamepad;

    this.init = function () {

        var gamepadSupportAvailable = navigator.getGamepads ||
            !!navigator.webkitGetGamepads ||
            !!navigator.webkitGamepads;

        if (!gamepadSupportAvailable) {
            console.log('NOT SUPPORTED');
        } else {
            if ('ongamepadconnected' in window) {
                window.addEventListener('gamepadconnected', onGamepadConnect.bind(this), false);
                window.addEventListener('gamepaddisconnected', gamepadSupport.onGamepadDisconnect.bind(this), false);
            } else {
                this.startPolling();
            }
        }
    }

    this.startPolling = function () {

        if (!this.ticking) {
            this.ticking = true;
            this.tick();
        }
    }

    this.stopPolling = function () {
        this.ticking = false;
    }

    this.tick = function () {
        this.pollStatus();
        this.scheduleNextTick();
    }

    this.scheduleNextTick = function () {

        if (this.ticking) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }

    this.pollStatus = function () {

        this.pollGamepads();

    }

    this.filter = function (v) {

        return (Math.abs(v) > this.deadZone) ? v : 0;

    }

    this.PressedButton = function (id, b) {
        if (!this.gamePad[id] && !this.oldGamepad[id])
            return false;

        return this.gamePad[id].buttons[b].value == 1 && this.oldGamepad[id][b] != this.gamePad[id].buttons[b].value;
    }


    this.SetOldGamePadState = function (a) {
        if (!a)
            return;

        this.oldGamepad = new Array(4);
        for (var i = 0; i < a.length; i++) {
            this.oldGamepad[i] = new Array(17);
            if (a[i] != null) {
                for (var j = 0; j < a[i].buttons.length; j++) {
                    this.oldGamepad[i][j] = a[i].buttons[j].value;
                }
            }
        }
    }

    this.pollGamepads = function () {

        this.gamePad =
            (navigator.getGamepads && navigator.getGamepads()) ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads());

        if (this.gamePad) {

            if (!this.oldGamepad) {
                this.SetOldGamePadState(this.gamePad);
            }


            if (!charSelect) {

                if (levelSelect) {
                    var pad = this.gamePad[0];
                    if (pad) {
                        var spd = 0.2;

                        if (levelSelect) {
                            playerFiches[0].position.z -= this.filter(pad.axes[0]) * spd;
                            playerFiches[0].position.y -= this.filter(pad.axes[1]) * spd;
                        }

                        if (this.PressedButton(0, 0)) {
                            ray0 = new THREE.Raycaster(playerFiches[0].position, new THREE.Vector3(-1, 0, 0));
                            var intersects = ray0.intersectObjects(scene.children);
                            for (var j = 0; j < intersects.length; j++) {
                                selectedLevel = intersects[j].object.myLevelId;
                            }
                        }
                        if (selectedLevel !== undefined) { //wacht totdat selectedlevel bestaat en dan start het spel!
                            charSelect = false;
                            levelSelect = false;
                            runGame();
                        }
                    }
                } else {

                    for (var i = 0; i < players.length; i++) {
                        var p = players[i];
                        if (this.gamePad[i] && p instanceof Character) {
                            var g = this.gamePad[i];
                            p.direction.z = this.filter(-g.axes[0]);
                            p.direction.y = this.filter(-g.axes[1]);

                            if (!gameEnded && !gamePaused) {
                                if (this.PressedButton(i, 0)) {
                                    p.pressedbuttonA();
                                }
                                if (this.PressedButton(i, 2)) {
                                    p.pressedbuttonX();
                                }
                                if (this.PressedButton(i, 3)) {
                                    p.pressedbuttonY();
                                }
                                if (this.PressedButton(i, 5)) {
                                    p.pressedbuttonRT();
                                }
                            }
                            if (!gameEnded) {
                                if (this.PressedButton(i, 9)) {
                                    gamePaused = !gamePaused;
                                    if (!gamePaused) {
                                        var timeElapsed = clock.getDelta();
                                        scene.simulate(undefined, 1);
                                    }
                                }
                            } else {
                                if (this.PressedButton(i, 9)) {
                                    p.pressedbuttonStart();
                                }
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < this.gamePad.length; i++) {
                    var p = players[i];
                    var pad = this.gamePad[i];
                    if (pad) {
                        var spd = 0.2;

                        playerFiches[i].position.z -= this.filter(pad.axes[0]) * spd;
                        playerFiches[i].position.y -= this.filter(pad.axes[1]) * spd;
                        if (this.PressedButton(i, 0)) {
                            ray0 = new THREE.Raycaster(playerFiches[i].position, new THREE.Vector3(-1, 0, 0));
                            var intersects = ray0.intersectObjects(scene.children);
                            for (var j = 0; j < intersects.length; j++) {
                                players[i] = intersects[j].object.myCharId;
                                gameInterface.UpdateCharSelectInterface(i, players[i]);
                                var selectSound = new Audio("Music/Class" + intersects[j].object.myCharId + ".m4a");

                                selectSound.volume = ANNOUNCER_VOLUME;
                                selectSound.play();
                            }

                        }
                        if (i == 0) {
                            if (this.PressedButton(i, 9)) {
                                playersPlaying = this.gamePad.length;
                                if (charSelect) {
                                    charSelect = false;
                                    levelSelect = true;
                                    selectedLevel = undefined;
                                    runLevelSelect();
                                }
                                break;
                            }
                        }
                    }
                }
            }
            this.SetOldGamePadState(this.gamePad);
        }
    }

    this.init();

};

THREE.GamepadControls.prototype = Object.create(THREE.EventDispatcher.prototype);