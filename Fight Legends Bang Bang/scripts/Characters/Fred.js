class Fred extends Character {

    constructor(y, z) {
        super();
        this.name = "Fred";
        this.size.width = 5;
        this.size.height = 5;
        this.extraname = "der goblin";
        this.cid = 3;
        this.specialAtkString = "Hammer smash!";
        this.modelOfset = new THREE.Vector3(0, -this.size.height / 2, 0);
        this.hammerSmashDamage = 90;
        this.spcTimer = 0;
        this.specialExistTime = 0.2;
        this.specialRange = 20;
        this.specialExists = false;
        this.spcTargets = [];
        this.ultSound = new Audio('Sounds/Characters/Fred/Fred_ult_sound.wav');
        this.portrait = 'sprites/Characters/MenuSprites/fred.png';
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0F8C00
            }),
            0,
            0
        );
        material.transparent = true;
        material.opacity = 0.2;
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, this.size.height, this.size.width),
            material
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        this.loadModel();
        console.log("created Fred");
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

        loader.load('Models/Goblin/new/Idle.fbx', function (object) {
            object.scale.set(1, 1, 1);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

            _this.idleAnim = object.mixer.clipAction(object.animations[0]);
            _this.idleAnim.play();
            
            loader.load('Models/Goblin/new/Running.fbx', function (object) {
                _this.runningAnim = _this.model.mixer.clipAction(object.animations[0]);
            }, onProgress, onError);
            
            loader.load('Models/Goblin/new/Stomp.fbx', function (object) {
                _this.stompAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.stompAnim.setLoop(THREE.LoopOnce, 1);
            }, onProgress, onError);
            loader.load('Models/Goblin/new/Punch.fbx', function (object) {
                _this.punchAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.punchAnim.setLoop(THREE.LoopOnce, 1);
            }, onProgress, onError);
            loader.load('Models/Goblin/new/Throw.fbx', function (object) {
                _this.throwAnim = _this.model.mixer.clipAction(object.animations[0]);
                _this.throwAnim.setLoop(THREE.LoopOnce, 1);
            }, onProgress, onError);

        }, onProgress, onError);
    }


    specialAtk() {
        if (this.specialReady()) {
            this.setSpecialAttackCounter(0);
            var specialMaterial = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                }),
                1,
                0
            );
            this.specialObject = new THREE.Mesh(
                new THREE.SphereGeometry(5, 5, 5),
                specialMaterial
            );

            this.spcTimer = this.specialExistTime;
            this.specialExists = true;
            this.specialObject.position.set(this.geometry.position.x, this.geometry.position.y, this.geometry.position.z);
            scene.add(this.specialObject);
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {

            if (this.spcTimer > 0) {
                this.spcTimer -= t;
                this.specialObject.scale.set(this.specialObject.scale.x += 0.15, this.specialObject.scale.y += 0.15, this.specialObject.scale.z += 0.15);
            }
            if (this.spcTimer <= 0) {
                this.specialExists = false;
                this.spcTargets = [];
                for (var i = 0; i < playersPlaying; i++) {
                    if (i == this.id) {
                        continue;
                    }
                    if (distanceBetweenVector3(this.geometry.position, players[i].geometry.position) <= this.specialRange) {
                        this.spcTargets.push(players[i].getId());
                    }
                }
                this.ultSound.play();
                if (this.spcTargets.length != 0) {
                    for (var i = 0; i < this.spcTargets.length; i++) {
                        for (var j = 0; j < playersPlaying; j++) {
                            if (players[j].getId() == this.spcTargets[i]) {
                                this.setSpecialAttackCounter(0);
                                players[this.spcTargets[i]].setDamage(
                                    players[this.spcTargets[i]].getDamage() + this.hammerSmashDamage, {
                                        y: 1,
                                        z: this.GetSpcDirection(
                                            players[this.spcTargets[i]]
                                        )
                                    }, this.id, 1);
                            }
                        }

                    }
                }
                scene.remove(this.specialObject);
            }
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