class Character {

    constructor() {
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = GAME_SETTINGS_HANDICAP;

        this.direction = {
            y: 0,
            z: 0
        };
        this.attackDirection = {
            y: 0,
            z: 1
        };

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
        this.specialExists = false;

        this.basicAttackDamage = 10;
        this.specialIncrease = 10;

        this.swingTimer = 0;
        this.attackRemoveTimer = 0;

        this.swingCooldown = 0.5;
        this.attackRemoveCooldown = 0.1;
        this.attackDelay = 0.2;
        this.respawnDelay = 2;
        this.respawnTimer = 0;
        this.specialTimer = 0;

        this.chargeAttack = false;
        this.knockBack = new THREE.Vector3(0, 0, 0);
        this.damageMulti = 1;

        this.maxGravityVelocity = 50;
        this.gravityVelocity = 80;

        this.touchingWalls = [-1, -1, -1, -1];

        console.log("created character");
    }

    specialAtk() {
        console.log("special atk character");
    }

    normalAtk() {
        this.chargeAttack = false;
        this.attackRemoveTimer = this.attackRemoveCooldown;
        this.swingTimer = this.swingCooldown;

        ///debug code
        var geom = new THREE.BoxGeometry(5, 5, 5);
        this.swingObject = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        this.swingObject.position.set(this.geometry.position.x,
            this.geometry.position.y + (this.attackDirection.y * 5),
            this.geometry.position.z + (this.attackDirection.z * 5));
        scene.add(this.swingObject);
        ///

        for (var i = 0; i < playersPlaying; i++) {
            var otherPlayer = players[i];
            if (otherPlayer.id == this.id)
                continue;

            var hit = false;
            if (distanceBetweenVector3(this.geometry.position, otherPlayer.geometry.position) < 10) {
                var ydist = Math.abs(otherPlayer.geometry.position.y - this.geometry.position.y);
                var zdist = Math.abs(otherPlayer.geometry.position.z - this.geometry.position.z);
                var tol = 4.5;
                if (this.attackDirection.z == 1 && otherPlayer.geometry.position.z > this.geometry.position.z && ydist < tol && zdist > tol) {
                    hit = true;//links
                } else if (this.attackDirection.z == -1 && otherPlayer.geometry.position.z < this.geometry.position.z && ydist < tol && zdist > tol) {
                    hit = true;//rechts
                } else if (this.attackDirection.y == 1 && otherPlayer.geometry.position.y > this.geometry.position.y && zdist < tol && ydist > tol) {
                    hit = true;//boven
                } else if (this.attackDirection.y == -1 && otherPlayer.geometry.position.y < this.geometry.position.y && zdist < tol && ydist > tol) {
                    hit = true;//onder
                }
            }
            if (hit) {
                this.setSpecialAttackCounter(this.specialCounter + this.specialIncrease);
                otherPlayer.setDamage(otherPlayer.getDamage() + this.basicAttackDamage, this.attackDirection);
            }
        }
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

        if (this.CheckSides("down"))
            dir.y = Math.abs(dir.y);
        if (this.CheckSides("up"))
            dir.y = -Math.abs(dir.y);
        if (this.CheckSides("left"))
            dir.z = -Math.abs(dir.z);
        if (this.CheckSides("right"))
            dir.z = Math.abs(dir.z);

        this.damage = d;
        this.knockBack.z = ((d + 20) * this.damageMulti) * dir.z;
        this.knockBack.y = ((d + 20) * this.damageMulti) * dir.y;
        gameInterface.UpdateGameInterface(this.id);
    }

    getSpecialAttackCounter() {
        return this.specialCounter;
    }

    setSpecialAttackCounter(a) {
        if (this.specialCounter > this.specialCounterThreshHold) {
            this.specialCounter = this.specialCounterThreshHold;
        } else {
            this.specialCounter = a;
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

        var playerPoint = {
            x: this.geometry.position.z,
            y: this.geometry.position.y
        };

        if (!arena.Contains(playerPoint) && this.isAlive) {
            this.respawnTimer = this.respawnDelay;
            this.isAlive = false;
            this.setStock(this.stock - 1);
            this.specialExists = false;
            this.setSpecialAttackCounter(this.specialCounter / 2);
        }
    }

    CheckCollision() {
        var touchedGround = false;
        var ids = new Array(this.geometry._physijs.touches.length);
        for (var i = 0; i < this.geometry._physijs.touches.length; i++) {
            var id = this.geometry._physijs.touches[i];
            var obj = scene._objects[id];
            if (obj) {
                ids[i] = obj.id;
                if (obj.isPlayer) { }

                if (obj.name == "ground") {
                    touchedGround = true;
                }
            }
        }

        for (var j = 0; j < this.touchingWalls.length; j++) {
            var oid = this.touchingWalls[j];
            if (oid != -1) {
                if (!ids.includes(oid)) {
                    this.touchingWalls[j] = -1;
                }
            }
        }
        if (!touchedGround)
            this.grounded = false;
    }

    CheckSides(s) {
        switch (s) {
            case "left":
                return this.touchingWalls[0] != -1;
            case "right":
                return this.touchingWalls[1] != -1;
            case "up":
                return this.touchingWalls[2] != -1;
            case "down":
                return this.touchingWalls[3] != -1;
        }
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
            this.attackDirection = {
                y: 0,
                z: 1
            };
        else if (this.direction.z < -0.6)
            this.attackDirection = {
                y: 0,
                z: -1
            };
        else if (this.direction.y > 0.6)
            this.attackDirection = {
                y: 1,
                z: 0
            };
        else if (this.direction.y < -0.6)
            this.attackDirection = {
                y: -1,
                z: 0
            };

        this.CheckCollision();

        var vel = this.geometry.getLinearVelocity();

        if (this.velt > -this.maxGravityVelocity)
            this.velt -= this.gravityVelocity * t;

        if (this.grounded)
            this.velt = 0;

        if (this.jumped && !this.CheckSides("up")) {
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
            if (this.respawnTimer < 0 && this.stock > 0) {
                this.geometry.position.set(0, level.spawn[this.id].y, level.spawn[this.id].z);
                this.geometry.__dirtyPosition = true;
                this.knockBack = new THREE.Vector3(0, 0, 0);
                this.isStunned = false;
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

            if (!other_object.isPlayer) {
                if (contact_normal.z == 1) {
                    _this.touchingWalls[0] = other_object.id;
                } else if (contact_normal.z == -1) {
                    _this.touchingWalls[1] = other_object.id;
                } else if (contact_normal.y == 1) {
                    _this.touchingWalls[2] = other_object.id;
                } else if (contact_normal.y == -1) {
                    _this.touchingWalls[3] = other_object.id;
                }
            }

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