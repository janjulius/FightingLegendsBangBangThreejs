class Character{
    
    constructor(){
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = 0;
        this.direction = 0;
        this.speed = 8;
        this.id = 0;
        this.stock = GAME_SETTINGS_STOCK_START;
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
    }

    getStock(){
        return this.stock;
    }

    getDamage(){
        return this.damage;
    }

    setDamage(d){
        this.damage = d;
    }
    
}