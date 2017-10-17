class Jens extends Character{
    
    constructor(y, z){
        super();
        this.name = "Jens";
        this.cid = 6;
        this.portrait = 'sprites/Characters/MenuSprites/jens.png'
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0xFF0000}),
        1,
        1
    );

        this.specialAtkString = "Cannon Barrage";
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			material,
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created " + this.name);
    }

    block(){
        //no block
    }

    specialAtk(){
        console.log(this.name + " Used " + this.specialAtkString);
        // Cannon ball!
    }

}