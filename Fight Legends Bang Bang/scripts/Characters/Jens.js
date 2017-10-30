class Jens extends Character {

    constructor(y, z) {
        super();
        this.name = "Jens";
        this.cid = 6;
        this.portrait = 'sprites/Characters/MenuSprites/jens.png';
        this.modelOfset = new THREE.Vector3(4, -2.5, 0);
        this.modelHeight = 14;
        this.finalUlt = false;
        this.ultDamage = 50;
        this.ultFinalDamage = 100;
        this.ballFallSpeed = 2;
        this.hitplayer = [false, false, false, false];
        this.hitFinalPlayer = [false, false, false, false];

        this.bombFallingAudio = new Audio('Sounds/Characters/Jens/Bomb_falling.mp3');
        this.bombExploding = new Audio('Sounds/Characters/Jens/Bomb_explode.wav');
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x000000
            }),
            0,
            0
        );

        material.transparent = true;
        material.opacity = 0.2;
        this.specialAtkString = "Cannon Barrage";
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

        loader.load('Models/Panda/Panda.fbx', function (object) {
            object.scale.set(6, 6, 6);
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

        if (this.specialReady()) {
            this.setSpecialAttackCounter(0);
            for (var i = 0; i < this.hitplayer.length; i++) {
                this.hitplayer[i] = false;
                this.hitFinalPlayer[i] = false;
            }
            this.target = this.generateRandom(0, playersPlaying - 1);
            this.finalUlt = false;
            this.endPos = new THREE.Vector3(players[this.target].geometry.position.x, players[this.target].geometry.position.y, players[this.target].geometry.position.z);

            this.specialObject = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32),
                new THREE.MeshBasicMaterial({
                    color: 0xff0000
                }));
            scene.add(this.specialObject);
            this.specialTimer = 30;
            this.specialExists = true;
            this.specialObject.position.set(0, level.topLeft.y, players[this.target].geometry.position.z);

        }

    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (!this.finalUlt) {
                if (this.specialTimer > 0) {
                    this.specialTimer -= t;
                    if (Math.abs((this.specialObject.position.y - this.endPos.y)) <= 2) {
                        this.specialTimer = 0.1;
                        this.finalUlt = true;
                    } else {
                        for (var i = 0; i < playersPlaying; i++) {
                            if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) <= 5) {
                                if (!this.hitplayer[i]) {
                                    players[i].setDamage(players[i].getDamage() + this.ultDamage, {
                                        y: 1,
                                        z: this.GetSpcDirection(players[i])
                                    }, this.id, 1);
                                    this.hitplayer[i] = true;
                                }
                            }
                        }
                        this.specialObject.position.y -= this.ballFallSpeed;
                        this.bombFallingAudio.play();
                    }
                }
            } else {
                if (this.specialTimer > 0) {
                    this.specialTimer -= t;
                    if (this.specialObject.scale.x < 3) {
                        this.specialObject.scale.set(2, 2, 2);
                    }
                    this.bombFallingAudio.pause();
                    this.bombExploding.play();
                    for (var i = 0; i < playersPlaying; i++) {
                        if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) < 15) {
                            if (!this.hitFinalPlayer[i]) {
                                players[i].setDamage(players[i].getDamage() + this.ultFinalDamage, {
                                    y: 1,
                                    z: this.GetSpcDirection(players[i])
                                }, this.id, 1);
                                this.hitFinalPlayer[i] = true;
                            }
                        }
                    }
                }
                if (this.specialTimer <= 0) {
                    scene.remove(this.specialObject);
                    this.specialExists = false;
                }
            }
        }
    }
    GetSpcDirection(p) {
        if ((p.geometry.position.z - this.specialObject.position.z) <= 0) {
            return -1;
        } else {
            return 1;
        }
    }

    generateRandom(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!players[num].isAlive) {
            num = this.generateRandom(min, max);
        }
        return num;
    }

}