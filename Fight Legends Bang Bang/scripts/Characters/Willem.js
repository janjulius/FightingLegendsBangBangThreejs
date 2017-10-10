class Willem extends Character{
    
    constructor(y, z){
        super();
        this.name = "Willem";
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
    specialAtk(){
        console.log(this.name + " special attack");
        // throw a snowball
    }

}