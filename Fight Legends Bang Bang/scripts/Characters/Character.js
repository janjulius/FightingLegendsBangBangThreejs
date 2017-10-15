class Character {

    constructor() {
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = GAME_SETTINGS_HANDICAP;

        this.direction = { y: 0, z: 0 };
        this.attackDirection = { y: 0, z: 1 };

        this.id = 0;
        this.cid = -1;
        this.igid = -1;
        this.stock = GAME_SETTINGS_STOCK_START;
        this.speed = 40;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.portrait;
        this.velt = 0;
        this.blocking = false;
        this.jumped = false;
        this.grounded = false;
        this.isAlive = true;
        this.isStunned = false;
        this.totalJump = 2;
        this.jumpsLeft = this.totalJump;
        this.specialCounter = 0;
        this.specialCounterThreshHold = 100;
        this.swingObject;

        this.basicAttackDamage = 10;
        this.specialIncrease = 10;

        this.swingTimer = 0;
        this.attackRemoveTimer = 0;

        this.swingCooldown = 0.7;
        this.attackRemoveCooldown = 0.1;
        this.attackDelay = 0.2;
        this.respawnDelay = 2;
        this.respawnTimer = 0;
        this.specialTimer = 0;

        this.chargeAttack = false;
        this.knockBack = new THREE.Vector3(0, 0, 0);
        this.damageMulti = 1;
        console.log("created character");
    }

    specialAtk() {
        console.log("special atk character");
    }

    normalAtk() {
        this.chargeAttack = false;
        this.attackRemoveTimer = this.attackRemoveCooldown;
        this.swingTimer = this.swingCooldown;
        var swingMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            1,
            0
        );
        this.swingObject = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            swingMaterial
        );
        this.swingObject._dirtyPosition = true;
        this.swingObject._dirtyRotation = true;
        this.swingObject.position.set(this.geometry.position.x,
            this.geometry.position.y + (this.attackDirection.y * 5),
            this.geometry.position.z + (this.attackDirection.z * 5));
        var _this = this;
        this.swingObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (_this.swingObject._physijs.touches.length > 0) {
                if (other_object.isPlayer) {
                    var j = parseInt(other_object.name);
                    if (_this.id != j) {
                        _this.setSpecialAttackCounter(_this.specialCounter + _this.specialIncrease);
                        players[j].setDamage(players[j].getDamage() + _this.basicAttackDamage, _this.attackDirection);
                    }
                }
            }
        });
        scene.add(this.swingObject);
    }

    doNormalAttack() {
        var a = this.swingObject;

    }

    jump() {
        this.jumped = true;

    }

    run() {
        //run!

    }

    block() {
        this.blocking = true;

    }

    idle() {
        //idle!

    }

    getMoveSpeed() {
        console.log("my movementspeed is :" + this.moveSpeed);
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setStock(s) {
        this.stock = s;
        this.damage = 0;
        gameInterface.UpdateGameInterface(this.id);
    }

    getStock() {
        return this.stock;
    }

    getDamage() {
        return this.damage;
    }

    setDamage(d, dir) {
        if (this.blocking) {
            return;
        }

        if (this.grounded)
            dir.y = Math.abs(dir.y);

        this.damage = d;
        this.knockBack.z = ((d+20) * this.damageMulti) * dir.z;
        this.knockBack.y = ((d+20) * this.damageMulti) * dir.y;
        gameInterface.UpdateGameInterface(this.id);
    }

    getSpecialAttackCounter() {
        return this.specialCounter;
    }

    setSpecialAttackCounter(a) {
        if (this.specialCounter > this.specialCounterThreshHold) {
            this.specialCounter = this.specialCounterThreshHold;
            gameInterface.UpdateGameInterface(this.id);
        } else {
            this.specialCounter = a;
            gameInterface.UpdateGameInterface(this.id);
        }
        gameInterface.UpdateGameInterface(this.id);
    }

    getCid() {
        return this.cid;
    }

    specialReady() {
        return this.specialCounter >= this.specialCounterThreshHold;
    }

    CheckWithinArena() {
        var arena = new Rect(level.topLeft.z, level.topLeft.y, level.bottomRight.y, level.bottomRight.z);

        var playerPoint = { x: this.geometry.position.z, y: this.geometry.position.y };

        if (!arena.Contains(playerPoint) && this.isAlive) {
            this.respawnTimer = this.respawnDelay;
            this.isAlive = false;
        }
    }

    CheckCollision() {
        var touchedGround = false;
        for (var i = 0; i < this.geometry._physijs.touches.length; i++) {
            var id = this.geometry._physijs.touches[i];
            var obj = scene._objects[id];

            if (obj) {
                if (obj.isPlayer) { }

                if (obj.name == "ground") {
                    touchedGround = true;
                }
            }

        }
        if (!touchedGround)
            this.grounded = false;
    }

    Update(t) {

        this.CheckWithinArena();

        if (this.knockBack.z > 0)
            this.knockBack.z -= 50 * t;
        if (this.knockBack.z < 0)
            this.knockBack.z += 50 * t;

        if (this.knockBack.z > -10 && this.knockBack.z < 10)
            this.knockBack.z = 0;

        if (this.knockBack.y > 0)
            this.knockBack.y -= 50 * t;
        if (this.knockBack.y < 0)
            this.knockBack.y += 50 * t;

        if (this.knockBack.y > -10 && this.knockBack.y < 10)
            this.knockBack.y = 0;


        if (this.direction.z > 0.6)
            this.attackDirection = { y: 0, z: 1 };
        else if (this.direction.z < -0.6)
            this.attackDirection = { y: 0, z: -1 };
        else if (this.direction.y > 0.6)
            this.attackDirection = { y: 1, z: 0 };
        else if (this.direction.y < -0.6)
            this.attackDirection = { y: -1, z: 0 };

        this.CheckCollision();

        var vel = this.geometry.getLinearVelocity();

        if (this.velt > -50)
            this.velt -= 80 * t;

        if (this.grounded)
            this.velt = 0;

        if (this.jumped) {
            if (this.jumpsLeft > 0) {
                this.velt = 50;
                this.grounded = false;
                this.jumpsLeft--;
            }
            this.jumped = false;
        }

        this.velocity = new THREE.Vector3(0, this.velt + this.knockBack.y, ((this.direction.z * this.speed)) + this.knockBack.z);

        this.geometry.setLinearVelocity(this.isStunned ? new THREE.Vector3(0, 0, 0) : this.velocity);
        this.geometry.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        this.geometry.setAngularFactor(new THREE.Vector3(0, 0, 0));
        this.geometry.setLinearFactor(new THREE.Vector3(0, 1, 1));

        if (this.attackRemoveTimer > 0) {
            this.attackRemoveTimer -= t;
            if (this.attackRemoveTimer < this.attackRemoveCooldown / 10) {
                this.attackRemoveTimer = 0;
                scene.remove(this.swingObject);
            }
        }

        if (!this.isAlive) {
            this.respawnTimer -= t;
            if (this.respawnTimer < 0) {
                this.geometry.position.set(0, level.spawn[this.id].y, level.spawn[this.id].z);
                this.geometry.__dirtyPosition = true;
                this.setStock(this.stock - 1);
                this.knockBack = new THREE.Vector3(0, 0, 0);
                this.isAlive = true;
            }
        }

        if (this.swingTimer > 0)
            this.swingTimer -= t;

        if (this.chargeAttack)
            if (this.swingTimer > 0 && this.swingTimer < this.swingCooldown - this.attackDelay)
                this.normalAtk();
    }

    UpdateChar(t) { }

    AddGrounded() {
        var _this = this;
        this.geometry.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (contact_normal.y < -0.9) {
                _this.grounded = true;
                _this.jumpsLeft = _this.totalJump;
            } else if (contact_normal.y > 0.8) {
                _this.grounded = false;
                _this.velt = 0;
            }

            if (_this.knockBack.z != 0) {
                if (contact_normal.z < -0.7 && !other_object.isPlayer) {
                    _this.knockBack.z = -_this.knockBack.z * 0.8;
                } else if (contact_normal.z > 0.7 && !other_object.isPlayer) {
                    _this.knockBack.z = -_this.knockBack.z * 0.8;
                }
            }
            if (_this.knockBack.y != 0) {
                if (contact_normal.y < -0.7 && !other_object.isPlayer) {
                    _this.knockBack.y = -_this.knockBack.y * 0.8;
                } else if (contact_normal.y > 0.7 && !other_object.isPlayer) {
                    _this.knockBack.y = -_this.knockBack.y * 0.8;
                }
            }
        });
    }
}