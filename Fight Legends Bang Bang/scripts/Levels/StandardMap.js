class StandardMap extends Level {
    constructor() {
        super();

        this.name = "StandardMap";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};

        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 20, z: 35 }, { y: 30, z: -8 }, { y: 30, z: 8 }, { y: 20, z: -35 }]

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
            new THREE.CubeGeometry(15, 10, 75),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        bottom.receiveShadow = true;
        bottom.position.set(0, -5, 0);
        scene.add(bottom);
        bottom.name = "ground";

        var leftplatform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 15),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 15, -35);
        scene.add(leftplatform);
        leftplatform.name = "ground";
        this.oneWayPlatforms.push(leftplatform);

        var rightplatform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 15),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 15, 35);
        scene.add(rightplatform);
        rightplatform.name = "ground";
        this.oneWayPlatforms.push(rightplatform);

        var upper = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        upper.receiveShadow = true;
        upper.position.set(0, 25, 0);
        scene.add(upper);
        upper.name = "ground";
        this.oneWayPlatforms.push(upper);
    }
}
