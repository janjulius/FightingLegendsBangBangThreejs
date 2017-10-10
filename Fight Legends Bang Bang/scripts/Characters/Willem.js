class Willem extends Character{
    
    constructor(y, z){
        super();
        this.name = "Willem";
        this.specialAtkString = "Throw Snowball"
        this.Speed = 6;
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 },
            1)
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Willem");
    }

    idle(){
        //idle image
        
    }

    specialAtk(){
        console.log(this.name + " Used " + this.specialAtkString);
        // throw a snowball
    }

}