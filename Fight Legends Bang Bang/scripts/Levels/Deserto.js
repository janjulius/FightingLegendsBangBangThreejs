class Deserto extends Level {
    constructor() {
        super();

        this.name = "Deserto";
        this.topLeft = {y: 200, z: 250 };
        this.bottomRight = {y: -100, z: -250};
        var material;
        this.myAudio = new Audio('Music/subspaceEmissary.mp3');
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 20, z: 0 }, { y: 16, z: 60}, { y: 30, z: 20 }, { y: 20, z: -50 }, { y: 10, z: 150}];

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

        var bottom = new Physijs.BoxMesh(
            new THREE.CubeGeometry(50, 20, 130),
            new THREE.MeshBasicMaterial({ color: this.sandyellow }),
            0
        );
        bottom.receiveShadow = true;
        bottom.position.set(0, -20, 45);
        scene.add(bottom);
        bottom.name = "ground";

        var rightplatform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 2, 15),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 0, -50);
        scene.add(rightplatform);
        rightplatform.name = "ground";
        this.oneWayPlatforms.push(rightplatform);

        var leftplatform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 2, 15),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 0, 150);
        scene.add(leftplatform);
        leftplatform.name = "ground";
        this.oneWayPlatforms.push(leftplatform);

        var leftupplatform = new THREE.Mesh(
            new THREE.CubeGeometry(10, 2, 40),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        leftupplatform.receiveShadow = true;
        leftupplatform.position.set(0, 15, 60);
        scene.add(leftupplatform);
        leftupplatform.name = "ground";
        this.oneWayPlatforms.push(leftupplatform);

        var upper = new THREE.Mesh(
            new THREE.CubeGeometry(15, 2, 60),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        upper.receiveShadow = true;
        upper.position.set(0, 3, 60);
        scene.add(upper);
        upper.name = "ground";
        this.oneWayPlatforms.push(upper);

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/Deserto/cactus.jpg ' )
            }),
            0,
            1
        )
        var cactusBase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 20, 3),
            material,
            0
        );
        cactusBase.receiveShadow = true;
        cactusBase.position.set(0, 0, 0);
        scene.add(cactusBase);
        cactusBase.name = "ground";

        var leftCactus = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3,3,1.5),
            material,
            0
        );
        leftCactus.receiveShadow = true;
        leftCactus.position.set(0, 6, 2);
        scene.add(leftCactus);
        leftCactus.name = "ground";

        var leftupCactus = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 8, 3),
            material,
            0
        );

        leftupCactus.receiveShadow = true;
        leftupCactus.position.set(0, 8.5, 4);
        scene.add(leftupCactus);
        leftupCactus.name = "ground";

        var rightCactus = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3,3,1.5),
            material,
            0
        );
        rightCactus.receiveShadow = true;
        rightCactus.position.set(0, 4, -2);
        scene.add(rightCactus);
        rightCactus.name = "ground";

        var rightupCactus = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 8, 3),
            material,
            0
        );

        rightupCactus.receiveShadow = true;
        rightupCactus.position.set(0, 6.5, -4);
        scene.add(rightupCactus);
        rightupCactus.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/Deserto/pyramid.jpg ' )
            }),
            0,
            1
        )
        var cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(0,45,45,80),
            material,
            0
        );
        cylinder.receiveShadow = true;
        cylinder.position.set(-50,12,70);
        scene.add(cylinder);
        cylinder.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/Deserto/wood.jpg ' )
            }),
            0,
            1
        )
        var pillar = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 150, 10),
            material,
            0
        );
        pillar.receiveShadow = true;
        pillar.position.set(-5, -100, 50);
        scene.add(pillar);
        pillar.name = "ground";

    }
}
