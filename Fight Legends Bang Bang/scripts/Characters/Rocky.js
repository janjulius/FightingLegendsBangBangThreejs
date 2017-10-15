class Rocky extends Character{
    
    constructor(y, z){
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.specialDamage = 50;
        this.specialExists = false;
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0xec00fb },
            1)
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Rocky");
    }

    specialAtk(){
        if (DEBUG_MODE) { this.setSpecialAttackCounter(100); }
        if(this.specialReady()){
        this.target;
        for(var i = 0; i < players.length; i++){
            if(this.id == i){
                continue;
            }
            if(this.target === undefined){
                this.target = i;
            }
            if(distanceBetweenVector3(players[i].geometry.position,this.geometry.position) 
            <= distanceBetweenVector3(players[this.target].geometry.position,this.geometry.position)){
                console.log("ROCKY: target " + players[i].name + " is closer than " + players[this.target].name + "");
                this.target = i;
            }
        }
        this.specialExists = true;
        this.specialTimer = 1.75;
        this.setSpecialAttackCounter(this.getSpecialAttackCounter() - this.specialCounterThreshHold);
        }
    }

    UpdateChar(t){
        if(this.specialExists){
            if(this.specialTimer > 0){
                console.log("test" + this.specialTimer);
                this.specialTimer -= t;
                if(this.specialTimer > 1.25 && this.specialTimer < 1.75){ //preparing

                }
                if(this.specialTimer > 1 && this.specialTimer < 1.25){ //jump

                }
                if(this.specialTimer > 0.5 && this.specialTimer < 1){ //dissapear

                }
                if(this.specialTimer < 0.5){
                    
                }
            }
            if(this.specialTimer <= 0){
                console.log("ATTACK");
                this.specialExists = false;
                this.geometry.position.set(players[this.target].geometry.position.x,players[this.target].geometry.position.y,
                players[this.target].geometry.position.z + -players[this.target].attackDirection.z*5);
                players[this.target].setDamage(players[this.target].getDamage() + this.specialDamage
            , { y: 1, z: this.attackDirection.z });
            this.geometry.__dirtyPosition = true;
            this.geometry.__dirtyRotation = true;
             
            }
        }
        
    }

}