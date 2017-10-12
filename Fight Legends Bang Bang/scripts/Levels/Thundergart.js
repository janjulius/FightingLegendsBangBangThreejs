class Thundergart extends Level{
    constructor(){
        super();
        
        this.spawn1 = {y: 5, z : 30};
        this.spawn2 = {y: 5, z : 15};
        this.spawn3 = {y: 5, z : -25};
        this.spawn4 = {y: 5, z : -40};

        var floor = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        floor.receiveShadow = true;
        floor.position.set(0, -5 , 20);
        scene.add(floor);

        var door = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        door.receiveShadow = true;
        door.position.set(0, -5 , -30)  ;
        scene.add(door);

        var gloor = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        gloor.receiveShadow = true;
        gloor.position.set(0, -0.5 , -10);
        scene.add(gloor);
        
    }
}