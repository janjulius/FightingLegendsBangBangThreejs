class FlyingIsland extends Level {
    constructor() {
        super();

        this.name = "FlyingIsland";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};

        //MUSIC

        this.myAudio = new Audio('Music/Terraria.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        //SPAWNS

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

        //SKYBOX

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

        //GRASS

        var grass = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/Grass.png ')
        grass.wrapS = grass.wrapT = THREE.RepeatWrapping;
        grass.repeat.set(24, 1);

        var Grass = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: grass,
            }),
            0,
            1
        )

        var Grasstile = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/Grass.png ')
        Grasstile.wrapS = Grasstile.wrapT = THREE.RepeatWrapping;
        Grasstile.repeat.set(1, 1);

        var grasstile = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: Grasstile,
            }),
            0,
            1
        )

        var grassleft = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/grassLeft.png ')
        grassleft.wrapS = grassleft.wrapT = THREE.RepeatWrapping;
        grassleft.repeat.set(1, 3);

        var grassLeft = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: grassleft,
            }),
            0,
            1
        )

        var cornergrass = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LeftCornerGrass.png ')
        cornergrass.wrapS = cornergrass.wrapT = THREE.RepeatWrapping;
        cornergrass.repeat.set(1, 1);

        var leftCornerGrass = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: cornergrass,
            }),
            0,
            1
        )

        var cornergrass2 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LeftCornerGrass.png ')
        cornergrass2.wrapS = cornergrass2.wrapT = THREE.RepeatWrapping;
        cornergrass2.repeat.set(1, 1);

        var leftCornerGrass2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: cornergrass2,
            }),
            0,
            1
        )

        var leftDownCornerGrass = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LeftDownGrass.png ')
        leftDownCornerGrass.wrapS = leftDownCornerGrass.wrapT = THREE.RepeatWrapping;
        leftDownCornerGrass.repeat.set(1, 1);

        var leftdowngrass = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: leftDownCornerGrass,
            }),
            0,
            1
        )

        //DIRT

        var lightdirt = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt.wrapS = lightdirt.wrapT = THREE.RepeatWrapping;
        lightdirt.repeat.set(24, 1);

        var lightDirt = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt,
            }),
            0,
            1
        )

        var lightdirt2 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt2.wrapS = lightdirt2.wrapT = THREE.RepeatWrapping;
        lightdirt2.repeat.set(1, 2);

        var lightDirt2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt2,
            }),
            0,
            1
        )

        var lightdirt3 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt3.wrapS = lightdirt3.wrapT = THREE.RepeatWrapping;
        lightdirt3.repeat.set(8, 1);

        var lightDirt3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt3,
            }),
            0,
            1
        )

        var lightdirt4 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt4.wrapS = lightdirt4.wrapT = THREE.RepeatWrapping;
        lightdirt4.repeat.set(1, 4);

        var lightDirt4 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt4,
            }),
            0,
            1
        )

        var middirt = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/MedDirt.jpg ')
        middirt.wrapS = middirt.wrapT = THREE.RepeatWrapping;
        middirt.repeat.set(24, 1);

        var midDirt = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: middirt,
            }),
            0,
            1
        )

        var middirt2 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/MedDirt.jpg ')
        middirt2.wrapS = middirt2.wrapT = THREE.RepeatWrapping;
        middirt2.repeat.set(1, 8);

        var midDirt2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: middirt2,
            }),
            0,
            1
        )

        var darkdirt = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/DarkDirt.jpg ')
        darkdirt.wrapS = darkdirt.wrapT = THREE.RepeatWrapping;
        darkdirt.repeat.set(12, 1);

        var darkDirt = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: darkdirt,
            }),
            0,
            1
        )

        var lightdirtdown = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/dirtFacedDownLightHalve.jpg ')
        lightdirtdown.wrapS = lightdirtdown.wrapT = THREE.RepeatWrapping;
        lightdirtdown.repeat.set(16, 1);

        var lightDirtDown = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirtdown,
            }),
            0,
            1
        )

        var dirtwall = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/dirtWall.jpg ')
        dirtwall.wrapS = dirtwall.wrapT = THREE.RepeatWrapping;
        dirtwall.repeat.set(8, 4);

        var dirtWall = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: dirtwall,
            }),
            0,
            1
        )

        //TREES

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
        
        //HOUSE

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
            new THREE.CubeGeometry(5, 5, 120),
            lightDirt,
            0
        );
        MainDirt.receiveShadow = true;
        MainDirt.position.set(0, 0, -5);
        scene.add(MainDirt);
        MainDirt.name = "ground";

        var MainDirt2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 10, 5),
            lightDirt2,
            0
        );
        MainDirt2.receiveShadow = true;
        MainDirt2.position.set(0, -7.5, 52.5);
        scene.add(MainDirt2);
        MainDirt2.name = "ground";

        var MainDirt3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 40),
            lightDirt3,
            0
        );
        MainDirt3.receiveShadow = true;
        MainDirt3.position.set(0, -10, 30);
        scene.add(MainDirt3);
        MainDirt3.name = "ground";

        var MainDirt4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 20, 5),
            lightDirt4,
            0
        );
        MainDirt4.receiveShadow = true;
        MainDirt4.position.set(0, -22.5, 12.5);
        scene.add(MainDirt4);
        MainDirt4.name = "ground";

        var MainDirt5 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 40),
            lightDirt3,
            0
        );
        MainDirt5.receiveShadow = true;
        MainDirt5.position.set(0, -35, 30);
        scene.add(MainDirt5);
        MainDirt5.name = "ground";

        var MainMidDirt = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 110),
            midDirt,
            0
        );
        MainMidDirt.receiveShadow = true;
        MainMidDirt.position.set(0, -5, -5);
        scene.add(MainMidDirt);
        MainMidDirt.name = "ground";

        var MainMidDirt2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 30, 5),
            midDirt2,
            0
        );
        MainMidDirt2.receiveShadow = true;
        MainMidDirt2.position.set(0, -22.5, 7.5);
        scene.add(MainMidDirt2);
        MainMidDirt2.name = "ground";

        var MainDarkDirt = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            darkDirt,
            0
        );
        MainDarkDirt.receiveShadow = true;
        MainDarkDirt.position.set(0, -10, -25);
        scene.add(MainDarkDirt);
        MainDarkDirt.name = "ground";

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
            new THREE.CubeGeometry(5, 20, 10),
            Silver,
            0
        );
        silverBlock1.receiveShadow = true;
        silverBlock1.position.set(0, 27, -20);
        scene.add(silverBlock1);
        silverBlock1.name = "ground";

        var silverBlock2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 10, 40),
            Silver2,
            0
        );
        silverBlock2.receiveShadow = true;
        silverBlock2.position.set(0, 32, -45);
        scene.add(silverBlock2);
        silverBlock2.name = "ground";

        var silverBlock3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 20, 10),
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

        var leftGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 10, 5),
            grassLeft,
            0
        );
        leftGrass.receiveShadow = true;
        leftGrass.position.set(0, -2.5, 57.5);
        scene.add(leftGrass);
        leftGrass.name = "ground";

        var leftCornerGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 5, 5),
            leftCornerGrass,
            0
        );
        leftCornerGrass.receiveShadow = true;
        leftCornerGrass.position.set(0, 5, 57.5);
        scene.add(leftCornerGrass);
        leftCornerGrass.name = "ground";

        var leftCornerGrass2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 5, 5),
            leftCornerGrass2,
            0
        );
        leftCornerGrass2.receiveShadow = true;
        leftCornerGrass2.position.set(0, -35, 57.5);
        scene.add(leftCornerGrass2);
        leftCornerGrass2.name = "ground";

        var LeftDownGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 5, 5),
            leftdowngrass,
            0
        );
        LeftDownGrass.receiveShadow = true;
        LeftDownGrass.position.set(0, -10, 57.5);
        scene.add(LeftDownGrass);
        LeftDownGrass.name = "ground";

        var grassBlock = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 5, 5),
            grasstile,
            0
        );
        grassBlock.receiveShadow = true;
        grassBlock.position.set(0, -35, 52.5);
        scene.add(grassBlock);
        grassBlock.name = "ground";

        // var middleDirt = new Physijs.BoxMesh(
        //     new THREE.CubeGeometry(5, 10, 80),
        //     lightDirtDown,
        //     0
        // );
        // middleDirt.receiveShadow = true;
        // middleDirt.position.set(0, -17.5, -25);
        // scene.add(middleDirt);
        // middleDirt.name = "ground";

        var middleDirtWall = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 20, 40),
            dirtWall,
            0
        );
        middleDirtWall.receiveShadow = true;
        middleDirtWall.position.set(1, -22.5, 35);
        scene.add(middleDirtWall);
        middleDirtWall.name = "ground";



    }
}