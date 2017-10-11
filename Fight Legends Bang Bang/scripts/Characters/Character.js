class Character{
    
    constructor(){
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = GAME_SETTINGS_HANDICAP;
        this.direction = 0;
        this.id = 0;
        this.stock = GAME_SETTINGS_STOCK_START;
        this.speed = 2000;
        this.velocity = new THREE.Vector3(0,0,0);
        this.portrait;
        console.log("created character");
    }

    specialAtk(){
        console.log("special atk character");
    }

    normalAtk() {
        //play normal attack

    }

    jump(){
        //jump!

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
    
}