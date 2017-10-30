class Paardman extends Character {

    constructor(y, z) {
        super();
        this.name = "Paardman";
        this.cid = 1;
        this.specialAtkString = "Stone, paper, scissors";
        this.portrait = 'sprites/Characters/MenuSprites/paardman2.png';
        this.modelOfset = new THREE.Vector3(0, 0, 0);
        this.modelHeight = 14;
        this.stoneThrowSpeed = 40;
        this.scissorThrowSpeed = 60;
        this.paperThrowSpeed = 1;
        this.target;
        this.stoneDamage = 60;
        this.scissorDamage = 80;
        this.paperDamage = 250;
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffad60
            }),
            0,
            0
        );
        material.transparent = true;
        material.opacity = 0.2;
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            material
        );

        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        this.loadModel();
        scene.add(this.geometry);
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

        loader.load('Models/Paardman/paardman.fbx', function (object) {
            object.scale.set(0.1, 0.1, 0.1);
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
            this.target = undefined;
            this.horseChoice = Math.floor((Math.random() * 3) + 1);
            switch (this.horseChoice) {
                case 1: //stone     
                    var stoneMaterial = Physijs.createMaterial(
                        new THREE.MeshBasicMaterial({
                            color: 0x4d4c4c
                        }),
                        1,
                        0
                    );

                    this.specialObject = new Physijs.BoxMesh(
                        new THREE.CubeGeometry(4, 4, 4),
                        stoneMaterial
                    );
                    this.specialExists = true;
                    this.specialTimer = 2;
                    this.specialObject.position.set(0, this.geometry.position.y, this.geometry.position.z + this.attackDirection.z * 5);
                    this.flyDirection = this.attackDirection.z;
                    this.stoneVelocity = new THREE.Vector3(0, 0, this.attackDirection.z * ((this.stoneThrowSpeed) + 1));

                    scene.add(this.specialObject);
                    break;
                case 2: //paper
                    var paperMaterial = Physijs.createMaterial(
                        new THREE.MeshBasicMaterial({
                            color: 0xffffff
                        }),
                        1,
                        0
                    );

                    this.specialObject = new Physijs.BoxMesh(
                        new THREE.CubeGeometry(0.1, 3, 1.2),
                        paperMaterial
                    );
                    this.specialExists = true;
                    this.specialTimer = 300;
                    this.specialObject.position.set(0, this.geometry.position.y, this.geometry.position.z + this.attackDirection.z * 5);
                    this.flyDirection = this.attackDirection.z;

                    scene.add(this.specialObject);

                    break;
                case 3: //scissors
                    var scissorMaterial = Physijs.createMaterial(
                        new THREE.MeshBasicMaterial({
                            color: 0xffffff
                        }),
                        1,
                        0
                    );

                    this.specialObject = new Physijs.BoxMesh(
                        new THREE.CubeGeometry(2, 0.2, 1),
                        scissorMaterial
                    );
                    this.specialExists = true;
                    this.specialTimer = 3;
                    this.specialObject.position.set(0, this.geometry.position.y, this.geometry.position.z + (this.attackDirection.z * 5));
                    this.flyDirection = this.attackDirection.z;

                    this.scissorVelocity = new THREE.Vector3(0, 0, this.attackDirection.z * ((this.scissorThrowSpeed) + 1));
                    scene.add(this.specialObject);

                    break;
            }
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer >= 0) {
                this.specialTimer -= t;
                switch (this.horseChoice) {
                    case 1:
                        this.specialObject.setLinearVelocity(this.stoneVelocity);

                        var _this = this;
                        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                            if (_this.specialObject._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.specialTimer = -1;
                                    }
                                }
                            }
                        });
                        break;

                    case 2:
                        this.specialObject.position.y -= 2;
                        var _this = this;
                        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                            if (_this.specialObject._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.specialTimer = -1;
                                    }
                                }
                            }
                        });
                        break;
                    case 3:
                        this.specialObject.setLinearVelocity(this.scissorVelocity);
                        var _this = this;
                        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                            if (_this.specialObject._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.specialTimer = -1;
                                    }
                                }
                            }
                        });
                        break;
                }
            }
            if (this.specialTimer <= 0) {
                this.specialExists = false;
                scene.remove(this.specialObject);
                if (this.target != undefined) {
                    if (this.target != this.id) {
                        switch (this.horseChoice) {
                            case 1: //stone
                                players[this.target].setDamage(players[this.target].getDamage() + this.stoneDamage, {
                                    y: 1,
                                    z: this.flyDirection
                                }, this.id, 1);
                                break;
                            case 2: //paper
                                players[this.target].setDamage(players[this.target].getDamage() + this.paperDamage, {
                                    y: 1,
                                    z: this.flyDirection
                                }, this.id, 1);
                                break;
                            case 3: //scissor
                                players[this.target].setDamage(players[this.target].getDamage() + this.scissorDamage, {
                                    y: 1,
                                    z: this.flyDirection
                                }, this.id, 1);
                                break;
                        }
                    }
                }
            }
        }
    }

}