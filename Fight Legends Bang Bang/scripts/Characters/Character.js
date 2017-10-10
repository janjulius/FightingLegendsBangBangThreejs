class Character{
    
    constructor(){
        this.name = "base";
        this.damage = 0;
        this.moveSpeed = 200;
        this.direction = 0;
        this.speed = 2000;
        this.velocity = new THREE.Vector(0,0,0);
        console.log("created character");
    }

    specialAtk(){
        console.log("special atk character");
    }

    getMoveSpeed(){
        console.log("I am :" + this.moveSpeed + " fast");
    }
    
}