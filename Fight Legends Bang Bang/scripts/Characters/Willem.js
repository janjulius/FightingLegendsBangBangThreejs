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
        this.beginSPecial = false;
        this.specialExists = false;
        this.hitplayer = [false, false, false, false];
        this.ultCharging = false;
        this.portrait = 'sprites/Characters/MenuSprites/willem.png';
        this.willemUltStartSound = new Audio('Sounds/Characters/Willem/Willem_ult_sound.wav');
        this.material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            0,
            0
        );

        this.specialAtkString = "Throw Snowball";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            this.material
        );

        this.specialObject = new Physijs.SphereMesh(
            new THREE.SphereGeometry(5, 16, 16),
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

    pressedbuttonY() {
        if (this.specialReady())
            this.TotalUltsUsed++;

        this.specialAtk();
    }

    specialAtk() {
        if (this.specialExists && !this.ultCharging) {
            this.EndSpecial();
        }
        if (this.specialReady() && !this.specialExists && !this.isStunned) {
            this.setSpecialAttackCounter(0);
            var dir = this.attackDirection.z == 0 ? -1 : this.attackDirection.z;
            this.ballVelocity = new THREE.Vector3(0, 0, dir * ((this.ballSpeed) + 1));
            this.willemUltStartSound.play();
            this.specialTimer = 5;
            this.beginSPecial = true;
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
                if (this.specialTimer < 4 && this.beginSPecial) {
                    var pos = this.geometry.position;
                    this.specialObject.position.set(0, pos.y + (this.CheckSides("down") ? 5 : 0), pos.z);
                    this.specialObject.__dirtyPosition = true;
                    this.isStunned = true;
                    this.velt = 0;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);
                    this.geometry.__dirtyPosition = true;
                    this.beginSPecial = false;
                }

                if (this.specialTimer < 4) {
                    this.ultCharging = false;
                    if (this.ballVelocity.y > -70)
                        this.ballVelocity.y -= 80 * t;
                    this.geometry.position.set(-1000, this.specialObject.position.y, this.specialObject.position.z);
                    this.geometry.__dirtyPosition = true;

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
                                }, this.id, 1);
                                this.hitplayer[i] = true;
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
        this.velt = 0;
        this.setSpecialAttackCounter(0);
        this.jumpsLeft = this.totalJump;
        this.isStunned = false;
        this.geometry.__dirtyPosition = true;
        this.specialObject.__dirtyPosition = true;
        this.geometry.position.set(0, this.specialObject.position.y, this.specialObject.position.z);
        this.specialObject.position.set(-1000, 0, 0);
        this.specialExists = false;
        for (var i = 0; i < this.hitplayer.length; i++) {
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