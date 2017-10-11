class BoomStronk extends Character{
    
    constructor(y, z){
        super();
        this.name = "Boom Stronk";
        this.Speed = 12;
        this.cid = 5;
        this.portrait = 'sprites/Characters/MenuSprites/boom_stronk.png'
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x4b0909 }),
        1,
        1
    );

        this.specialAtkString = "Take root";
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
        // Take root
    }

}