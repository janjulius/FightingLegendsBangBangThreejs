class Jens extends Character {

    constructor(y, z) {
        super();
        this.name = "Jens";
        this.cid = 6;
        this.portrait = 'sprites/Characters/MenuSprites/jens.png';
        this.finalUlt = false;
        this.ultDamage = 50;
        this.ultFinalDamage = 100;
        this.ballFallSpeed = 2;
        this.hitplayer = [false, false, false, false];
        this.hitFinalPlayer = [false, false, false, false];
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0xFF0000 }),
            1,
            1
        );

        this.specialAtkString = "Cannon Barrage";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            material,
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created " + this.name);
    }

    block() {
        //no block
    }

    specialAtk() {

        if (this.specialReady()) {
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
            for (var i = 0; i < this.hitplayer.length; i++) {
                this.hitplayer[i] = false;
                this.hitFinalPlayer[i] = false;
            }
            this.target = this.generateRandom(0,playersPlaying-1);
            this.finalUlt = false;
            this.endPos = new THREE.Vector3(players[this.target].position);

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
                    if ((this.specialObject.position.y - this.endPos.y) <= 2) {
                        this.specialTimer = 0.1;
                        this.finalUlt = true;
                    } else {
                        this.specialObject.position.y -= this.ballFallSpeed;
                        for (var i = 0; i < playersPlaying; i++) {
                            if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) <= 5) {
                                if (!this.hitplayer[i]) {
                                    players[i].setDamage(players[i].getDamage() + this.ultDamage, {
                                        y: 1,
                                        z: this.GetSpcDirection(players[i])
                                    });
                                    this.hitplayer[i] = true;
                                }
                            }
                        }
                    }
                }
            } else {
                if (this.specialTimer > 0) {
                    this.specialTimer -= t;
                    if (this.specialObject.scale.x < 3) {
                        this.specialObject.scale.set(2, 2, 2);
                    }
                    for (var i = 0; i < playersPlaying; i++) {
                        if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) < 15) {
                            if (!this.hitFinalPlayer[i]) {
                                players[i].setDamage(players[i].getDamage() + this.ultFinalDamage, {
                                    y: 1,
                                    z: this.GetSpcDirection(players[i])
                                });
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
            this.generateRandom(min, max);
        }
            return num;
    }

}