class Brawlhaven extends Level{
    
    constructor(){
        super();

        this.spawn = [{y: 15, z : 50}, {y: 5, z : 0}, {y: -10, z : 0}, {y: 25, z : -50}]

        var lowerbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 9, 60),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        lowerbase.receiveShadow = true;
        lowerbase.position.set(0, -18, 0);
        scene.add(lowerbase);
        lowerbase.name = ground

        var lowergrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 60),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        lowergrass.receiveShadow = true;
        lowergrass.position.set(0, -13 , 0);
        scene.add(lowergrass);
        lowergrass.name = ground

        var upperbaseleft = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 4, 20),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        upperbaseleft.receiveShadow = true;
        upperbaseleft.position.set(0, 0 , 15);
        scene.add(upperbaseleft);
        upperbaseleft.name = ground

        var uppergrassleft = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 20),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        uppergrassleft.receiveShadow = true;
        uppergrassleft.position.set(0, 2 , 15);
        scene.add(uppergrassleft);
        uppergrassleft.name = ground

        var upperbaseright = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 4, 20),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        upperbaseright.receiveShadow = true;
        upperbaseright.position.set(0, 0 , -15);
        scene.add(upperbaseright);
        upperbaseright.name = ground

        var uppergrassright = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 20),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        uppergrassright.receiveShadow = true;
        uppergrassright.position.set(0, 2 , -15);
        scene.add(uppergrassright);
        uppergrassright.name = ground

        var grassplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 9),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        grassplatform.receiveShadow = true;
        grassplatform.position.set(0, 2 , 0);
        scene.add(grassplatform);
        grassplatform.name = ground

        var leftislandbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 15),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        leftislandbase.receiveShadow = true;
        leftislandbase.position.set(0, 3 , 50);
        scene.add(leftislandbase);
        leftislandbase.name = ground

        var leftislandgrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 15),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        leftislandgrass.receiveShadow = true;
        leftislandgrass.position.set(0, 13 , 50);
        scene.add(leftislandgrass);
        leftislandgrass.name = ground

        var leftislandtriangle = new Physijs.SphereMesh(
            new THREE.SphereGeometry(10, 0, 1),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        leftislandtriangle.receiveShadow = true;
        leftislandtriangle.position.set(0, -6.5, 50);
        scene.add(leftislandtriangle);
        leftislandtriangle.name = ground

        var leftislandsquare = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15.5, 10, 7.5),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        leftislandsquare.receiveShadow = true;
        leftislandsquare.position.set(0, -11 , 53.5);
        scene.add(leftislandsquare);
        leftislandsquare.name = ground

        var rightislandbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 15),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        rightislandbase.receiveShadow = true;
        rightislandbase.position.set(0, 16 ,-50);
        scene.add(rightislandbase);
        rightislandbase.name = ground

        var rightislandgrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 15),
            new THREE.MeshBasicMaterial({ color: this.grassgreen }),
            0
        );
        rightislandgrass.receiveShadow = true;
        rightislandgrass.position.set(0, 23 , -50);
        scene.add(rightislandgrass);
        rightislandgrass.name = ground


    }
}

