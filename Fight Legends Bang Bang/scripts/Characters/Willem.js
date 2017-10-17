class Willem extends Character {

    constructor(y, z) {
        super();
        this.name = "Willem";
        this.moveSpeed = 300;
        this.cid = 0;
        this.ultDir;
        this.target;
        this.ultDamage = 100;
        this.ballSpeed = 80;
        this.specialExists = false;
        this.hitplayer = [false, false, false, false];
        this.ultCharging = false;
        this.portrait = 'sprites/Characters/MenuSprites/willem.png';
        this.material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            1,
            0
        );

        this.specialAtkString = "Throw Snowball";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            this.material
        );

        this.specialObject = new Physijs.SphereMesh(
            new THREE.SphereGeometry(7, 7, 7),
            this.material
        );
        this.specialObject.position.set(-10000, y, z);
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        scene.add(this.specialObject);
        //this.geometry.setDamping(1,1);
        console.log("created Willem");
    }


    idle() {
        //idle image

    }

    specialAtk() {
        if (this.specialExists && !this.ultCharging) {
            this.EndSpecial();
        }
        if (this.specialReady() && !this.specialExists && !this.isStunned) {
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
            this.ballVelocity = new THREE.Vector3(0, 0, this.attackDirection.z * ((this.ballSpeed) + 1));

            this.specialTimer = 5;
            this.specialExists = true;
            this.ultpos = this.geometry.position;
            this.oldpos = this.geometry.position;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;
                if (this.specialTimer > 4.05 && this.specialTimer < 5) {
                    this.velt = 0;
                    this.isStunned = true;
                    this.ultCharging = true;
                }
                if (this.specialTimer > 4 && this.specialTimer < 4.05) {
                    var pos = this.geometry.position;
                    this.specialObject.position.set(0, pos.y + (this.grounded ? 5 : 0), pos.z);
                    this.geometry.__dirtyPosition = true;
                    this.specialObject.__dirtyPosition = true;
                    this.velt = 0;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);

                }

                if (this.specialTimer < 4) {
                    this.ultCharging = false;
                    this.maxGravityVelocity = 50;
                    this.gravityVelocity = 80;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);

                    this.specialObject.setLinearVelocity(this.ballVelocity);
                    for (var i = 0; i < playersPlaying; i++) {
                        if (i == this.id) {
                            continue;
                        }

                        if (distanceBetweenVector3(this.specialObject.position, players[i].geometry.position) <= 12) {
                            
                            if (!this.hitplayer[i]) {
                                players[i].setDamage(players[i].getDamage() + this.ultDamage, {
                                    y: 1,
                                    z: this.GetSpcDirection(players[i])
                                });this.hitplayer[i] = true;
                            }
                        }
                    }
                }
            }
            if (this.specialTimer <= 0) {
                this.EndSpecial();
            }
        }
    }

    EndSpecial() {

        this.isStunned = false;
        this.geometry.__dirtyPosition = true;
        this.specialObject.__dirtyPosition = true;
        this.geometry.position.set(0, this.specialObject.position.y, this.specialObject.position.z);
        this.specialObject.position.set(-1000, 0, 0);
        this.specialExists = false;
        for(var i = 0; i < this.hitplayer.length; i++){
            this.hitplayer[i] = false;
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