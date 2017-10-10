class Willem extends Character{
    
    constructor(y, z){
        super();
        this.name = "Willem";
        this.moveSpeed = 300;

        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x888888 }),
        1,
        1
    );

            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			material,
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created willem");
    }
    specialAtk(){
        console.log(this.name + " special attack");
    }

}