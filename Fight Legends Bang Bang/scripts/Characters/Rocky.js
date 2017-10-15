class Rocky extends Character{
    
    constructor(y, z){
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.specialCounter = 10000;
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0xec00fb },
            1)
	);
    this.geometry._dirtyPosition = true;
    this.geometry._dirtyRotation = true;
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Rocky");
    }

    specialAtk(){
        if(this.specialCounter >= this.specialCounterThreshHold){
        var target;
        for(var i = 0; i < players.length; i++){
            if(this.id == i){
                continue;
            }
            if(target === undefined){
                target = i;
            }
            if(distanceBetweenVector3(players[i].geometry.position,this.geometry.position) 
            <= distanceBetweenVector3(players[target].geometry.position,this.geometry.position)){
                console.log("ROCKY: target " + players[i].name + " is closer than " + players[target].name + "");
                target = i;
            }
        }
        console.log(target);
       // this.geometry.position.set(target.geometry.position.x, target.geometry.position.y+2, target.geometry.position.z-2);
        players[target].setDamage(players[target].getDamage() + 50);
        console.log("Trying to go from :" + this.geometry.position.y + ", " + this.geometry.position.z +" to:" + players[target].geometry.position.y + "," +players[target].geometry.position.z);
        this.geometry.position.set(players[target].geometry.position.x,players[target].geometry.position.y,players[target].geometry.position.z);
        console.log("new " +this.geometry.position.y + ", " + this.geometry.position.z);
        //this.setSpecialAttackCounter(this.getSpecialAttackCounter - this.specialCounterThreshHold);
    }
    }

}