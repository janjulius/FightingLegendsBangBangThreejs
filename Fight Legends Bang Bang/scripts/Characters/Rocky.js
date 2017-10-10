class Rocky extends Character{
    
    constructor(y, z){
        super();
        this.name = "Rocky";
        this.extraname = "the Raccoon"
        this.Speed = 12;
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 },
            1)
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Rocky");
    }
    specialAtk(){
        console.log(this.name + this. extraname + " special attack");
    }

}