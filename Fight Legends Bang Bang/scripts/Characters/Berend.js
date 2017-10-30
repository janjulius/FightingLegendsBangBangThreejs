class Berend extends Character {

    constructor(y, z) {
        super();
        this.name = "Berend";
        this.Speed = 4;
        this.cid = 7;
        this.modelHeight = 9;
        this.size.width = 7;
        this.size.height = 9;
        this.modelOfset = new THREE.Vector3(0, -this.size.height / 2, 0);
        this.attackRange = 15;
        this.attackWidth = 7.5;
        this.stBasicRange = this.attackRange;
        this.stBasicWidth = this.attackWidth;
        this.stBasicJump = this.jumpForce;
        this.ultSpecialIncrease = 0;
        this.ultBasicAttackDamage = 18;
        this.ultBasicAttackRange = 19;
        this.ultBasicAttackWidth = 6.5;
        this.ultTakeDamageMultiplier = 2;
        this.ultJumpForce = 70;
        this.ultSpeed = 65;
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

        material.transparent = true;
        material.opacity = 0.2;
        this.specialAtkString = "Assert dominance";
        this.geometry = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, this.size.height, this.size.width),
            material,
        );
        this.geometry.castShadow = true;
        this.geometry.position.set(0, y, z);
        scene.add(this.geometry);
        this.loadModel();
        console.log("created " + this.name);
    }

    loadModel() {
        console.log("loading model...");
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function (xhr) {
            console.log(xhr);
        };

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var mtlLoader = new THREE.MTLLoader();

        var _this = this;
        var loader = new THREE.FBXLoader(manager);

        loader.load('Models/Yeti/idle.fbx', function (object) {
            object.scale.set(0.006, 0.006, 0.006);
            _this.pivot.add(object);
            _this.geometry.add(_this.pivot);
            object.position.set(_this.modelOfset.x, _this.modelOfset.y, _this.modelOfset.z);
            _this.model = object;
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);

            _this.idleAnim = object.mixer.clipAction(object.animations[0]);
            _this.idleAnim.play();

            loader.load('Models/Yeti/running.fbx', function (object) {
                _this.runningAnim = _this.model.mixer.clipAction(object.animations[0]);
            }, onProgress, onError);
        }, onProgress, onError);
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
                this.jumpForce = this.ultJumpForce;
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
                this.jumpForce = this.stBasicJump;
                this.takeDamageMultiplier = 1;
                this.knockbackImmunity = false;
                this.speed = 40;
                this.attackDelay = 0.2;
            }
        }
    }

}