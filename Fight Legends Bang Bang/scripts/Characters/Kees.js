class Kees extends Character {

    constructor(y, z) {
        super();
        this.name = "Kees";
        this.size.width = 5;
        this.size.height = 5;
        this.cid = 4;
        this.portrait = 'sprites/Characters/MenuSprites/kees.png';
        this.hitplayer = [false, false, false, false];
        this.stunnedTimer;
        this.stunTime = 1.9; // +0.1
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x786e6e
            }),
            0,
            0
        );

        this.specialAtkString = "Expose to the light";
        this.modelOfset = new THREE.Vector3(0, -this.size.height / 2, 0);
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, this.size.height, this.size.width),
            material,
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        this.loadModel();
        console.log("created " + this.name);
    }

    loadModel() {
        console.log("loading model...");
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function (xhr) {
            console.log(xhr);
        };

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var mtlLoader = new THREE.MTLLoader();

        var _this = this;
        var loader = new THREE.FBXLoader(manager);

        loader.load('Models/kees/Idle.fbx', function (object) {
            object.scale.set(1, 1, 1);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

            _this.idleAnim = object.mixer.clipAction(object.animations[0]);
            _this.idleAnim.play();
            
            loader.load('Models/kees/Running.fbx', function (object) {
                _this.runningAnim = _this.model.mixer.clipAction(object.animations[0]);
            }, onProgress, onError);

        }, onProgress, onError);
    }


    specialAtk() {
        if (this.specialReady()) {
            this.setSpecialAttackCounter(0);
            this.specialTimer = 1;
            this.specialExists = true;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > -2) {
                this.specialTimer -= t;
            }
            if (this.specialTimer < 1) {
                this.isStunned = true;
            }
            if (this.specialTimer <= 0.1) {
                this.stunnedTimer = this.stunTime;
                if (this.attackDirection.z == -1) {
                    for (var i = 0; i < playersPlaying; i++) {
                        if (players[i].attackDirection.z == 1 && (players[i].geometry.position.z < this.geometry.position.z)) {
                            players[i].isStunned = true;
                            if (!this.hitplayer[i] && Math.abs((distanceBetweenVector3(
                                this.geometry.position, players[i].geometry.position)) < 100 ))
                                {    
                                players[i].setDamage(players[i].getDamage() + 100 -(
                                    Math.abs((distanceBetweenVector3(
                                        this.geometry.position, players[i].geometry.position)))
                                ), {
                                    y: 0,
                                    z: 0
                                }, this.id, 1);
                                this.hitplayer[i] = true;
                            }
                        }
                    }
                }
                if (this.attackDirection.z == 1) {
                    for (var i = 0; i < playersPlaying; i++) {
                        if (players[i].attackDirection.z == -1 && (players[i].geometry.position.z > this.geometry.position.z)) {
                            players[i].isStunned = true;
                            if (!this.hitplayer[i] && Math.abs((distanceBetweenVector3(
                                this.geometry.position, players[i].geometry.position)) < 100 ))
                                {    
                                players[i].setDamage(players[i].getDamage() + 100 -(
                                    Math.abs((distanceBetweenVector3(
                                        this.geometry.position, players[i].geometry.position)))
                                ), {
                                    y: 0,
                                    z: 0
                                }, this.id, 1);
                                this.hitplayer[i] = true;
                            }
                        }
                    }
                }
            }
            if (this.specialTimer < 0) {
                this.isStunned = false;
                this.specialExists = false;
            }
        }
        if (this.stunnedTimer > 0) {
            this.stunnedTimer -= t;
        }
        if (this.stunnedTimer <= 0) {
            for (var i = 0; i < playersPlaying; i++) {
                if (this.hitplayer[i]) {
                    players[i].isStunned = false;
                    this.hitplayer[i] = false;
                }
            }
        }
    }

}