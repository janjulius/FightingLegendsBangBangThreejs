class Metalplant extends Level {
    constructor() {
        super();

        this.name = "Metalplant";
        this.topLeft = {y: 200, z: 180 } ;
        this.bottomRight = {y: -70, z: -180};

        this.myAudio = new Audio('Music/Titan.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 40, z: 35 }, { y: 30, z: -2.5 }, { y: 30, z: 12.5 }, { y: 10, z: -50 }]

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
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/front.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/back.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/up.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/down.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/right.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/Orange_sky/left.png'), side: THREE.DoubleSide} )
        ];

        var rust1 = THREE.ImageUtils.loadTexture(' Textures/TitansEnd/rust.jpg ')
        rust1.wrapS = rust1.wrapT = THREE.RepeatWrapping;
        rust1.repeat.set(1, 1);

        var RustTexture = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: rust1,
            }),
            0,
            1
        )

        var rust2 = THREE.ImageUtils.loadTexture(' Textures/TitansEnd/rust2.jpg ')
        rust2.wrapS = rust2.wrapT = THREE.RepeatWrapping;
        rust2.repeat.set(1, 5);

        var RustTexture2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: rust2,
            }),
            0,
            1
        )

        var rope1 = THREE.ImageUtils.loadTexture(' Textures/TitansEnd/rope.jpg ')
        rope1.wrapS = rope1.wrapT = THREE.RepeatWrapping;
        rope1.repeat.set(1, 20);

        var RopeTexture = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: rope1,
            }),
            0,
            1
        )

        var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials);
        var cube = new THREE.Mesh (geometry, cubeMaterial);
        scene.add(cube);

        var middleBase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2.5, 25),
            RustTexture,
            0
        );
        middleBase.receiveShadow = true;
        middleBase.position.set(0, 22.5, 5);
        scene.add(middleBase);
        middleBase.name = "ground";

        var middlePillar = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 35, 2.5),
            RustTexture,
            0
        );
        middlePillar.receiveShadow = true;
        middlePillar.position.set(0, 4, 5);
        scene.add(middlePillar);
        middlePillar.name = "ground";

        var rightplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 25),
            RustTexture,
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 0, -50);
        scene.add(rightplatform);
        rightplatform.name = "ground";

        var leftplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 20),
            RustTexture,
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 35, 35);
        scene.add(leftplatform);
        leftplatform.name = "ground";

        var leftRope1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 1),
            RopeTexture,
            0
        );
        leftRope1.receiveShadow = true;
        leftRope1.position.set(-6, 115, 27.5);
        scene.add(leftRope1);
        leftRope1.name = "ground";

        var leftRope2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 1),
            RopeTexture,
            0
        );
        leftRope2.receiveShadow = true;
        leftRope2.position.set(-6, 115, 45);
        scene.add(leftRope2);
        leftRope2.name = "ground";

        var middleBrokenPillar = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 140, 2.5),
            RustTexture2,
            0
        );
        middleBrokenPillar.rotation.x = 10;
        middleBrokenPillar.receiveShadow = true;
        middleBrokenPillar.position.set(-16, -70, -32.5);
        scene.add(middleBrokenPillar);
        middleBrokenPillar.name = "ground";

        var rightRope1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 50, 1),
            RopeTexture,
            0
        );
        rightRope1.rotateX(-0.2);
        rightRope1.receiveShadow = true;
        rightRope1.position.set(-10, 25, -45);
        scene.add(rightRope1);
        rightRope1.name = "ground";

        var rightRope2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 50, 1),
            RopeTexture,
            0
        );
        rightRope2.rotateX(0.2);
        rightRope2.receiveShadow = true;
        rightRope2.position.set(-10, 25, -55);
        scene.add(rightRope2);
        rightRope2.name = "ground";

        var rightplatformHigh = new Physijs.BoxMesh(
            new THREE.CubeGeometry(5, 5, 7.5),
            RustTexture,
            0
        );
        rightplatformHigh.receiveShadow = true;
        rightplatformHigh.position.set(1, 50, -50);
        scene.add(rightplatformHigh);
        rightplatformHigh.name = "ground";

        var rightRope3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 1),
            RopeTexture,
            0
        );
        rightRope3.receiveShadow = true;
        rightRope3.position.set(-10, 125, -55);
        scene.add(rightRope3);
        rightRope3.name = "ground";

        var rightRope4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 1),
            RopeTexture,
            0
        );
        rightRope4.receiveShadow = true;
        rightRope4.position.set(-10, 125, -50);
        scene.add(rightRope4);
        rightRope4.name = "ground";
        
    }
}
