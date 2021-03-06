class Rocky extends Character {

    constructor(y, z) {
        super();
        this.name = "Rocky";
        this.size.width = 5;
        this.size.height = 7;
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.clawDamage = 12;
        this.specialDamage = 17;
        this.ultRange = 400;
        this.modelOfset = new THREE.Vector3(0, -this.size.height / 2, 0);
        this.clawed = [];
        this.clawed[0] = false;
        this.clawed[1] = false;
        this.clawed[2] = false;

        var soundFolderPath = 'Sounds/Characters/Rocky/';
        this.ultVanishAudio = new Audio(soundFolderPath + 'Rocky_ult_vanish.wav');
        this.claw1HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.claw2HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.claw3HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.finalClawHitAudio = new Audio(soundFolderPath + 'Rocky_final_claw_hit.wav');
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xec00fb
            }),
            0,
            0
        );
        material.transparent = true;
        material.opacity = 0.0;
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, this.size.height, this.size.width),
            material
        );

        this.loadModel();
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created Rocky");
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
        var onError = function (xhr) { console.log(xhr); };

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('Models/Raccoon/Raccoon/');
        mtlLoader.setBaseUrl('Models/Raccoon/Raccoon/');

        var _this = this;
        var loader = new THREE.FBXLoader(manager);


        loader.load('Models/Raccoon/Raccoon/idle.fbx', function (object) {
            object.scale.set(0.06, 0.06, 0.06);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

            _this.idleAnim = object.mixer.clipAction(object.animations[0]);
            _this.idleAnim.play();

            loader.load('Models/Raccoon/Raccoon/running.fbx', function (object) {
                _this.runningAnim = _this.model.mixer.clipAction(object.animations[0]);
            }, onProgress, onError);
            loader.load('Models/Raccoon/Raccoon/slash1.fbx', function (object) {
                _this.UltAnimation1 = _this.model.mixer.clipAction(object.animations[0]);
                _this.UltAnimation1.setLoop(THREE.LoopOnce, 1);
                _this.UltAnimation1.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Raccoon/Raccoon/slash2.fbx', function (object) {
                _this.UltAnimation2 = _this.model.mixer.clipAction(object.animations[0]);
                _this.UltAnimation2.setLoop(THREE.LoopOnce, 1);
                _this.UltAnimation2.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Raccoon/Raccoon/punch.fbx', function (object) {
                _this.punchAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.punchAnim.setLoop(THREE.LoopOnce, 1);
                _this.punchAnim.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Raccoon/Raccoon/stomp.fbx', function (object) {
                _this.stompAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.stompAnim.setLoop(THREE.LoopOnce, 1);
                _this.stompAnim.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Raccoon/Raccoon/throw.fbx', function (object) {
                _this.throwAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.throwAnim.setLoop(THREE.LoopOnce, 1);
                _this.throwAnim.timeScale = 3;
            }, onProgress, onError);
            
        }, onProgress, onError);
    }
    specialAtk() {
        this.clawed[0] = false;
        this.clawed[1] = false;
        this.clawed[2] = false;
        if (this.specialReady()) {
            this.UltAnimation1.stop();
            this.UltAnimation2.stop();
            this.setSpecialAttackCounter(0);
            this.target;
            for (var i = 0; i < playersPlaying; i++) {
                if (this.id == i) {
                    continue;
                }
                if (this.target === undefined) {
                    this.target = i;
                }
                if (distanceBetweenVector3(players[i].geometry.position, this.geometry.position) <= this.ultRange) {
                    if (distanceBetweenVector3(players[i].geometry.position, this.geometry.position) <=
                        distanceBetweenVector3(players[this.target].geometry.position, this.geometry.position)) {
                        this.target = i;
                    }
                }
            }
            this.specialExists = true;
            this.specialTimer = 2;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;
                if (this.specialTimer > 2 && this.specialTimer < 2.5) { //preparing
                    this.isStunned = true;
                }
                if (this.specialTimer > 1.75 && this.specialTimer < 2) { //jump
                    this.ultVanishAudio.play();
                    this.isStunned = false;
                    this.spJumpVelocity = new THREE.Vector3(0, 20, this.attackDirection.z * ((40) + 1));
                    this.geometry.setLinearVelocity(this.spJumpVelocity);
                }
                if (this.specialTimer > 1 && this.specialTimer < 1.75) { //dissapear
                    this.isStunned = true;
                    this.geometry.setLinearVelocity(new THREE.Vector3(0, 0, 0));
                    this.geometry.position.x = -10000;
                }
                if (this.specialTimer < 1) {
                    this.geometry.position.set(players[this.target].geometry.position.x, players[this.target].geometry.position.y,
                        players[this.target].geometry.position.z + -players[this.target].attackDirection.z * ((this.size.width / 2) + (players[this.target].size.width / 2)));
                    players[this.target].isStunned = true;
                    if (!this.clawed[0]) {
                        players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {
                            y: 0,
                            z: 0
                        }, this.id, 1);
                        this.clawed[0] = true;
                        this.claw1HitAudio.play();
                        this.UltAnimation1.play();
                    }
                    if (this.specialTimer < 0.625) {
                        if (!this.clawed[1]) {
                            players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {
                                y: 0,
                                z: 0
                            }, this.id, 1);
                            this.clawed[1] = true;
                            this.claw2HitAudio.play();
            this.UltAnimation1.stop();
            this.UltAnimation2.play();
                        }
                        if (this.specialTimer < 0.3) {
                            if (!this.clawed[2]) {
                                players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {
                                    y: 0,
                                    z: 0
                                }, this.id, 1);
                                this.clawed[2] = true;
                                this.claw3HitAudio.play();
            this.UltAnimation2.stop();
            
            this.UltAnimation1.play();
                            }
                        }
                    }
                }
            }
            if (this.specialTimer <= 0) {
                players[this.target].isStunned = false;
                this.isStunned = false;
                this.specialExists = false;
                this.finalClawHitAudio.play();

                players[this.target].setDamage(players[this.target].getDamage() + this.specialDamage, {
                    y: 1,
                    z: players[this.target].attackDirection.z
                }, this.id, 1);
                this.geometry.__dirtyPosition = true;
                this.geometry.__dirtyRotation = true;

            }
        }

    }

}