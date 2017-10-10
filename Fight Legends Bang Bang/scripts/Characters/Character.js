class Character{
    
    constructor(){
        this.name = "base";
        this.title = "";
        this.damage = 0;
        this.direction = 0;
        this.speed = 8;
        console.log("created character");
    }

    specialAtk(){
        console.log("special atk character");
    }

    getMoveSpeed(){
        console.log("I am :" + this.moveSpeed + " fast");
    }
    
}