class FlyingIsland extends Level {
    constructor() {
        super();

        this.name = "FlyingIsland";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -140, z: -150};

        //MUSIC

        this.myAudio = new Audio('Music/Terraria.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        //SPAWNS

        var possibleSpawns = [{ y: -30, z: 30 }, { y: -30, z: 30 }, { y: -30, z: 30 }, { y: -30, z: 30 }]

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
        grass.repeat.set(12, 1);

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

        var grassright = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/GrassRight.png ')
        grassright.wrapS = grassright.wrapT = THREE.RepeatWrapping;
        grassright.repeat.set(1, 6);

        var grassRight = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: grassright,
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

        var rightcornergrass = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/RightCornerGrass.png ')
        rightcornergrass.wrapS = rightcornergrass.wrapT = THREE.RepeatWrapping;
        rightcornergrass.repeat.set(1, 1);

        var RightCornerGrass = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: rightcornergrass,
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
        lightdirt4.repeat.set(5, 1);

        var lightDirt4 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt4,
            }),
            0,
            1
        )

        var lightdirt5 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt5.wrapS = lightdirt5.wrapT = THREE.RepeatWrapping;
        lightdirt5.repeat.set(1, 5);

        var lightDirt5 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt5,
            }),
            0,
            1
        )

        var lightdirt6 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt6.wrapS = lightdirt6.wrapT = THREE.RepeatWrapping;
        lightdirt6.repeat.set(14, 1);

        var lightDirt6 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt6,
            }),
            0,
            1
        )

        var lightdirt7 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt7.wrapS = lightdirt7.wrapT = THREE.RepeatWrapping;
        lightdirt7.repeat.set(8, 1);

        var lightDirt7 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt7,
            }),
            0,
            1
        )

        
        var lightdirt8 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/LightDirt.jpg ')
        lightdirt8.wrapS = lightdirt8.wrapT = THREE.RepeatWrapping;
        lightdirt8.repeat.set(12, 1);

        var lightDirt8 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: lightdirt8,
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
        middirt2.repeat.set(1, 2);

        var midDirt2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: middirt2,
            }),
            0,
            1
        )

        var middirt3 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/MedDirt.jpg ')
        middirt3.wrapS = middirt3.wrapT = THREE.RepeatWrapping;
        middirt3.repeat.set(12, 1);

        var midDirt3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: middirt3,
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

        var silver3 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/silver.png ')
        silver3.wrapS = silver3.wrapT = THREE.RepeatWrapping;
        silver3.repeat.set(12, 1);

        var Silver3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: silver3,
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

        // CHEST

        var Chest1 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/ChestLeft.png ')
        Chest1.wrapS = Chest1.wrapT = THREE.RepeatWrapping;
        Chest1.repeat.set(1, 1);

        var chest1 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: Chest1,
            }),
            0,
            1
        )
        var Chest2 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/ChestRight.png ')
        Chest2.wrapS = Chest2.wrapT = THREE.RepeatWrapping;
        Chest2.repeat.set(1, 1);

        var chest2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: Chest2,
            }),
            0,
            1
        )
        var Chest3 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/ChestLeftUnder.png ')
        Chest3.wrapS = Chest3.wrapT = THREE.RepeatWrapping;
        Chest3.repeat.set(1, 1);

        var chest3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: Chest3,
            }),
            0,
            1
        )
        var Chest4 = THREE.ImageUtils.loadTexture(' Textures/FlyingIsland/ChestRightUnder.png ')
        Chest4.wrapS = Chest4.wrapT = THREE.RepeatWrapping;
        Chest4.repeat.set(1, 1);

        var chest4 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: Chest4,
            }),
            0,
            1
        )

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var MainGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            Grass,
            0
        );
        MainGrass.receiveShadow = true;
        MainGrass.position.set(0, 4.95, 25);
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
            new THREE.CubeGeometry(5, 10, 5),
            lightDirt2,
            0
        );
        MainDirt4.receiveShadow = true;
        MainDirt4.position.set(0, -17.5, 12.5);
        scene.add(MainDirt4);
        MainDirt4.name = "ground";

        var MainDirt5 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 25),
            lightDirt4,
            0
        );
        MainDirt5.receiveShadow = true;
        MainDirt5.position.set(0, -35, 37.5);
        scene.add(MainDirt5);
        MainDirt5.name = "ground";

        var MainDirt6 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 25, 5),
            lightDirt5,
            0
        );

        MainDirt6.receiveShadow = true;
        MainDirt6.position.set(0, -15, -62.5);
        scene.add(MainDirt6);
        MainDirt6.name = "ground";

        var MainDirt7 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 70),
            lightDirt6,
            0
        );

        MainDirt7.receiveShadow = true;
        MainDirt7.position.set(0, -20, -25);
        scene.add(MainDirt7);
        MainDirt7.name = "ground";

        var MainDirt8 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 40),
            lightDirt7,
            0
        );

        MainDirt8.receiveShadow = true;
        MainDirt8.position.set(0, -40, 10);
        scene.add(MainDirt8);
        MainDirt8.name = "ground";

        var MainDirt9 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            lightDirt8,
            0
        );

        MainDirt9.receiveShadow = true;
        MainDirt9.position.set(0, -45, -35);
        scene.add(MainDirt9);
        MainDirt9.name = "ground";

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
            new THREE.CubeGeometry(5, 10, 5),
            midDirt2,
            0
        );
        MainMidDirt2.receiveShadow = true;
        MainMidDirt2.position.set(0, -12.5, 7.5);
        scene.add(MainMidDirt2);
        MainMidDirt2.name = "ground";

        var MainMidDirt3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 10, 5),
            midDirt2,
            0
        );
        MainMidDirt3.receiveShadow = true;
        MainMidDirt3.position.set(0, -12.5, -57.5);
        scene.add(MainMidDirt3);
        MainMidDirt3.name = "ground";

        var MainMidDirt4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            midDirt3,
            0
        );
        MainMidDirt4.receiveShadow = true;
        MainMidDirt4.position.set(0, -15, -25);
        scene.add(MainMidDirt4);
        MainMidDirt4.name = "ground";

        var MainDarkDirt = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            darkDirt,
            0
        );
        MainDarkDirt.receiveShadow = true;
        MainDarkDirt.position.set(0, -10, -25);
        scene.add(MainDarkDirt);
        MainDarkDirt.name = "ground";

        var Trunk = new THREE.Mesh(
            new THREE.CubeGeometry(0, 25, 5),
            treeTrunk
        );
        Trunk.receiveShadow = true;
        Trunk.position.set(0, 19.5, 40);
        scene.add(Trunk);

        var Leaves = new THREE.Mesh(
            new THREE.CubeGeometry(0, 20, 20),
            Tree
        );
        Leaves.receiveShadow = true;
        Leaves.position.set(0, 35, 40);
        scene.add(Leaves);

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

        var silverBlock4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 60),
            Silver3,
            0
        );
        silverBlock4.receiveShadow = true;
        silverBlock4.position.set(0, 5, -35);
        scene.add(silverBlock4);
        silverBlock4.name = "ground";

        var WoodenDoor = new THREE.Mesh(
            new THREE.CubeGeometry(0, 10, 5),
            Door
        );
        WoodenDoor.receiveShadow = true;
        WoodenDoor.position.set(0, 12, -22.5);
        scene.add(WoodenDoor);

        var darkSilverBlock = new THREE.Mesh(
            new THREE.CubeGeometry(0, 20, 30),
            darkSilver
        );
        darkSilverBlock.receiveShadow = true;
        darkSilverBlock.position.set(0, 17, -40);
        scene.add(darkSilverBlock);

        var leftGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 10, 5),
            grassLeft,
            0
        );
        leftGrass.receiveShadow = true;
        leftGrass.position.set(0, -2.5, 57.45);
        scene.add(leftGrass);
        leftGrass.name = "ground";

        var rightGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 30, 5),
            grassRight,
            0
        );
        rightGrass.receiveShadow = true;
        rightGrass.position.set(0, -12.5, -67.45);
        scene.add(rightGrass);
        rightGrass.name = "ground";

        var leftCornerGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            leftCornerGrass,
            0
        );
        leftCornerGrass.receiveShadow = true;
        leftCornerGrass.position.set(0, 4.95, 57.45);
        scene.add(leftCornerGrass);
        leftCornerGrass.name = "ground";

        var leftCornerGrass2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            leftCornerGrass2,
            0
        );
        leftCornerGrass2.receiveShadow = true;
        leftCornerGrass2.position.set(0, -35.05, 57.45);
        scene.add(leftCornerGrass2);
        leftCornerGrass2.name = "ground";

        var LeftDownGrass = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            leftdowngrass,
            0
        );
        LeftDownGrass.receiveShadow = true;
        LeftDownGrass.position.set(0, -9.95, 57.45);
        scene.add(LeftDownGrass);
        LeftDownGrass.name = "ground";

        var Rightcorner = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            RightCornerGrass,
            0
        );
        Rightcorner.receiveShadow = true;
        Rightcorner.position.set(0, 5, -67.5);
        scene.add(Rightcorner);
        Rightcorner.name = "ground";

        var grassBlock = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 5),
            grasstile,
            0
        );
        grassBlock.receiveShadow = true;
        grassBlock.position.set(0, -35, 52.5);
        scene.add(grassBlock);
        grassBlock.name = "ground";

        var middleDirtWall = new THREE.Mesh(
            new THREE.CubeGeometry(0, 20, 40),
            dirtWall
        );
        middleDirtWall.receiveShadow = true;
        middleDirtWall.position.set(0, -22.5, 35);
        scene.add(middleDirtWall);

        //CHEST

        var ChestLeft1 = new THREE.Mesh(
            new THREE.CubeGeometry(0, 2.5, 2.5),
            chest1
        );
        ChestLeft1.receiveShadow = true;
        ChestLeft1.position.set(0, 11.5, -47.5);
        scene.add(ChestLeft1);

        var ChestLeft2 = new THREE.Mesh(
            new THREE.CubeGeometry(0, 2.5, 2.5),
            chest3
        );
        ChestLeft2.receiveShadow = true;
        ChestLeft2.position.set(0, 9, -47.5);
        scene.add(ChestLeft2);

        var ChestRight1 = new THREE.Mesh(
            new THREE.CubeGeometry(0, 2.5, 2.5),
            chest2
        );
        ChestRight1.receiveShadow = true;
        ChestRight1.position.set(0, 11.5, -50);
        scene.add(ChestRight1);

        var ChestRight2 = new THREE.Mesh(
            new THREE.CubeGeometry(0, 2.5, 2.5),
            chest4
        );
        ChestRight2.receiveShadow = true;
        ChestRight2.position.set(0, 9, -50);
        scene.add(ChestRight2);



    }
}