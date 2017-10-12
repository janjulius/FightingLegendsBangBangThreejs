class StandardMap extends Level{
    constructor(){
        super();
        var floor;
        this.spawn1 = {y: 5, z : 30};
        this.spawn2 = {y: 10, z : -8};
        this.spawn3 = {y: 10, z : 8};
        this.spawn4 = {y: 5, z : -30};
        
        floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 50),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, -10, 0);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 , -30);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 , 30);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 30),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 8 , 0);
            scene.add(floor);
        }
    }
