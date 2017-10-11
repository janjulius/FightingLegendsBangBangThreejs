class Berend extends Character{
    
    constructor(y, z){
        super();
        this.name = "Berend";
        this.Speed = 4;
        this.portrait = 'sprites/Characters/MenuSprites/berend.png'
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x888888 }),
        1,
        1
    );

        this.specialAtkString = "Assert dominance";
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
        // Assert dominance
    }

}