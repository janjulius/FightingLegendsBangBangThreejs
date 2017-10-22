class PretPaleis extends Level {
    constructor() {
        super();

        this.name = "PretPaleis";
        this.topLeft = {y: 100, z: 80 } ;
        this.bottomRight = {y: -70, z: -80};

         //MUSIC

         this.myAudio = new Audio('Music/Underground.mp3');
         this.myAudio.volume = MUSIC_VOLUME;
         this.myAudio.addEventListener('ended', function() {
             this.currentTime = 0;
             this.play();
         }, false);
         this.myAudio.play();

        var possibleSpawns = [{ y: 30, z: 40 }, { y: 30, z: -40 }, { y: 60, z: -0 }, { y: 10, z: -0 }]

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
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Front.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Back.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Up.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Down.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Left.png'), side: THREE.DoubleSide} ),
            
            new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/PretPaleisBox/Right.png'), side: THREE.DoubleSide} )
        ];

        var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials);
        var cube = new THREE.Mesh (geometry, cubeMaterial);
        scene.add(cube);

        var jungleVine = THREE.ImageUtils.loadTexture(' Textures/PretPaleis/notsodark.png ')
        jungleVine.wrapS = jungleVine.wrapT = THREE.RepeatWrapping;
        jungleVine.repeat.set(1, 10);

        var vines = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: jungleVine,
            }),
            0,
            1
        )

        var jungleVinelonger = THREE.ImageUtils.loadTexture(' Textures/PretPaleis/notsodark.png ')
        jungleVinelonger.wrapS = jungleVinelonger.wrapT = THREE.RepeatWrapping;
        jungleVinelonger.repeat.set(1, 40);

        var vineslonger = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: jungleVinelonger,
            }),
            0,
            1
        )

        var crystal = THREE.ImageUtils.loadTexture(' Textures/PretPaleis/notsodark.png ')
        crystal.wrapS = crystal.wrapT = THREE.RepeatWrapping;
        crystal.repeat.set(3, 1);

        var stonehoriontal = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: crystal,
            }),
            0,
            1
        )

        var vertical = THREE.ImageUtils.loadTexture(' Textures/PretPaleis/notsodark.png ')
        vertical.wrapS = vertical.wrapT = THREE.RepeatWrapping;
        vertical.repeat.set(1, 3);

        var stonevertital = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: vertical,
            }),
            0,
            1
        )

        var dark = THREE.ImageUtils.loadTexture(' Textures/PretPaleis/DARKIES.png ')
        dark.wrapS = dark.wrapT = THREE.RepeatWrapping;
        dark.repeat.set(50, 50);

        var DARKIES = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: dark,
            }),
            0,
            1
        )

        var leftvines = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 100, 5),
            vines,
            0
        );
        leftvines.receiveShadow = true;
        leftvines.position.set(0, -20, 40);
        scene.add(leftvines);
        leftvines.name = "ground";

        var leftvinesUpper = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 100, 5),
            vines,
            0
        );
        leftvinesUpper.receiveShadow = true;
        leftvinesUpper.position.set(0, 100, 40);
        scene.add(leftvinesUpper);
        leftvinesUpper.name = "ground";

        var rightvines = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 100, 5),
            vines,
            0
        );
        rightvines.receiveShadow = true;
        rightvines.position.set(0, -20, -40);
        scene.add(rightvines);
        rightvines.name = "ground";

        var rightvinesUpper = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 100, 5),
            vines,
            0
        );
        rightvinesUpper.receiveShadow = true;
        rightvinesUpper.position.set(0, 100, -40);
        scene.add(rightvinesUpper);
        rightvinesUpper.name = "ground";

        var leftvineslong = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 400, 5),
            vineslonger,
            0
        );
        leftvineslong.receiveShadow = true;
        leftvineslong.position.set(0, -20, 75);
        scene.add(leftvineslong);
        leftvineslong.name = "ground";

        
        var rightvineslong = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 400, 5),
            vineslonger,
            0
        );
        rightvineslong.receiveShadow = true;
        rightvineslong.position.set(0, -20, -75);
        scene.add(rightvineslong);
        rightvineslong.name = "ground";


        var crystal1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 30),
            stonehoriontal,
            0
        );
        crystal1.receiveShadow = true;
        crystal1.position.set(0, 7, 0);
        scene.add(crystal1);
        crystal1.name = "ground";

        var crystal2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 5),
            stonevertital,
            0
        );
        crystal2.receiveShadow = true;
        crystal2.position.set(0, 19, 12.5);
        scene.add(crystal2);
        crystal2.name = "ground";

        var crystal3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 5),
            stonevertital,
            0
        );
        crystal3.receiveShadow = true;
        crystal3.position.set(0, 19, -12.5);
        scene.add(crystal3);
        crystal3.name = "ground";

        var crystal4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 30),
            stonehoriontal,
            0
        );
        crystal4.receiveShadow = true;
        crystal4.position.set(0, 40, 0);
        scene.add(crystal4);
        crystal4.name = "ground";

        var back = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 500, 500),
            DARKIES,
            0
        );
        back.receiveShadow = true;
        back.position.set(-4, 40, 0);
        scene.add(back);
        back.name = "ground";

    }
}
