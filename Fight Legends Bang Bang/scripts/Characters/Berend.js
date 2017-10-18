class Berend extends Character {

    constructor(y, z) {
        super();
        this.name = "Berend";
        this.Speed = 4;
        this.cid = 7;
        this.portrait = 'sprites/Characters/MenuSprites/berend.png';
        this.ultSound = new Audio('Sounds/Characters/Berend/Berend_ult_shout.wav');
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0x8B4513 }),
            1,
            1
        );

        this.specialAtkString = "Assert dominance";
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
            this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
            this.specialTimer = 5;
            this.specialExists = true;
            this.ultSound.play();
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;
                this.specialIncrease = 0;
                this.basicAttackDamage = 18;
                this.takeDamageMultiplier = 2;
                this.knockbackImmunity = true;
                this.speed = 80;
                this.attackDelay = 0.1;
            }
            if (this.specialTimer <= 0) {
                this.specialExists = false;
                this.specialIncrease = 10;
                this.basicAttackDamage = 10;
                this.takeDamageMultiplier = 1;
                this.knockbackImmunity = false;
                this.speed = 40;
                this.attackDelay = 0.2;
            }
        }
    }

}