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
    this.jumped = false;
    this.totalJump = 1;
    this.jumpsLeft = 1;
    var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        }),
        1,
        0
    );
    this.geometry = new Physijs.BoxMesh(
        new THREE.CubeGeometry(5, 5, 5),
        material
    );
    console.log("created character");
}

    specialAtk(){
        console.log("special atk character");
    }

    normalAtk() {
        //play normal attack

    }

    jump(){
    this.jumped = true;        

    }

    run(){
        //run!

    }

    block() {
        //block!

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

    
    if(this.jumped){
        if(this.jumpsLeft > 0){
            vel.y = 20;
            console.log("jumped");
            this.jumpsLeft--;
        }
        this.jumped = false;
    }

    this.velocity = new THREE.Vector3(0,vel.y,(this.direction*this.speed)*t);

    this.geometry.setLinearVelocity(this.velocity);
    this.geometry.setAngularFactor( new THREE.Vector3(0,0,0));
    }
    
}