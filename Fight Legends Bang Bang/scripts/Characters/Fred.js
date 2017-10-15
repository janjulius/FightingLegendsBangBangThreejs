class Fred extends Character{
    
    constructor(y, z){
        super();
        this.name = "Fred";
        this.extraname = "der goblin";
        this.cid = 3;
        this.specialAtkString = "Hammer smash!";
        this.hammerSmashDamage = 25;
        this.spcTimer = 0;
        this.specialExistTime = 0.1;
        this.specialExists = false;
        this.portrait = 'sprites/Characters/MenuSprites/fred.png';
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x598D1B            },
            1)
	);
    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Fred");
    }
    
    specialAtk(){
        console.log("fred special");   
        this.specialExists = true;    
        var specialMaterial = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        }),
        1,
        0
    );
        this.specialObject = new Physijs.SphereMesh(
            new THREE.SphereGeometry(10, 10, 10),
            specialMaterial
        );        
        this.specialObject._dirtyPosition = true;
        this.specialObject._dirtyRotation = true;
        this.specialObject.position.set(this.geometry.position.x,
            this.geometry.position.y,
            this.geometry.position.z);
        var _this = this;
        scene.add(this.specialObject);
        this.specialObject.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            if (_this.specialObject._physijs.touches.length > 0) {
                if (other_object.isPlayer) {
                    var j = parseInt(other_object.name);
                    if (_this.id != j) {
                        _this.setSpecialAttackCounter(_this.specialCounter + _this.specialIncrease);
                        players[j].setDamage(players[j].getDamage() + _this.hammerSmashDamage, _this.attackDirection);
                    }
                }
            }
        });
        this.spcTimer = specialExistTime;
        this.specialExists = true;
    }
    
    UpdateChar(t){
        if(this.specialExists){
            this.specialObject.scale.set(this.specialObject.scale.x += 0.1, this.specialObject.scale.y += 0.1, this.specialObject.scale.z += 0.1);
            if(this.spcTimer > 0){
                this.spcTimer -= t;
            } else {
                this.specialExists = false;
                scene.remove(this.specialObject);
            }
        }
    }
}