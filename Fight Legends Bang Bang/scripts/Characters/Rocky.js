class Rocky extends Character {

    constructor(y, z) {
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.clawDamage = 12;
        this.specialDamage = 17;
        this.ultRange = 400;
        this.clawed = [];
        this.clawed[0] = false; this.clawed[1] = false; this.clawed[2] = false;

        var soundFolderPath = 'Sounds/Characters/Rocky/';
        this.ultVanishAudio = new Audio(soundFolderPath + 'Rocky_ult_vanish.wav');
        this.claw1HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.claw2HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.claw3HitAudio = new Audio(soundFolderPath + 'Rocky_Claw_hit.wav');
        this.finalClawHitAudio = new Audio(soundFolderPath + 'Rocky_final_claw_hit.wav');
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
        if (this.specialReady()) {
            this.target;
            for (var i = 0; i < playersPlaying; i++) {
                if (this.id == i) {
                    continue;
                }
                if (this.target === undefined) {
                    this.target = i;
                }
                if (distanceBetweenVector3(players[i].geometry.position, this.geometry.position) <= this.ultRange) {
                    if (distanceBetweenVector3(players[i].geometry.position, this.geometry.position)
                        <= distanceBetweenVector3(players[this.target].geometry.position, this.geometry.position)) {
                        this.target = i;
                    }
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
                        players[this.target].geometry.position.z + -players[this.target].attackDirection.z * 5);
                    players[this.target].isStunned = true;
                    if (!this.clawed[0]) {
                        players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, { y: 0, z: 0 });
                        this.clawed[0] = true;
                        this.claw1HitAudio.play();
                    }
                    if (this.specialTimer < 0.625) {
                        if (!this.clawed[1]) {
                            players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, { y: 0, z: 0 });
                            this.clawed[1] = true;
                            this.claw2HitAudio.play();
                        }
                        if (this.specialTimer < 0.3) {
                            if (!this.clawed[2]) {
                                players[this.target].setDamage(players[this.target].getDamage() + this.clawDamage, { y: 0, z: 0 });
                                this.clawed[2] = true;
                                this.claw3HitAudio.play();
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

                players[this.target].setDamage(players[this.target].getDamage() + this.specialDamage
                    , { y: 1, z: players[this.target].attackDirection.z });
                this.geometry.__dirtyPosition = true;
                this.geometry.__dirtyRotation = true;

            }
        }

    }

}