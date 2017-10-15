class Paardman extends Character {

    constructor(y, z) {
        super();
        this.name = "Paardman";
        this.cid = 2;
        this.specialAtkString = "Stone, paper, scissors";
        this.portrait = 'sprites/Characters/MenuSprites/paardman2.png';
        this.stoneThrowSpeed = 40;
        this.scissorThrowSpeed = 50;
        this.paperThrowSpeed = 1;
        this.target;
        this.stoneDamage = 60;
        this.scissorDamage = 80;
        this.paperDamage = 250;
        if (DEBUG_MODE) { this.specialIncrease = 100; }
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            new THREE.MeshBasicMaterial({ color: 0xffad60 },
                1)
        );

        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        console.log("created Paardman");
    }

    specialAtk() {

        if (this.specialObject != undefined) { scene.remove(this.specialObject); }
        this.horseChoice = 1;//Math.floor((Math.random() * 3) + 1);
        switch (this.horseChoice) {
            case 1:   //stone     
                var stoneMaterial = Physijs.createMaterial(
                    new THREE.MeshBasicMaterial({
                        color: 0x4d4c4c
                    }),
                    1,
                    0
                );

                this.specialObject = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(4, 4, 4),
                    stoneMaterial
                );
                this.specialExists = true;
                this.specialTimer = 2;
                this.specialObject.position.set(0, this.geometry.position.y, this.geometry.position.z + (5 * this.attackDirection));

                this.stoneVelocity = new THREE.Vector3(0, 0, this.attackDirection * ((this.stoneThrowSpeed) + 1));
                scene.add(this.specialObject);
                break;
            case 2: //paper
            var stoneMaterial = Physijs.createMaterial(
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                }),
                1,
                0
            );

            this.specialObject = new Physijs.BoxMesh(
                new THREE.CubeGeometry(2, 0.1, 1),
                stoneMaterial
            );
                this.specialExists = true;
                this.specialTimer = 300;
                this.specialObject.position.set(0, this.geometry.position.y, this.attackDirection *(this.geometry.position.z + 7.5));

                scene.add(this.specialObject);

                break;
            case 3: //scissors
                //horseChoiceString = "Scissors";

                break;
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer >= 0) {
                this.specialTimer -= t;
                switch (this.horseChoice) {
                    case 1:
                        this.specialObject.setLinearVelocity(this.stoneVelocity);

                        var _this = this;
                        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                            if (_this.specialObject._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.specialTimer = -1;
                                    }
                                }
                            }
                        });
                        break;

                    case 2:
                        this.specialObject.position.y -= .5;
                        var _this = this;
                        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
                            if (_this.specialObject._physijs.touches.length > 0) {
                                if (other_object.isPlayer) {
                                    _this.target = parseInt(other_object.name);
                                    if (_this.id != _this.target) {
                                        _this.specialTimer = -1;
                                    }
                                }
                            }
                        });
                        break;
                    case 3:

                        break;
                }
                console.log(this.specialTimer);
            }
            if (this.specialTimer <= 0) {
                console.log("remove" + this.target);
                this.specialExists = false;
                scene.remove(this.specialObject);
                this.setSpecialAttackCounter(this.specialCounter + this.specialIncrease);
                if (this.target != undefined) {
                    players[this.target].setDamage(players[this.target].getDamage() + this.paperDamage, this.attackDirection);
                }
            }
        }
    }

}