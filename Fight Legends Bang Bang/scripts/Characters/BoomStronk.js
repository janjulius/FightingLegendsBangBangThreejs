class BoomStronk extends Character {

    constructor(y, z) {
        super();
        this.name = "Boom Stronk";
        this.Speed = 12;
        this.cid = 5;
        this.hitSomeone = false;
        this.maxGrav = this.maxGravityVelocity;
        this.gravVel = this.gravityVelocity;
        this.specialDamage = 50;
        this.specialHealing = false;
        this.portrait = 'sprites/Characters/MenuSprites/boom_stronk.png'
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0x4b0909 }),
            1,
            1
        );

        this.specialAtkString = "Take root";
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
        this.healval = this.getDamage();
        this.hitSomeone = false;
        this.specialHealing = false;
        if (this.specialReady()) {
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
            this.specialExists = true;
            this.specialTimer = 5;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;

                if (this.specialHealing) {
                    this.isStunned = true;
                    if (this.specialTimer > 2) {
                        this.setDamage(Math.floor(this.healval / 2), { y: 0, z: 0 });
                        this.maxGravityVelocity = 50;
                        this.gravityVelocity = 80;
                    } if (this.specialTimer > 1 && this.specialTimer < 2) {
                        this.setDamage(Math.floor(this.healval / 3), { y: 0, z: 0 });
                    } if (this.specialTimer < 1) {
                        this.setDamage(0, { y: 0, z: 0 });
                        this.isStunned = false;
                    } if (this.specialTimer < 0.1) {
                        this.specialHealing = true;
                        this.hitSomeone = true;
                        this.setSpecialAttackCounter(0);
                    }

                } else {
                    if (this.grounded) {
                        this.specialTimer = 0;
                    }
                    var _this = this;
                    this.geometry.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                        if (!_this.hitSomeone) {
                            if (_this.geometry._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.hitSomeone = true;
                                        players[_this.target].geometry.__dirtyPosition = true;
                                        players[_this.target].geometry.position.set(players[_this.target].geometry.position.x, players[_this.target].geometry.position.y, players[_this.target].geometry.position.z + 5 * _this.GetSpcDirection(players[_this.target]));
                                        players[_this.target].setDamage(players[_this.target].getDamage() + -_this.velt / 3, { y: 1, z: _this.GetSpcDirection(players[_this.target]) });
                                        _this.specialExists = false;
                                        this.setSpecialAttackCounter(0);
                                    }
                                }
                            }
                        }
                    });
                }
                if (!this.grounded && !this.hitSomeone) {
                    this.maxGravityVelocity = 500;
                    this.gravityVelocity = 500;
                }
            }
            if (this.specialTimer <= 0) {
                if (!this.hitSomeone && !this.specialHealing) {
                    this.specialHealing = true;
                    this.hitSomeone = true;
                    this.specialTimer = 3;
                } else {
                    this.specialExists = false;
                    this.maxGravityVelocity = this.maxGrav;
                    this.gravityVelocity = this.gravVel;
                }
            }
        } else {
            this.hitSomeone = true;
            this.maxGravityVelocity = this.maxGrav;
            this.gravityVelocity = this.gravVel;
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