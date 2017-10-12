class Character{
    
    constructor() {
    this.name = "base";
    this.extraname = "";
    this.specialAtkString = "base";
    this.damage = GAME_SETTINGS_HANDICAP;
    this.direction = 0;
    this.id = 0;
    this.cid = -1;
    this.stock = GAME_SETTINGS_STOCK_START;
    this.speed = 2000;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.portrait;
    this.velt = 0;
    this.blocking = false;
    this.jumped = false;
    this.totalJump = 1;
    this.jumpsLeft = this.totalJump;
    console.log("created character");
}

    specialAtk(){
        console.log("special atk character");
    }

    normalAtk() {
        ray = new THREE.Raycaster(this.geometry.position, new THREE.Vector3(0,0,this.direction));
        var intersects = ray.intersectObjects(scene.children);
        

    }

    jump(){
    this.jumped = true;        

    }

    run(){
        //run!

    }

    block() {
        this.blocking = true;

    }

    idle(){
        //idle!

    }

    getMoveSpeed(){
        console.log("my movementspeed is :" + this.moveSpeed );
    }

    setId(id){
        this.id = id;
    }

    setStock(s){
        this.stock = s;
        gameInterface.UpdateGameInterface(this.id);
    }

    getStock(){
        return this.stock;
    }

    getDamage(){
        return this.damage;
    }

    setDamage(d){
        if(this.blocking){
            return;
        }
        this.damage = d;
        gameInterface.UpdateGameInterface(this.id);
    }

    getCid(){
        return this.cid;
    }

    isGround() {
    // physi keeps track of all objects touching our player mesh
    // we add properties to our game objects such as isGround
    for(var i=0; i < this.geometry._physijs.touches.length; i++) {
        var id = this.geometry._physijs.touches[i];
        var _oasis = scene._objects[id]._oasis;
        if (_oasis && _oasis.isGround) {
            return true;
        }
    }
}


    Update(t){

    // the scene's physics have finished updating
	var vel = this.geometry.getLinearVelocity();
    
    if(this.velt > -30)
     this.velt -= 40*t;

    if(this.jumped){
        if(this.jumpsLeft > 0){
            this.velt = 40;
            console.log("jumped");
            this.jumpsLeft--;
        }
        this.jumped = false;
    }

    this.velocity = new THREE.Vector3(0,this.velt,(this.direction*this.speed)*t);

    this.geometry.setLinearVelocity(this.velocity);
    this.geometry.setAngularFactor( new THREE.Vector3(0,0,0));
    }
    
}