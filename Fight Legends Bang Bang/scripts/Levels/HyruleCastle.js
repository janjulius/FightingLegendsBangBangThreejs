class HyruleCastle extends Level {
    constructor() {
        super();

        this.name = "HyruleCastle";
        this.topLeft = {y: 150, z: 200 } ;
        this.bottomRight = {y: -70, z: -200};
        var Kastelenmuur;
        var GroteKastelenmuur;
        var MinderGroteKastelenmuur;
        var DonkereGroteKastelenmuur;

        this.myAudio = new Audio('Music/Castle.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 17.5, z: 40 }, { y: 25, z: 8 }, { y: 60, z: 8 }, { y: 17.5, z: -30 }]

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

        var kms = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/Kastelenmuur_dark.png ' )
        kms.wrapS = kms.wrapT = THREE.RepeatWrapping;
        kms.repeat.set(2, 4);

        Kastelenmuur = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: kms,
            }),
            0,
            1
        )

        var touwtje = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/Kastelenmuur2.png ' )
        touwtje.wrapS = touwtje.wrapT = THREE.RepeatWrapping;
        touwtje.repeat.set(4, 16);

        GroteKastelenmuur = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: touwtje,
            }),
            0,
            1
        )

        var rauwtje = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/Kastelenmuur.png ' )
        rauwtje.wrapS = rauwtje.wrapT = THREE.RepeatWrapping;
        rauwtje.repeat.set(3, 18);

        MinderGroteKastelenmuur = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: rauwtje,
            }),
            0,
            1
        )

        var donkertouwtje = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/Kastelenmuur2_dark.png ' )
        donkertouwtje.wrapS = donkertouwtje.wrapT = THREE.RepeatWrapping;
        donkertouwtje.repeat.set(8, 16);

        DonkereGroteKastelenmuur = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: donkertouwtje,
            }),
            0,
            1
        )

        var platformtouwtje = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/Platform_tile_1.png ' )
        platformtouwtje.wrapS = platformtouwtje.wrapT = THREE.RepeatWrapping;
        platformtouwtje.repeat.set(1, 1);

        var platformtile = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: platformtouwtje,
            }),
            0,
            1
        )

        var puntje = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/roof_tile_1.png ' )
        puntje.wrapS = puntje.wrapT = THREE.RepeatWrapping;
        puntje.repeat.set(2, 1);

        var puntj = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: puntje,
            }),
            0,
            1
        )

        var puntje2 = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/roof_tile_1.png ' )
        puntje2.wrapS = puntje2.wrapT = THREE.RepeatWrapping;
        puntje2.repeat.set(1, 5);

        var puntj2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: puntje2,
            }),
            0,
            1
        )
        var puntje3 = THREE.ImageUtils.loadTexture(' Textures/HyruleCastle/roof_tile_1.png ' )
        puntje3.wrapS = puntje3.wrapT = THREE.RepeatWrapping;
        puntje3.repeat.set(1, 2);

        var puntj3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: puntje3,
            }),
            0,
            1
        )

        var middleLowRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 20),
            MinderGroteKastelenmuur,
            0
        );
        middleLowRooftop.receiveShadow = true;
        middleLowRooftop.position.set(0, -75, 20);
        scene.add(middleLowRooftop);
        middleLowRooftop.name = "ground";

        var rightRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 30),
            GroteKastelenmuur,
            0
        );
        rightRooftop.receiveShadow = true;
        rightRooftop.position.set(0, -65, -25);
        scene.add(rightRooftop);
        rightRooftop.name = "ground";

        var leftRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 20),
            MinderGroteKastelenmuur,
            0
        );
        leftRooftop.receiveShadow = true;
        leftRooftop.position.set(0, -65, 40);
        scene.add(leftRooftop);
        leftRooftop.name = "ground";

        var middleRooftop = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 45),
            platformtile
        );
        middleRooftop.receiveShadow = true;
        middleRooftop.position.set(0, 20, 10);
        scene.add(middleRooftop);
        middleRooftop.name = "ground";
        this.oneWayPlatforms.push(middleRooftop);

        var middleRoofBase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 45),
            DonkereGroteKastelenmuur,
            0
        );
        middleRoofBase.receiveShadow = true;
        middleRoofBase.position.set(-6, -55, 10);
        scene.add(middleRoofBase);
        middleRoofBase.name = "ground";

        var CastleTower = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 40, 15),
            Kastelenmuur,
            0
        );
        CastleTower.receiveShadow = true;
        CastleTower.position.set(-16, 40, 5);
        scene.add(CastleTower);
        CastleTower.name = "ground";

        var platform1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            platformtile,
            0
        );
        platform1.receiveShadow = true;
        platform1.position.set(-6, 50, 7.5);
        scene.add(platform1);
        platform1.name = "ground";

        var platform2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            platformtile,
            0
        );
        platform2.receiveShadow = true;
        platform2.position.set(-6, 40, 2.5);
        scene.add(platform2);
        platform2.name = "ground";

        var platform3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            platformtile,
            0
        );
        platform3.receiveShadow = true;
        platform3.position.set(-6, 27.5, 7.5);
        scene.add(platform3);
        platform3.name = "ground";

        var pointroof1 = new Physijs.BoxMesh(
            new THREE.CylinderGeometry(0,5,50,40),
            puntj2,
            0
        )
        pointroof1.receiveShadow = true;
        pointroof1.position.set(-40,30,30);
        scene.add(pointroof1);

        var pointroof2 = new Physijs.BoxMesh(
            new THREE.CylinderGeometry(0,5,20,40),
            puntj3,
            0
        )
        pointroof2.receiveShadow = true;
        pointroof2.position.set(-15, 70,6);
        scene.add(pointroof2);

        var pointroof3 = new Physijs.BoxMesh(
            new THREE.CylinderGeometry(0,4,10,40),
            puntj,
            0
        )
        pointroof3.receiveShadow = true;
        pointroof3.position.set(-7,20,-30);
        scene.add(pointroof3);

        var square = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 7.5, 7.5),
            puntj,
            0
        );
        square.receiveShadow = true;
        square.position.set(-7, 12.5, -30);
        scene.add(square);
        square.name = "ground";
    }
}
