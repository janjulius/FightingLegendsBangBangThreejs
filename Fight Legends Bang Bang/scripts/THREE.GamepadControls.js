/**
 * @author spite / https://github.com/spite
 */
/*global THREE, console */
THREE.GamepadControls = function() {

    this.rotMatrix = new THREE.Matrix4();
    this.dir = new THREE.Vector3(0, 0, 1);
    this.tmpVector = new THREE.Vector3();
    this.lon = -90;
    this.lat = 0;
    this.target = new THREE.Vector3();
    this.threshold = .05;
    this.deadZone = 0.3;

    this.init = function() {

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

    this.startPolling = function() {

        if (!this.ticking) {
            this.ticking = true;
            this.tick();
        }
    }

    this.stopPolling = function() {
        this.ticking = false;
    }

    this.tick = function() {
        this.pollStatus();
        this.scheduleNextTick();
    }

    this.scheduleNextTick = function() {

        if (this.ticking) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }

    this.pollStatus = function() {

        this.pollGamepads();

    }

    this.filter = function(v) {

        return (Math.abs(v) > this.threshold) ? v : 0;

    }

    this.pollGamepads = function() {

        var rawGamepads =
            (navigator.getGamepads && navigator.getGamepads()) ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads());


        if (rawGamepads) {

            if (!charSelect) {
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    if (rawGamepads[i]) {
                        var g = rawGamepads[i];
                        var dir = g.axes[0];
                        if (dir < this.deadZone && dir > -this.deadZone)
                            dir = 0;

                        p.direction = -dir;

                        if (g.buttons[0].value == 1) {
                            p.jump();
                        }

                    }
                }

            } else {
                for (var i = 0; i < rawGamepads.length; i++) {
                    var p = players[i];
                    var pad = rawGamepads[i];
                    if (pad) {
                        var dirH = pad.axes[0];
                        if (dirH < this.deadZone && dirH > -this.deadZone)
                            dirH = 0;
                        var dirV = pad.axes[1];
                        if (dirV < this.deadZone && dirV > -this.deadZone)
                            dirV = 0;
                        var spd = 0.5;

                        playerFiches[i].position.z -= dirH * spd;
                        playerFiches[i].position.y -= dirV * spd;

                        if (pad.buttons[0].value == 1) {
                            ray0 = new THREE.Raycaster(playerFiches[i].position, new THREE.Vector3(-1, 0, 0));
                            var intersects = ray0.intersectObjects(scene.children);
                            for (var j = 0; j < intersects.length; j++) {
                                players[i] = intersects[j].object.myCharId;
                                gameInterface.UpdateCharSelectInterface(i, players[i]);
                            }
                        }
                        if(i == 0){
                            if (pad.buttons[9].value == 1) {
                                charSelect = false;
                                runGame();
                                break;
                            }
                        }
                    }
                }
            }
        }

    }

    this.init();

};

THREE.GamepadControls.prototype = Object.create(THREE.EventDispatcher.prototype);