class Rocky extends Character{
    
    constructor(y, z){
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon";
        this.cid = 2;
        this.specialAtkString = "Shivering Leap";
        this.portrait = 'sprites/Characters/MenuSprites/rocky.png';
        this.Speed = 12;
        this.specialExists = false;
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
        this.specialTimer = 1;
        }
    }

    UpdateChar(t){
        if(this.specialExists){
            if(this.specialTimer > 0){
                console.log("test" + this.specialTimer);
                this.specialTimer -= t;
            }
            if(this.specialTimer <= 0){
                console.log("ATTACK");
                this.specialExists = false;
                players[this.target].setDamage(players[this.target].getDamage() + 50);
                this.geometry.position.set(players[this.target].geometry.position.x,players[this.target].geometry.position.y,players[this.target].geometry.position.z);
                
            }
        }
        
    }

}