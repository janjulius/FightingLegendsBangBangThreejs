class Character{
    
    constructor(){
        this.name = "base";
        this.extraname = "";
        this.specialAtkString = "base";
        this.damage = 0;
        this.direction = 0;
        this.speed = 8;
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
    
}