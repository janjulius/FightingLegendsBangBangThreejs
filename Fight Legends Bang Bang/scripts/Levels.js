function newLevel(lid){
    switch(lid){
        case 1:
        	var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x48ff00 }),
        1,
        0
    );
    floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 15, 2, 50 ),
			material,
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