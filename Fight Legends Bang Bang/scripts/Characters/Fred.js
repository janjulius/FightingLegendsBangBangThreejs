class Fred extends Character{
    
    constructor(y, z){
        super();
        this.name = "Fred";
        this.extraname = "der goblin";
        this.specialAtkString = "Hammer smash!";
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 },
            1)
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Fred");
    }
    
    specialAtk(){
        console.log(this.name + this.extraname + this.specialAtkString);
        //play animation Hammer smash
    }

}