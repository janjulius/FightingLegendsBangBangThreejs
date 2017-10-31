class Willem extends Character {

    constructor(y, z) {
        super();
        this.name = "Willem";
        this.size.width = 5;
        this.size.height = 7;
        this.moveSpeed = 300;
        this.cid = 0;
        this.ultDir;
        this.target;
        this.ultDamage = 100;
        this.ballSpeed = 80;
        this.modelOfset = new THREE.Vector3(0, -this.size.height / 2, 0);
        this.beginSPecial = false;
        this.specialExists = false;
        this.hitplayer = [false, false, false, false];
        this.ultCharging = false;
        this.portrait = 'sprites/Characters/MenuSprites/willem.png';
        this.willemUltStartSound = new Audio('Sounds/Characters/Willem/Willem_ult_sound.wav');

        this.UltAnimation = undefined;

        this.material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            0,
            0
        );

        this.Ultmaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            0,
            0
        );

        this.material.transparent = true;
        this.material.opacity = 0.2;
        this.specialAtkString = "Throw Snowball";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, this.size.height, this.size.width),
            this.material
        );

        this.specialObject = new Physijs.SphereMesh(
            new THREE.SphereGeometry(5, 16, 16),
            this.Ultmaterial
        );
        this.specialObject.position.set(-10000, y, z);
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        scene.add(this.specialObject);
        //this.geometry.setDamping(1,1);
        this.loadModel();
        console.log("created Willem");
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
        mtlLoader.setPath('Models/Raccoon/Raccoon/');
        mtlLoader.setBaseUrl('Models/Raccoon/Raccoon/');

        var _this = this;
        var loader = new THREE.FBXLoader(manager);

        loader.load('Models/Snowman/idle.fbx', function (object) {
            object.scale.set(0.4, 0.4, 0.4);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

            _this.idleAnim = object.mixer.clipAction(object.animations[0]);
            _this.idleAnim.play();

            loader.load('Models/Snowman/Running.fbx', function (object) {
                _this.runningAnim = _this.model.mixer.clipAction(object.animations[0]);
            }, onProgress, onError);
            loader.load('Models/Snowman/Flip.fbx', function (object) {
                _this.UltAnimation = _this.model.mixer.clipAction(object.animations[0]);
                _this.UltAnimation.setLoop(THREE.LoopOnce, 1);
            }, onProgress, onError);
            loader.load('Models/Snowman/Stomp.fbx', function (object) {
                _this.stompAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.stompAnim.setLoop(THREE.LoopOnce, 1);
                _this.stompAnim.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Snowman/Punch.fbx', function (object) {
                _this.punchAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.punchAnim.setLoop(THREE.LoopOnce, 1);
                _this.punchAnim.timeScale = 3;
            }, onProgress, onError);
            loader.load('Models/Snowman/Throw.fbx', function (object) {
                _this.throwAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.throwAnim.setLoop(THREE.LoopOnce, 1);
                _this.throwAnim.timeScale = 3;
            }, onProgress, onError);

        }, onProgress, onError);
    }

    pressedbuttonY() {
        if (this.specialReady())
            this.TotalUltsUsed++;

        this.specialAtk();
    }

    specialAtk() {
        if (this.specialExists && !this.ultCharging) {
            this.UltAnimation.stop();
            this.EndSpecial();
        }
        if (this.specialReady() && !this.specialExists && !this.isStunned) {
            this.setSpecialAttackCounter(0);
            this.runningAnim.stop();
            this.idleAnim.stop();
            this.UltAnimation.play();
            var dir = this.attackDirection.z == 0 ? -1 : this.attackDirection.z;
            this.ballVelocity = new THREE.Vector3(0, 0, dir * ((this.ballSpeed) + 1));
            this.willemUltStartSound.play();
            this.specialTimer = 5;
            this.beginSPecial = true;
            this.specialExists = true;
            this.ultpos = this.geometry.position;
            this.oldpos = this.geometry.position;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;
                if (this.specialTimer > 4.45 && this.specialTimer < 5) {
                    this.velt = 0;
                    this.isStunned = true;
                    this.ultCharging = true;
                }
                if (this.specialTimer < 4.4 && this.beginSPecial) {
                    var pos = this.geometry.position;
                    this.specialObject.position.set(0, pos.y + (this.CheckSides("down") ? this.size.height : 0), pos.z);
                    this.specialObject.__dirtyPosition = true;
                    this.isStunned = true;
                    this.velt = 0;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);
                    this.geometry.__dirtyPosition = true;
                    this.beginSPecial = false;
                }

                if (this.specialTimer < 4.4) {
                    this.ultCharging = false;
                    if (this.ballVelocity.y > -70)
                        this.ballVelocity.y -= 80 * t;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);
                    this.geometry.__dirtyPosition = true;

                    this.specialObject.setLinearVelocity(this.ballVelocity);
                    for (var i = 0; i < playersPlaying; i++) {
                        if (i == this.id) {
                            continue;
                        }

                        if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) <= 12) {

                            if (!this.hitplayer[i]) {
                                players[i].setDamage(players[i].getDamage() + this.ultDamage, {
                                    y: 1,
                                    z: this.GetSpcDirection(players[i])
                                }, this.id, 1);
                                this.hitplayer[i] = true;
                            }
                        }
                    }
                }
            }
            if (this.specialTimer <= 0) {
                this.EndSpecial();
            }
        }
    }

    EndSpecial() {
        this.velt = 0;
        this.setSpecialAttackCounter(0);
        this.jumpsLeft = this.totalJump;
        this.isStunned = false;
        this.geometry.__dirtyPosition = true;
        this.specialObject.__dirtyPosition = true;
        this.geometry.position.set(0, this.specialObject.position.y, this.specialObject.position.z);
        this.specialObject.position.set(-1000, 0, 0);
        this.specialExists = false;
        for (var i = 0; i < this.hitplayer.length; i++) {
            this.hitplayer[i] = false;
        }
    }
    GetSpcDirection(p) {
        if ((p.geometry.position.z - this.geometry.position.z) <= 0) {
            return -1;
        } else {
            return 1;
        }
    }

}