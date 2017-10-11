class Willem extends Character{
    
    constructor(y, z){
        super();
        this.name = "Willem";
        this.moveSpeed = 300;
        this.Speed = 6;
        this.portrait = "/sprites/Characters/MenuSprites/Willem.jpg";
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x888888 }),
        1,
        1
    );

        this.specialAtkString = "Throw Snowball";
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			material,
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