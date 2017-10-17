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
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            new THREE.MeshBasicMaterial({
                    color: 0x598D1B
                },
                1)
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created Fred");
    }

    specialAtk() {
        if (this.specialReady()) {
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
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
                                    }
                                );
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