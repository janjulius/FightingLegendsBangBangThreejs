/**
 * @author spite / https://github.com/spite
 */
/*global THREE, console */

THREE.GamepadControls = function ( ) {
    
        this.rotMatrix = new THREE.Matrix4();
        this.dir = new THREE.Vector3( 0, 0, 1 );
        this.tmpVector = new THREE.Vector3();
        this.lon = -90;
        this.lat = 0;
        this.target = new THREE.Vector3();
        this.threshold = .05;
    
        this.init = function(){
    
            var gamepadSupportAvailable = navigator.getGamepads ||
            !!navigator.webkitGetGamepads ||
            !!navigator.webkitGamepads;
    
            if (!gamepadSupportAvailable) {
                console.log( 'NOT SUPPORTED' );
            } else {
                if ('ongamepadconnected' in window) {
                    window.addEventListener('gamepadconnected', onGamepadConnect.bind( this ), false);
                    window.addEventListener('gamepaddisconnected', gamepadSupport.onGamepadDisconnect.bind( this ), false);
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
                requestAnimationFrame( this.tick.bind( this ) );
            }
        }
    
        this.pollStatus = function() {
    
            this.pollGamepads();
    
        }
    
        this.filter = function( v ) {
    
            return ( Math.abs( v ) > this.threshold ) ? v : 0;
    
        }
    
        this.pollGamepads = function() {
    
            var rawGamepads =
            (navigator.getGamepads && navigator.getGamepads()) ||
            (navigator.webkitGetGamepads && navigator.webkitGetGamepads());
            
            console.log("length: " + rawGamepads.length);
    
            if( rawGamepads ) {
                
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    if(rawGamepads[i]){
                        var g = rawGamepads[ i ];
                        console.log(i);
                        var dir = g.axes[0];
                        if(dir < 0.2 && dir > -0.2)
                            dir = 0;

                        p.direction = -dir;

                    }
                }

                
            }
    
        }
    
        this.init();
        
    };
    
    THREE.GamepadControls.prototype = Object.create( THREE.EventDispatcher.prototype );