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

        var rawGamepads =
            (navigator.getGamepads && navigator.getGamepads()) ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads());

        if (rawGamepads) {

            if (!this.oldGamepad) {
                this.SetOldGamePadState(rawGamepads);
            }

            if (!charSelect) {
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    if (rawGamepads[i]) {
                        var g = rawGamepads[i];
                        var oldState = this.oldGamepad[i];
                        p.direction = this.filter(-g.axes[0]);

                        if (g.buttons[0].value == 1 && oldState[0] != g.buttons[0].value) {
                            p.jump();
                        }
                        if (g.buttons[2].value == 1 && oldState[2] != g.buttons[2].value && p.swingTimer <= 0) {
                            p.swingTimer = p.swingCooldown;
                            p.chargeAttack = true;
                        }
                    }
                }

            } else {
                for (var i = 0; i < rawGamepads.length; i++) {
                    var p = players[i];
                    var pad = rawGamepads[i];
                    if (pad) {
                        var spd = 0.2;
                        playerFiches[i].position.z -= this.filter(pad.axes[0]) * spd;
                        playerFiches[i].position.y -= this.filter(pad.axes[1]) * spd;

                        if (pad.buttons[0].value == 1) {
                            ray0 = new THREE.Raycaster(playerFiches[i].position, new THREE.Vector3(-1, 0, 0));
                            var intersects = ray0.intersectObjects(scene.children);
                            for (var j = 0; j < intersects.length; j++) {
                                players[i] = intersects[j].object.myCharId;
                                gameInterface.UpdateCharSelectInterface(i, players[i]);
                            }
                        }
                        if (i == 0) {
                            if (pad.buttons[9].value == 1) {
                                playersPlaying = rawGamepads.length;
                                charSelect = false;
                                runGame();
                                break;
                            }
                        }
                    }
                }
            }
            this.SetOldGamePadState(rawGamepads);
        }
    }

    this.init();

};

THREE.GamepadControls.prototype = Object.create(THREE.EventDispatcher.prototype);