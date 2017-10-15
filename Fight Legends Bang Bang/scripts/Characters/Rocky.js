class Rocky extends Character {

    constructor(y, z) {
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.clawDamage = 20;
        this.specialDamage = 20;
        this.clawed = [];
        this.clawed[0] = false; this.clawed[1] = false; this.clawed[2] = false;
        this.specialExists = false;
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            new THREE.MeshBasicMaterial({ color: 0xec00fb },
                1)
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created Rocky");
    }

    specialAtk() {
        this.clawed[0] = false; this.clawed[1] = false; this.clawed[2] = false;
        if (DEBUG_MODE) { this.setSpecialAttackCounter(100); }
        if (this.specialReady()) {
            this.target;
            for (var i = 0; i < playersPlaying; i++) {
                if (this.id == i) {
                    continue;
                }
                if (this.target === undefined) {
                    this.target = i;
                }
                if (distanceBetweenVector3(players[i].geometry.position, this.geometry.position)
                    <= distanceBetweenVector3(players[this.target].geometry.position, this.geometry.position)) {
                    console.log("ROCKY: target " + players[i].name + " is closer than " + players[this.target].name + "");
                    this.target = i;
                }
            }
            this.specialExists = true;
            this.specialTimer = 2;
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                console.log("test" + this.specialTimer);
                this.specialTimer -= t;
                if (this.specialTimer > 1.50 && this.specialTimer < 2) { //preparing
                    this.isStunned = true;
                }
                if (this.specialTimer > 1.25 && this.specialTimer < 1.50) { //jump
                    this.isStunned = false;
                    this.spJumpVelocity = new THREE.Vector3(0, 20, this.attackDirection.z * ((40) + 1));
                    this.geometry.setLinearVelocity(this.spJumpVelocity);
                }
                if (this.specialTimer > 0.5 && this.specialTimer < 1.25) { //dissapear
                    this.isStunned = true;
                    this.geometry.setLinearVelocity(new THREE.Vector3(0, 0, 0));
                    this.geometry.position.x = -10000;
                }
                if (this.specialTimer < 0.5) {
                    this.geometry.position.set(players[this.target].geometry.position.x, players[this.target].geometry.position.y,
                        players[this.target].geometry.position.z + -players[this.target].attackDirection.z * 5);
                    players[this.target].isStunned = true;
                    if (!this.clawed[0]) {
                        players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {y:0,z:0});
                        this.clawed[0] = true;
                    }
                    if (this.specialTimer < 0.375) {
                        if (!this.clawed[1]) {
                            players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {y:0,z:0});
                            this.clawed[1] = true;
                        }
                        if (this.specialTimer < 0.175) {
                            if (!this.clawed[2]) {
                                players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, {y:0,z:0});
                                this.clawed[2] = true;
                            }
                        }
                    }
                }
            }
            if (this.specialTimer <= 0) {
                console.log("ATTACK");
                players[this.target].isStunned = false;
                this.isStunned = false;
                this.specialExists = false;

                players[this.target].setDamage(players[this.target].getDamage() + this.specialDamage
                    , { y: 1, z: players[this.target].attackDirection.z });
                this.geometry.__dirtyPosition = true;
                this.geometry.__dirtyRotation = true;

            }
        }

    }

}