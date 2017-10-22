class Brawlhaven extends Level {

    constructor() {
        super();
        this.name = "Brawlhaven";
        this.topLeft = {y: 100, z: 150 } ;
        this.bottomRight = {y: -75, z: -150};

        this.myAudio = new Audio('Music/Brawlhaven.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 15, z: 50 }, { y: 5, z: 0 }, { y: -10, z: 0 }, { y: 25, z: -50 }]

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

        var matGrass = new THREE.MeshBasicMaterial({ color: this.grassgreen });
        var matMud = new THREE.MeshBasicMaterial({ color: this.mudbrown });

        var lowerbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 9, 60),
            matMud,
            0
        );
        lowerbase.receiveShadow = true;
        lowerbase.position.set(0, -18, 0);
        scene.add(lowerbase);
        lowerbase.name = "ground";

        var lowergrass = new THREE.Mesh(
            new THREE.CubeGeometry(15.5, 1, 60.5),
            matGrass
        );
        lowergrass.receiveShadow = true;
        lowergrass.position.set(0, -13.5, 0);
        scene.add(lowergrass);

        var upperbaseleft = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 4, 20),
            matMud,
            0
        );
        upperbaseleft.receiveShadow = true;
        upperbaseleft.position.set(0, 0, 15);
        scene.add(upperbaseleft);
        upperbaseleft.name = "ground";

        var uppergrassleft = new THREE.Mesh(
            new THREE.CubeGeometry(15.5, 1, 20.5),
            matGrass
        );
        uppergrassleft.receiveShadow = true;
        uppergrassleft.position.set(0, 2, 15);
        scene.add(uppergrassleft);

        var upperbaseright = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 4, 20),
            matMud,
            0
        );
        upperbaseright.receiveShadow = true;
        upperbaseright.position.set(0, 0, -15);
        scene.add(upperbaseright);
        upperbaseright.name = "ground";

        var uppergrassright = new THREE.Mesh(
            new THREE.CubeGeometry(15.5, 1, 20.5),
            matGrass
        );
        uppergrassright.receiveShadow = true;
        uppergrassright.position.set(0, 2, -15);
        scene.add(uppergrassright);

        var grassplatform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 9.5),
            matGrass
        );
        grassplatform.receiveShadow = true;
        grassplatform.position.set(0, 2, 0);
        scene.add(grassplatform);
        grassplatform.name = "ground";
        this.oneWayPlatforms.push(grassplatform);

        var leftislandbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 15),
            matMud,
            0
        );
        leftislandbase.receiveShadow = true;
        leftislandbase.position.set(0, 3, 50);
        scene.add(leftislandbase);
        leftislandbase.name = "ground";

        var leftislandgrass = new THREE.Mesh(
            new THREE.CubeGeometry(15.5, 1, 15.5),
            matGrass
        );
        leftislandgrass.receiveShadow = true;
        leftislandgrass.position.set(0, 12.5, 50);
        scene.add(leftislandgrass);

        var leftislandsquare = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15.5, 10, 7.5),
            matMud,
            0
        );
        leftislandsquare.receiveShadow = true;
        leftislandsquare.position.set(0, -11, 53.75);
        scene.add(leftislandsquare);
        leftislandsquare.name = "ground";

        var rightislandbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 15),
            matMud,
            0
        );
        rightislandbase.receiveShadow = true;
        rightislandbase.position.set(0, 15, -50);
        scene.add(rightislandbase);
        rightislandbase.name = "ground";

        var rightislandgrass = new THREE.Mesh(
            new THREE.CubeGeometry(15.5, 1, 15.5),
            matGrass
        );
        rightislandgrass.receiveShadow = true;
        rightislandgrass.position.set(0, 22.5, -50);
        scene.add(rightislandgrass);


    }
}

