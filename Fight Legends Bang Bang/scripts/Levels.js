function newLevel(lid){
    switch(lid){
        case 1:
    floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 15, 2, 50 ),
			new THREE.MeshBasicMaterial({ color: 0x48ff00 }),
            0
	);
    floor.receiveShadow = true;
    floor.position.set(0,-5,0);
    scene.add(floor);
        break;
        case 2:

        break;
    }
}