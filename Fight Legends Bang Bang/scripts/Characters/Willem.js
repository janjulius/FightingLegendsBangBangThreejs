class Willem extends Character{
    
    constructor(y, z){
        super();
        this.name = "Willem";
        this.moveSpeed = 300;
        this.cid = 0;
        this.portrait = 'sprites/Characters/MenuSprites/willem.png';
        var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        1,
        0
    );

        this.specialAtkString = "Throw Snowball";
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			material
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    var _this = this;
    this.geometry.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
        console.log("collision event");
        if (contact_normal.y < -0.5) {
            console.log("can jump again");
            _this.jumpsLeft = _this.totalJump;
            console.log("can jump again");
        }
    });
    //this.geometry.setDamping(1,1);
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