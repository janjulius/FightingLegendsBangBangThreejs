class Character {

    constructor() {
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = GAME_SETTINGS_HANDICAP;
        this.direction = 0;
        this.id = 0;
        this.cid = -1;
        this.igid = -1;
        this.stock = GAME_SETTINGS_STOCK_START;
        this.speed = 2000;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.portrait;
        this.velt = 0;
        this.blocking = false;
        this.jumped = false;
        this.grounded = false;
        this.totalJump = 2;
        this.jumpsLeft = this.totalJump;
        this.specialCounter = 0;
        this.specialCounterThreshHold = 100;
        this.swingObject;
        console.log("created character");
    }

    specialAtk() {
        console.log("special atk character");
    }

    normalAtk() {        
        var swingMaterial = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        1,
        0
    );
        this.swingObject = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			swingMaterial
	);  
        this.swingObject._dirtyPosition = true;
        this.swingObject._dirtyRotation = true;
        this.swingObject.position.set(this.geometry.position.x,
                                                    this.geometry.position.y,
                                                    this.geometry.position.z + (this.direction * 5));
       var _this = this;
       this.swingObject.addEventListener( 'collision', function(other_object, relative_velocity, relative_rotation, contact_normal){ if(_this.swingObject._physijs.touches.length > 0){
            console.log("hi");
        }} );
    	scene.add( this.swingObject );
        
      
        scene.remove(this.swingObject);
        var ray = new THREE.Raycaster(this.geometry.position, new THREE.Vector3(0, 0, this.direction));
        var intersects = ray.intersectObjects(scene.children);
        console.log(intersects.length);
        for (var i = 0; i < intersects.length; i++) {
            for (var j = 0; j < playersPlaying; j++) {
                if (j == parseInt(intersects[i].object.name)) {
                    players[j].setDamage(players[j].getDamage() + 10);
                }
            }
            switch (parseInt(intersects[i].object.name)) {

            }
            console.log(parseInt(intersects[i].object.name));
        }

    }

    doNormalAttack(){
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

    setStock(s) {
        this.stock = s;
        gameInterface.UpdateGameInterface(this.id);
    }

    getStock() {
        return this.stock;
    }

    getDamage() {
        return this.damage;
    }

    setDamage(d) {
        if (this.blocking) {
            return;
        }
        this.damage = d;
        gameInterface.UpdateGameInterface(this.id);
    }

    getSpecialAttackCounter(){
        return this.specialCounter;
    }

    setSpecialAttackCounter(a){
        this.specialCounter = a;
    }

    getCid() {
        return this.cid;
    }

    CheckCollision(){
        var touchedGround = false;
        for (var i = 0; i < this.geometry._physijs.touches.length; i++) {
            var id = this.geometry._physijs.touches[i];
            var obj = scene._objects[id];
            if(obj.isPlayer){
            }

            if(obj.name == "ground"){
                touchedGround = true;
            }

        }
        if(!touchedGround)
            this.grounded = false;
    }

    Update(t) {

        this.CheckCollision();
        /*
        if (this.geometry._physijs.touches.length == 0) {
            this.grounded = false;
        }
        */
        // the scene's physics have finished updating
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

        this.velocity = new THREE.Vector3(0, this.velt, (this.direction * this.speed) * t);

        this.geometry.setLinearVelocity(this.velocity);
        this.geometry.setAngularFactor(new THREE.Vector3(0, 0, 0));
        /*wtf rare bug
        this.geometry.rotation.set(0, 0, 0);
        this.geometry.__dirtyRotation = true;
        */
    }

    AddGrounded() {
        var _this = this;
        this.geometry.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
            if (contact_normal.y < -0.9) {
                _this.grounded = true;
                _this.jumpsLeft = _this.totalJump;
            } else if (contact_normal.y > 0.8) {
                _this.grounded = false;
                _this.velt = 0;
            }
        });
    }
}