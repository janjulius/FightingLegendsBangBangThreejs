class Kees extends Character {

    constructor(y, z) {
        super();
        this.name = "Kees";
        this.cid = 4;
        this.portrait = 'sprites/Characters/MenuSprites/kees.png';
        this.hitplayer = [false, false, false, false];
        this.stunnedTimer;
        this.stunTime = 1.9; // +0.1
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0x786e6e }),
            1,
            1
        );

        this.specialAtkString = "Expose to the light";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            material,
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created " + this.name);
    }


    specialAtk() {
        if (this.specialReady()) {
            this.setSpecialAttackCounter(0);
            this.specialTimer = 1;
            this.specialExists = true;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > -2) {
                this.specialTimer -= t;
            }
            if (this.specialTimer < 1) {
                this.isStunned = true;
            }
            if (this.specialTimer <= 0.1) {
                this.stunnedTimer = this.stunTime;
                if (this.attackDirection.z == -1) {
                    for (var i = 0; i < playersPlaying; i++) {
                        if (players[i].attackDirection.z == 1 && (players[i].geometry.position.z < this.geometry.position.z)) {
                            players[i].isStunned = true;
                            if (!this.hitplayer[i]) {
                                players[i].setDamage(players[i].getDamage() + (
                                    Math.abs((distanceBetweenVector3(
                                        this.geometry.position, players[i].geometry.position))
                                    )
                                ),
                                    { y: 0, z: 0 }
                                );
                                this.hitplayer[i] = true;
                            }
                        }
                    }
                }
                if (this.attackDirection.z == 1) {
                    for (var i = 0; i < playersPlaying; i++) {
                        if (players[i].attackDirection.z == -1 && (players[i].geometry.position.z > this.geometry.position.z)) {
                            players[i].isStunned = true;
                            if (!this.hitplayer[i]) {
                                players[i].setDamage(players[i].getDamage() + (
                                    Math.abs((distanceBetweenVector3(
                                        this.geometry.position, players[i].geometry.position))
                                    )
                                ),
                                    { y: 0, z: 0 }
                                );
                                this.hitplayer[i] = true;
                            }
                        }
                    }
                }
            }
            if(this.specialTimer < 0){
                this.isStunned = false;
                this.specialExists = false;
            }
        }
        if(this.stunnedTimer > 0){
            this.stunnedTimer -= t;
        }
        if(this.stunnedTimer <= 0){
            for (var i = 0; i < playersPlaying; i++) {
                if(this.hitplayer[i]){
                    players[i].isStunned = false;
                    this.hitplayer[i] = false;
                }
            }
        }
    }

}