class Paardman extends Character{
    
    constructor(y, z){
        super();
        this.name = "Paardman";
        this.specialAtkString = "Stone, paper, scissors";
        this.portrait = 'sprites/Characters/MenuSprites/paardman2.png';
            this.geometry = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 },
            1)
    );
    
    let horseChoice; //1 = stone, 2 = paper, 3 = scissors
    let horseChoiceString;

    this.geometry.castShadow = true;
    this.geometry.position.set(0,y,z);
	scene.add( this.geometry );
    console.log("created Paardman");
    }
    
    specialAtk(){
        console.log(this.name + " special attack");

        // battle cry animation 

        horseChoice = Math.floor((Math.random() * 3) + 1);
        switch (horseChoice) {
            case 1:
                horseChoiceString = "Stone";
                //play animation steen
                break;
            case 2:
                horseChoiceString = "Paper";
                //play animation paper
                break;
            case 3:
                horseChoiceString = "Scissors";
                //play animation scissors
                break;

                console.log(this.name + " used " + this.specialAtkString + " and rolled " + this.horseChoiceString )
        }
    }

}