function newLevel(lid) {
    var burlywoodbrown = 0xDEB887;
    var iceblue = 0xdcf3ff;

    switch (lid) {
        case 1:
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
            floor.position.set(0, 0, -30);
            scene.add(floor);

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 0, 30);
            scene.add(floor);

            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 30),
                new THREE.MeshBasicMaterial({ color: burlywoodbrown }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, 8, 0);
            scene.add(floor);
            break;
        case 2:
            floor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 10, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            floor.receiveShadow = true;
            floor.position.set(0, -5, 15);
            scene.add(floor);

            door = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 10, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            door.receiveShadow = true;
            door.position.set(0, -5, -25);
            scene.add(door);

            gloor = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 1, 20),
                new THREE.MeshBasicMaterial({ color: iceblue }),
                0
            );
            gloor.receiveShadow = true;
            gloor.position.set(0, -0.5, -5);
            scene.add(gloor);
            break;
    }
}