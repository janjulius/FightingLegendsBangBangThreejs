class Thundergart extends Level{
        
        constructor(){
            super();

            var floor;
            var iceblue = iceblue;
            var burlywoodbrown = burlywoodbrown;
            var grassgreen = grassgreen;
            var mudbrown = mudbrown;
               
        floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 50),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, -10, 0);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 , -30);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 , 30);
            scene.add(floor);
    
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 30),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 8 , 0);
            scene.add(floor);
        }
}
