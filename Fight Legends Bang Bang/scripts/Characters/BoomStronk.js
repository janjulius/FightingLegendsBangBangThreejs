class BoomStronk extends Character {

    constructor(y, z) {
        super();
        this.name = "Boom Stronk";
        this.Speed = 12;
        this.cid = 5;
        this.hitSomeone = false;
        this.maxGrav = this.maxGravityVelocity;
        this.gravVel = this.gravityVelocity;
        this.specialDamage = 50;
        this.specialHealing = false;
        this.portrait = 'sprites/Characters/MenuSprites/boom_stronk.png';
        this.modelOfset = new THREE.Vector3(0, -2.5, 0);

        this.ultStartSound = new Audio('Sounds/Characters/Boom Stronk/Boom_stronk_ult_start.wav');
        this.ultEnd1Sound = new Audio('Sounds/Characters/Boom Stronk/Boom_stronk_ult_end_1.wav');
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0x4b0909 }),
            0,
            0
        );

        
        material.transparent = true;
        material.opacity = 0.2;

        this.specialAtkString = "Take root";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
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

        loader.load('Models/Boomstronk/Boomstronk.fbx', function (object) {
            object.scale.set(1, 1, 1);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

                console.log(object);
            // if (_this.anim.length > 0) {
            //     var action = object.mixer.clipAction(_this.anim[0].animations[0]);
            //     console.log(action);
            //     //action.play();
            // }
        }, onProgress, onError);
    }

    specialAtk() {
        this.healval = this.getDamage();
        this.hitSomeone = false;
        this.specialHealing = false;
        if (this.specialReady()) {
            this.ultStartSound.play();
            this.setSpecialAttackCounter(0);
            this.specialExists = true;
            this.specialTimer = 5;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;

                if (this.specialHealing) {
                    this.isStunned = true;
                    if (this.specialTimer > 2) {
                        this.setDamage(Math.floor(this.healval / 5), { y: 0, z: 0 }, this.id, 2);
                        this.maxGravityVelocity = 50;
                        this.gravityVelocity = 80;
                    } if (this.specialTimer > 1 && this.specialTimer < 2) {
                        this.setDamage(Math.floor(this.healval / 5), { y: 0, z: 0 }, this.id, 2);
                    } if (this.specialTimer < 1) {
                        this.setDamage(Math.floor(this.healval / 5), { y: 0, z: 0 }, this.id, 2);
                        this.isStunned = false;
                    } if (this.specialTimer < 0.1) {
                        this.specialHealing = true;
                        this.hitSomeone = true;
                        this.setSpecialAttackCounter(0);
                    }

                } else {
                    if (this.CheckSides("down")) {
                        this.ultEnd1Sound.play();
                        this.specialTimer = 0;
                    }
                    var _this = this;
                    this.geometry.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                        if (!_this.hitSomeone) {
                            if (_this.geometry._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.hitSomeone = true;
                                        players[_this.target].geometry.__dirtyPosition = true;
                                        players[_this.target].geometry.position.set(players[_this.target].geometry.position.x, players[_this.target].geometry.position.y, players[_this.target].geometry.position.z + 5 * _this.GetSpcDirection(players[_this.target]));
                                        players[_this.target].setDamage(players[_this.target].getDamage() + -_this.velt / 3, { y: 1, z: _this.GetSpcDirection(players[_this.target]) }, _this.id, 1);
                                        _this.specialExists = false;
                                        _this.setSpecialAttackCounter(0);
                                    }
                                }
                            }
                        }
                    });
                }
                if (!this.CheckSides("down") && !this.hitSomeone) {
                    this.maxGravityVelocity = 500;
                    this.gravityVelocity = 500;
                }
            }
            if (this.specialTimer <= 0) {
                if (!this.hitSomeone && !this.specialHealing) {
                    this.specialHealing = true;
                    this.hitSomeone = true;
                    this.specialTimer = 3;
                } else {
                    this.specialExists = false;
                    this.maxGravityVelocity = this.maxGrav;
                    this.gravityVelocity = this.gravVel;
                }
            }
        } else {
            this.hitSomeone = true;
            this.maxGravityVelocity = this.maxGrav;
            this.gravityVelocity = this.gravVel;
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