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
        return this.gamePad[id].buttons[b].value == 1 && this.oldGamepad[id][b] != this.gamePad[id].buttons[b].value;
    }


    this.SetOldGamePadState = function (a) {
        this.oldGamepad = new Array(4);
        for (var i = 0; i < a.length; i++) {
            this.oldGamepad[i] = new Array(17);
            for (var j = 0; j < a[i].buttons.length; j++) {
                this.oldGamepad[i][j] = a[i].buttons[j].value;
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
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    if (this.gamePad[i]) {
                        var g = this.gamePad[i];
                        p.direction.z = this.filter(-g.axes[0]);
                        p.direction.y = this.filter(-g.axes[1]);

                        if (this.PressedButton(i, 0)) {
                            p.jump();
                        }
                        if (this.PressedButton(i, 2) && !p.isStunned && p.swingTimer <= 0) {
                            p.swingTimer = p.swingCooldown;
                            p.chargeAttack = true;
                        }
                        if (this.PressedButton(i, 3) && !p.isStunned) {
                            p.specialAtk();
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
                                selectSound.play();
                            }
                        }
                        if (i == 0) {
                            if (pad.buttons[9].value == 1) {
                                playersPlaying = this.gamePad.length;
                                charSelect = false;
                                runGame();
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