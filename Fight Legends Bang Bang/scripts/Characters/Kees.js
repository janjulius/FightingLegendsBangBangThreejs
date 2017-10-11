class Kees extends Character{
    
    constructor(y, z){
        super();
        this.name = "Kees";
        this.cid = 4;
        this.portrait = 'sprites/Characters/MenuSprites/kees.png';
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x786e6e }),
        1,
        1
    );

        this.specialAtkString = "Expose to the light";
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			material,
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created " + this.name);
    }


    specialAtk(){
        console.log(this.name + " Used " + this.specialAtkString);
        // EXPOSED
    }

}