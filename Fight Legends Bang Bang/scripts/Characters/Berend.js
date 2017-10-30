class Berend extends Character {

    constructor(y, z) {
        super();
        this.name = "Berend";
        this.Speed = 4;
        this.cid = 7;
        this.stBasicRange = this.attackRange;
        this.stBasicWidth = this.attackWidth;
        this.ultSpecialIncrease = 0;
        this.ultBasicAttackDamage = 18;
        this.ultBasicAttackRange = 15;
        this.ultBasicAttackWidth = 5.8;
        this.ultTakeDamageMultiplier = 2;
        this.ultSpeed = 80;
        this.ultAttackDelay = 0.1;
        this.portrait = 'sprites/Characters/MenuSprites/berend.png';
        this.ultSound = new Audio('Sounds/Characters/Berend/Berend_ult_shout.wav');
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x8B4513
            }),
            0,
            0
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
            this.setSpecialAttackCounter(0);
            this.specialTimer = 5;
            this.specialExists = true;
            this.ultSound.play();
        }
    }

    UpdateChar(t) {
        if (this.specialExists) {
            if (this.specialTimer > 0) {
                this.specialTimer -= t;
                this.specialIncrease = this.ultSpecialIncrease;
                this.basicAttackDamage = this.ultBasicAttackDamage;
                this.takeDamageMultiplier = this.ultTakeDamageMultiplier;
                this.attackWidth = this.ultBasicAttackWidth;
                this.attackRange = this.ultBasicAttackRange;
                this.knockbackImmunity = true;
                this.speed = this.ultSpeed;
                this.attackDelay = this.ultAttackDelay;
            }
            if (this.specialTimer <= 0) {
                this.specialExists = false;
                this.specialIncrease = 10;
                this.basicAttackDamage = 10;
                this.attackWidth = this.stBasicWidth;
                this.attackRange = this.stBasicRange;
                this.takeDamageMultiplier = 1;
                this.knockbackImmunity = false;
                this.speed = 40;
                this.attackDelay = 0.2;
            }
        }
    }

}