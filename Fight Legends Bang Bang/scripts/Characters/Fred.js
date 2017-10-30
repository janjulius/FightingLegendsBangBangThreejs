class Fred extends Character {

    constructor(y, z) {
        super();
        this.name = "Fred";
        this.extraname = "der goblin";
        this.cid = 3;
        this.specialAtkString = "Hammer smash!";
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
        //material.opacity = 0.2;
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            material
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        //this.loadModel();
        console.log("created Fred");
    }

    // loadModel() {
    //     console.log("loading model...");
    //     var manager = new THREE.LoadingManager();
    //     manager.onProgress = function (item, loaded, total) {
    //         console.log(item, loaded, total);
    //     };

    //     var onProgress = function (xhr) {
    //         if (xhr.lengthComputable) {
    //             var percentComplete = xhr.loaded / xhr.total * 100;
    //             console.log(Math.round(percentComplete, 2) + '% downloaded');
    //         }
    //     };
    //     var onError = function (xhr) { console.log(xhr); };

    //     THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    //     var mtlLoader = new THREE.MTLLoader();
    //     mtlLoader.setPath('Models/Raccoon/Raccoon/');
    //     mtlLoader.setBaseUrl('Models/Raccoon/Raccoon/');

    //     var _this = this;
    //     var loader = new THREE.FBXLoader(manager);

    //     loader.load('Models/Goblin/Goblin.fbx', function (object) {
    //         object.scale.set(0.06, 0.06, 0.06);
    //         _this.pivot.add(object);
    //         _this.geometry.add(_this.pivot);
    //         object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
    //         _this.model = object;
    //         object.mixer = new THREE.AnimationMixer(object);
    //         _this.mixers.push(object.mixer);

    //         if (_this.anim.length > 0) {
    //             var action = object.mixer.clipAction(_this.anim[0].animations[0]);
    //             console.log(action);
    //             action.play();
    //         }
    //     }, onProgress, onError);

    //     console.log(this.model + "BTW");

    //     // mtlLoader.load('Models/Raccoon/Raccoon/mixamo_raccoon.mtl', function (materials) {
    //     //     console.log("HI");
    //     //     materials.preload();

    //     //     var objLoader = new THREE.OBJLoader();
    //     //     objLoader.setMaterials(materials);
    //     //     objLoader.setPath('Models/Raccoon/Raccoon/');
    //     //     objLoader.load('mixamo_raccoon.obj', function (object) {
    //     //         object.scale.set(0.06, 0.06, 0.06);
    //     //         _this.pivot.add(object);
    //     //         _this.geometry.add(_this.pivot);
    //     //         object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
    //     //         //scene.add(_this.pivot);
    //     //         _this.model = object;
    //     //         console.log("MY OBJECT IS " + object);
    //     //     }, onProgress, onError);

    //     // });
    // }

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