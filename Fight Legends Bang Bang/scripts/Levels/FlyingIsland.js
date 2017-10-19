class FlyingIsland extends Level {
    constructor() {
        super();

        this.name = "FlyingIsland";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};

        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 10, z: 30 }, { y: 10, z: 10 }, { y: 10, z: -10 }, { y: 10, z: -40 }]

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        this.spawn = shuffle(possibleSpawns)

        var geometry = new THREE.CubeGeometry(1000, 1000, 1000);
        var cubeMaterials = 
        [
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_ft.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_bk.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_up.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_dn.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_rt.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_lf.png'), side: THREE.DoubleSide} )
        ];

        var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials);
        var cube = new THREE.Mesh (geometry, cubeMaterial);
        scene.add(cube);

        var grass = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/Grass.png ')
        grass.wrapS = grass.wrapT = THREE.RepeatWrapping;
        grass.repeat.set(18, 1);

        var Grass = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: grass,
            }),
            0,
            1
        )

        var dirt = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/dirt.jpg ')
        dirt.wrapS = dirt.wrapT = THREE.RepeatWrapping;
        dirt.repeat.set(18, 1);

        var Dirt = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: dirt,
            }),
            0,
            1
        )

        var trunk = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/Trunk.png ')
        trunk.wrapS = trunk.wrapT = THREE.RepeatWrapping;
        trunk.repeat.set(1, 5);

        var treeTrunk = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: trunk,
            }),
            0,
            1
        )

        var tree = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/BOOM.png ')
        tree.wrapS = tree.wrapT = THREE.RepeatWrapping;
        tree.repeat.set(1, 1);

        var Tree = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: tree,
            }),
            0,
            1
        )

        var silver = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/silver.png ')
        silver.wrapS = silver.wrapT = THREE.RepeatWrapping;
        silver.repeat.set(2, 4);

        var Silver = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: silver,
            }),
            0,
            1
        )

        var silver2 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/silver.png ')
        silver2.wrapS = silver2.wrapT = THREE.RepeatWrapping;
        silver2.repeat.set(8, 2);

        var Silver2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: silver2,
            }),
            0,
            1
        )

        var darksilver = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/darkSilver.jpg ')
        darksilver.wrapS = darksilver.wrapT = THREE.RepeatWrapping;
        darksilver.repeat.set(6,4);

        var darkSilver = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: darksilver,
            }),
            0,
            1
        )

        var door = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/door.png ')
        door.wrapS = door.wrapT = THREE.RepeatWrapping;
        door.repeat.set(1, 1);

        var Door = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: door,
            }),
            0,
            1
        )

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var MainGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 5, 120),
            Grass,
            0
        );
        MainGrass.receiveShadow = true;
        MainGrass.position.set(0, 5, -5);
        scene.add(MainGrass);
        MainGrass.name = "ground";

        var MainDirt = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 10, 120),
            Dirt,
            0
        );
        MainDirt.receiveShadow = true;
        MainDirt.position.set(0, -2.5, -5);
        scene.add(MainDirt);
        MainDirt.name = "ground";

        var Trunk = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.5, 25, 5),
            treeTrunk,
            0
        );
        Trunk.receiveShadow = true;
        Trunk.position.set(0, 19.5, 40);
        scene.add(Trunk);
        Trunk.name = "ground";

        var Leaves = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.5, 20, 20),
            Tree,
            0
        );
        Leaves.receiveShadow = true;
        Leaves.position.set(0, 35, 40);
        scene.add(Leaves);
        Leaves.name = "ground";

        var silverBlock1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 10),
            Silver,
            0
        );
        silverBlock1.receiveShadow = true;
        silverBlock1.position.set(0, 27, -20);
        scene.add(silverBlock1);
        silverBlock1.name = "ground";

        var silverBlock2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 40),
            Silver2,
            0
        );
        silverBlock2.receiveShadow = true;
        silverBlock2.position.set(0, 32, -45);
        scene.add(silverBlock2);
        silverBlock2.name = "ground";

        var silverBlock3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 10),
            Silver,
            0
        );
        silverBlock3.receiveShadow = true;
        silverBlock3.position.set(0, 17, -60);
        scene.add(silverBlock3);
        silverBlock3.name = "ground";

        var WoodenDoor = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0, 10, 5),
            Door,
            0
        );
        WoodenDoor.receiveShadow = true;
        WoodenDoor.position.set(-1, 12, -22.5);
        scene.add(WoodenDoor);
        WoodenDoor.name = "ground";

        var darkSilverBlock = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0, 20, 30),
            darkSilver,
            0
        );
        darkSilverBlock.receiveShadow = true;
        darkSilverBlock.position.set(-1, 17, -40);
        scene.add(darkSilverBlock);
        darkSilverBlock.name = "ground";




    }
}