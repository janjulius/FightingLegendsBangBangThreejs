function newLevel(lid) {
    var burlywoodbrown = 0xDEB887;
    var iceblue = 0xdcf3ff;
    var mudbrown = 0x794c13;
    var grassgreen = 0x4DBD33;

    switch (lid) {
        case 1:
            var levelHight = 0;

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 50),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0,-10 + levelHight, 0);
            scene.add(floor);

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 + levelHight, -30);
            scene.add(floor);

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0 + levelHight, 30);
            scene.add(floor);

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 30),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 8 + levelHight, 0);
            scene.add(floor);
            break;
        case 2:
        var levelHight = 0;
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 10, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, -5+ levelHight, 15);
            scene.add(floor);

            door = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 10, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            door.receiveShadow = true;
            door.position.set(0, -5+ levelHight, -25);
            scene.add(door);

            gloor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 1, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            gloor.receiveShadow = true;
            gloor.position.set(0, -0.5+ levelHight, -5);
            scene.add(gloor);
            break;
        case 3:
            var levelHight = 0;
                lowerbase = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 9, 60),
                    new THREE.MeshBasicMaterial({ color: mudbrown }),
                    0
                    );
                    lowerbase.receiveShadow = true;
                    lowerbase.position.set(0, -18 + levelHight, 0);
                    scene.add(lowerbase);

                lowergrass = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 1, 60),
                    new THREE.MeshBasicMaterial({ color: grassgreen }),
                    0
                    );
                    lowergrass.receiveShadow = true;
                    lowergrass.position.set(0, -13 + levelHight, 0);
                    scene.add(lowergrass);

                upperbaseleft = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 4, 25),
                    new THREE.MeshBasicMaterial({ color: mudbrown }),
                    0
                    );
                    upperbaseleft.receiveShadow = true;
                    upperbaseleft.position.set(0, 0 + levelHight, 17.5);
                    scene.add(upperbaseleft);
    
                uppergrassleft = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 1, 25),
                    new THREE.MeshBasicMaterial({ color: grassgreen }),
                    0
                    );
                    uppergrassleft.receiveShadow = true;
                    uppergrassleft.position.set(0, 2 + levelHight, 17.5);
                    scene.add(uppergrassleft);

                upperbaseright = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 4, 25),
                    new THREE.MeshBasicMaterial({ color: mudbrown }),
                    0
                    );
                    upperbaseright.receiveShadow = true;
                    upperbaseright.position.set(0, 0 + levelHight, -17.5);
                    scene.add(upperbaseright);
        
                uppergrassright = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(15, 1, 25),
                    new THREE.MeshBasicMaterial({ color: grassgreen }),
                    0
                    );
                    uppergrassright.receiveShadow = true;
                    uppergrassright.position.set(0, 2 + levelHight, -17.5);
                    scene.add(uppergrassright);

            break;
    }
}