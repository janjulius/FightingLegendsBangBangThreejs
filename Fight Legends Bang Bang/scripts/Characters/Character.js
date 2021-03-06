class Character {

    constructor() {
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = GAME_SETTINGS_HANDICAP;

        this.model = undefined;
        this.modelOfset = new THREE.Vector3(0, 0, 0);
        this.pivot = new THREE.Object3D();
        this.size = {
            height: 5,
            width: 5
        };
        this.LookDirection = 1;
        this.anim = [];

        this.idleAnim = undefined;
        this.runningAnim = undefined;
        this.punchAnim = undefined;
        this.throwAnim = undefined;
        this.stompAnim = undefined;

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
        this.attackRange = 12;
        this.attackWidth = 5.2;
        this.jumpForce = 50;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.portrait;
        this.velt = 0;
        this.blocking = false;
        this.jumped = false;
        this.isAlive = true;
        this.isStunned = false;
        this.totalJump = 2;
        this.jumpsLeft = this.totalJump;
        this.specialCounter = 0;
        this.specialCounterThreshHold = 100;
        this.swingObject;
        this.specialExists = false;
        this._jump = false;
        this.knockbackImmunity = false;
        this.takeDamageMultiplier = 1;

        this.blockTime = 0.3;
        this.blockTimer = 0;
        this.blockCooldownTimer = 0;
        this.blockCooldownTime = 2;
        this.canBlock = true;

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

        this.maxGravityVelocity = 100;
        this.gravityVelocity = 80;

        this.touchingWalls = [-1, -1, -1, -1];

        ///tracking data
        this.Tplace = -1;
        this.TLastPerson = -1;
        this.TDamageDone = 0;
        this.TDamageTaken = 0;
        this.TDamageHealed = 0;
        this.THighestDamageSurvived = 0;
        this.TKills = 0;
        this.TDeaths = 0;
        this.TDamageBlocked = 0;
        this.TDamageDoneWithUlt = 0;
        this.TotalUltsUsed = 0;

        this.readyForNextGame = false;


        console.log("created character");
    }

    specialAtk() {
        console.log("special atk character");
    }

    normalAtk() {
        if (!this.blocking) {
            this.chargeAttack = false;
            this.attackRemoveTimer = this.attackRemoveCooldown;
            this.swingTimer = this.swingCooldown;

            ///debug code
            var geom = new THREE.BoxGeometry(5, 5, 5);
            this.swingObject = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
                color: 0xffffff
            }));
            this.swingObject.position.set(this.geometry.position.x,
                this.geometry.position.y + (this.attackDirection.y * this.size.height),
                this.geometry.position.z + (this.attackDirection.z * this.size.width));
            scene.add(this.swingObject);
            ///

            for (var i = 0; i < playersPlaying; i++) {
                var otherPlayer = players[i];
                if (otherPlayer.id == this.id)
                    continue;

                var hit = false;
                if (distanceBetweenVector3(this.geometry.position, otherPlayer.geometry.position) < this.attackRange) {

                    var randomSound;
                    randomSound = Math.floor((Math.random() * 7));

                    var ydist = Math.abs(otherPlayer.geometry.position.y - this.geometry.position.y);
                    var zdist = Math.abs(otherPlayer.geometry.position.z - this.geometry.position.z);
                    var tolMax = this.attackWidth;
                    var tolMin = -2;
                    if (this.attackDirection.z == 1 && otherPlayer.geometry.position.z > this.geometry.position.z && ydist < tolMax && zdist > 2) {
                        hit = true; //links
                    } else if (this.attackDirection.z == -1 && otherPlayer.geometry.position.z < this.geometry.position.z && ydist < tolMax && zdist > 2) {
                        hit = true; //rechts
                    } else if (this.attackDirection.y == 1 && otherPlayer.geometry.position.y > this.geometry.position.y && zdist < tolMax && ydist > 2) {
                        hit = true; //boven
                    } else if (this.attackDirection.y == -1 && otherPlayer.geometry.position.y < this.geometry.position.y && zdist < tolMax && ydist > 2) {
                        hit = true; //onder
                    }
                }
                if (hit) {
                    var hitSounds = ['Sounds/hit2.wav', 'Sounds/hit3.wav', 'Sounds/hit4.wav',
                        'Sounds/hit5.wav', 'Sounds/hit6.wav', 'Sounds/hit7.wav', 'Sounds/hit16.wav'
                    ];
                    var hitSound = new Audio(hitSounds[randomSound]);
                    hitSound.volume = MUSIC_VOLUME;
                    hitSound.play();
                    this.setSpecialAttackCounter(this.specialCounter + this.specialIncrease);
                    otherPlayer.setDamage(otherPlayer.getDamage() + this.basicAttackDamage * this.takeDamageMultiplier, this.attackDirection, this.id, 0);
                }
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
        this.canBlock = false;
        this.blockTimer = this.blockTime;
        this.blockCooldownTimer = this.blockCooldownTime;
    }

    idle() {
        //idle!

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

    setDamage(d, dir, oid, type) {
        if (!this.blocking) {

            if (type == 0) {
                players[oid].TDamageDone += d - this.damage;
                this.TDamageTaken += d - this.damage;
                this.TLastPerson = oid;
            } else if (type == 1) {
                players[oid].TDamageDoneWithUlt += d - this.damage;
                this.TDamageTaken += d - this.damage;
                this.TLastPerson = oid;
            } else if (type == 2) {
                players[oid].TDamageHealed += this.damage - d;
            }

            if (this.CheckSides("down"))
                dir.y = Math.abs(dir.y);
            if (this.CheckSides("up"))
                dir.y = -Math.abs(dir.y);
            if (this.CheckSides("left"))
                dir.z = -Math.abs(dir.z);
            if (this.CheckSides("right"))
                dir.z = Math.abs(dir.z);

            this.damage = Math.floor(d);
            if (!this.knockbackImmunity) {
                this.knockBack.z = ((d + 20) * this.damageMulti) * dir.z;
                this.knockBack.y = ((d + 20) * this.damageMulti) * dir.y;
            }
            gameInterface.UpdateGameInterface(this.id);
        } else {
            this.TDamageBlocked += d - this.damage;
        }
    }

    getSpecialAttackCounter() {
        return this.specialCounter;
    }

    setSpecialAttackCounter(a) {
        this.specialCounter = a;

        if (this.specialCounter > this.specialCounterThreshHold)
            this.specialCounter = this.specialCounterThreshHold;

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
            var r = Math.floor((Math.random() * 3));
            var cheerSounds = ['Sounds/Crowd/Crowd_cheer_1.wav', 'Sounds/Crowd/Crowd_cheer_2.wav', 'Sounds/Crowd/Crowd_cheer_3.wav'];
            var cSound = new Audio(cheerSounds[r]);
            cSound.volume = MUSIC_VOLUME;
            cSound.play();
            this.respawnTimer = this.respawnDelay;
            this.isAlive = false;
            this.isStunned = true;

            if (this.damage > this.THighestDamageSurvived)
                this.THighestDamageSurvived = this.damage;

            this.setStock(this.stock - 1);
            if (this.stock == 0) {
                this.Tplace = placesLeft;
                placesLeft--;
            }
            this.specialExists = false;
            this.velt = 0;
            if (this.specialCounter > 70)
                this.setSpecialAttackCounter(this.specialCounter - (this.specialCounter / 3));

            this.TDeaths++;
            players[this.TLastPerson != -1 ? this.TLastPerson : this.id].TKills++;
        }
    }

    CheckCollision(t) {
        var ids = new Array(this.geometry._physijs.touches.length);
        for (var i = 0; i < this.geometry._physijs.touches.length; i++) {
            var id = this.geometry._physijs.touches[i];
            var obj = scene._objects[id];
            if (obj) {
                ids[i] = obj.id;
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
        if (level.oneWayPlatforms.length > 0 && this.velt <= 0 && this.direction.y > -0.7) {
            var pos1 = new THREE.Vector3(0, this.geometry.position.y, this.geometry.position.z + this.size.width / 2);
            var ray1 = new THREE.Raycaster(pos1, new THREE.Vector3(0, -1, 0), 1.5, (this.size.height / 2) + 0.3);
            var intersects1 = ray1.intersectObjects(level.oneWayPlatforms);
            var pos2 = new THREE.Vector3(0, this.geometry.position.y, this.geometry.position.z - this.size.width / 2);
            var ray2 = new THREE.Raycaster(pos2, new THREE.Vector3(0, -1, 0), 1.5, (this.size.height / 2) + 0.3);
            var intersects2 = ray2.intersectObjects(level.oneWayPlatforms);
            if (intersects1[0] || intersects2[0]) {
                this.touchingWalls[3] = 20;
                this.jumpsLeft = this.totalJump;
                var ypos = intersects1[0] ? intersects1[0].object.position.y : intersects2[0].object.position.y;
                this.geometry.position.y = ypos + (this.size.height / 2) + 0.5;
                this.geometry.__dirtyPosition = true;
                if (this.knockBack.y < 0) {
                    this.knockBack.y = -this.knockBack.y * 0.8;
                }
            }
        }
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

    pressedbuttonA() {
        if (!this.isStunned) {
            this.jump();
        }
    }

    pressedbuttonX() {
        if (this.swingTimer <= 0 && !this.isStunned) {
            this.swingTimer = this.swingCooldown;
            this.chargeAttack = true;
        }
    }

    pressedbuttonY() {
        if (this.specialReady())
            this.TotalUltsUsed++;
        if (!this.isStunned)
            this.specialAtk();
    }

    pressedbuttonRT() {
        if (!this.isStunned) {
            if (this.canBlock) {
                this.block();
            }
        }
    }

    pressedbuttonStart() {
        if (!this.readyForNextGame) {
            this.readyForNextGame = true;
            gameInterface.UpdateEndScreen();
            var allReady = true;
            for (var i = 0; i < playersPlaying; i++) {
                if (!players[i].readyForNextGame) {
                    allReady = false;
                }
            }
            if (allReady)
                EndGame();
        }
    }

    Update(t) {

        this.CheckWithinArena();
        this.CheckCollision(t);

        if (this.knockBack.z > 0) {
            this.knockBack.z -= 50 * t;
        } else if (this.knockBack.z < 0) {
            this.knockBack.z += 50 * t;
        }
        if (this.knockBack.z > -10 && this.knockBack.z < 10) {
            this.knockBack.z = 0;
        }
        if (this.knockBack.y > 0) {
            this.knockBack.y -= 50 * t;
        } else if (this.knockBack.y < 0) {
            this.knockBack.y += 50 * t;
        }
        if (this.knockBack.y > -10 && this.knockBack.y < 10) {
            this.knockBack.y = 0;
        }

        if (!this.isStunned) {
            if (this.direction.z > 0.5) {
                this.attackDirection = {
                    y: 0,
                    z: 1
                };
            } else if (this.direction.z < -0.5) {
                this.attackDirection = {
                    y: 0,
                    z: -1
                };
            } else if (this.direction.y > 0.5) {
                this.attackDirection = {
                    y: 1,
                    z: 0
                };
            } else if (this.direction.y < -0.5) {
                this.attackDirection = {
                    y: -1,
                    z: 0
                };
            }

            if (this.direction.z > 0.3) {
                if (this.LookDirection == -1 && this.model) {
                    this.pivot.rotation.y = deg2Rad(0);
                }
                this.LookDirection = 1;
            } else if (this.direction.z < -0.3) {
                if (this.LookDirection == 1 && this.model) {
                    this.pivot.rotation.y = deg2Rad(180);
                }
                this.LookDirection = -1;
            }
        }
        if (this.velt > -this.maxGravityVelocity) {
            let extraVel = this.direction.y < 0 ? -this.direction.y * (this.gravityVelocity) : 0;
            this.velt -= (this.gravityVelocity + extraVel) * t;
        }

        if (this.CheckSides("down") && !this._jump) {
            this.velt = 0;
        }


        if ((this.CheckSides("left") || this.CheckSides("right")) && !this.CheckSides("down") && !this._jump) {
            this.jumpsLeft = this.totalJump;
            if (this.velt < -15 + this.direction.y * 10)
                this.velt = -15 + this.direction.y * 10;

            if (this.knockBack.z > -30 && this.knockBack.z < 30)
                this.knockBack.z = 0;
        }

        this._jump = false;
        if (this.jumped && !this.CheckSides("up")) {
            if (this.jumpsLeft > 0) {

                if (this.CheckSides("right") && !this.CheckSides("down"))
                    this.knockBack.z += 40;
                if (this.CheckSides("left") && !this.CheckSides("down"))
                    this.knockBack.z -= 40;
                this.velt = this.jumpForce;
                this.jumpsLeft--;
                this._jump = true;
            }
            this.jumped = false;
        }

        if (this.direction.z > 0 && this.CheckSides("left")) {
            this.direction.z = 0
        } else if (this.direction.z < 0 && this.CheckSides("right")) {
            this.direction.z = 0
        }

        var movespeed = this.direction.z * this.speed;
        if (this.knockBack.z > 0 && this.direction.z < 0) {
            this.knockBack.z -= this.speed * t;
            movespeed = 0;
        } else if (this.knockBack.z < 0 && this.direction.z > 0) {
            this.knockBack.z += this.speed * t;
            movespeed = 0;
        }



        if (this.attackRemoveTimer > 0) {
            this.attackRemoveTimer -= t;
            if (this.attackRemoveTimer < this.attackRemoveCooldown / 10) {
                this.attackRemoveTimer = 0;
                if (this.punchAnim) {
                    this.punchAnim.stop();
                    this.throwAnim.stop();
                    this.stompAnim.stop();
                }
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

        if (this.chargeAttack) {
            if (this.punchAnim) {
                if (!this.punchAnim.isRunning() && !this.throwAnim.isRunning() && !this.stompAnim.isRunning()) {
                    if (this.attackDirection.z != 0) {
                        this.punchAnim.play();
                    } else if (this.attackDirection.y == 1) {
                        this.throwAnim.play();
                    } else if (this.attackDirection.y == -1) {
                        this.stompAnim.play();
                    }
                    this.idleAnim.stop();
                    this.runningAnim.stop();
                }
            }
            if (this.swingTimer > 0 && this.swingTimer < this.swingCooldown - this.attackDelay)
                this.normalAtk();
        }

        if (this.blockTimer > 0) {
            playerBlockIcons[this.id].material.opacity = 1;
            this.blockTimer -= t;
        }

        if (this.blockTimer <= 0) {
            if (this.blocking) {
                playerBlockIcons[this.id].material.opacity = 0;
                this.blocking = false;
            }
        }

        if (this.blockCooldownTimer > 0)
            this.blockCooldownTimer -= t;

        if (this.blockCooldownTimer <= 0)
            this.canBlock = true;



        if (this.idleAnim && this.runningAnim && !this.isStunned && this.punchAnim) {
            if (!this.punchAnim.isRunning() && !this.throwAnim.isRunning() && !this.stompAnim.isRunning()) {
                if (movespeed != 0 && !this.runningAnim.isRunning()) {
                    this.idleAnim.stop();
                    this.runningAnim.play();
                }
                if (movespeed == 0 && this.runningAnim.isRunning()) {
                    this.idleAnim.play();
                    this.runningAnim.stop();
                }
            }
        }

        this.velocity = new THREE.Vector3(0, this.velt + this.knockBack.y, movespeed + this.knockBack.z);

        this.geometry.setLinearVelocity(this.isStunned ? new THREE.Vector3(0, 0, 0) : this.velocity);
        this.geometry.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        this.geometry.setAngularFactor(new THREE.Vector3(0, 0, 0));
        this.geometry.setLinearFactor(new THREE.Vector3(0, 1, 1));
    }

    UpdateChar(t) {}

    AddGrounded() {
        var _this = this;
        this.geometry.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {

            if (contact_normal.z == 1 && !other_object.isPlayer) {
                _this.touchingWalls[0] = other_object.id;
            } else if (contact_normal.z == -1 && !other_object.isPlayer) {
                _this.touchingWalls[1] = other_object.id;
            } else if (contact_normal.y == 1 && !other_object.isPlayer) {
                _this.touchingWalls[2] = other_object.id;
                if (other_object.isQuestionmark) {
                    if (!other_object.hit) {
                        other_object.hit = true;
                        other_object.material = level.coinBlockDoneMaterial;
                        level.playCoinSound();
                        level.popCoin(other_object.position.x, other_object.position.y, other_object.position.z);
                    }
                }
            } else if (contact_normal.y == -1) {
                _this.touchingWalls[3] = other_object.id;
            }

            if (contact_normal.y < -0.9) {
                _this.jumpsLeft = _this.totalJump;
            } else if (contact_normal.y > 0.8) {
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