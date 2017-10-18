class Thundergart extends Level {
    constructor() {
        super();

        this.name = "Thundergart";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};

        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 10, z: 60 }, { y: 10, z: 20 }, { y: 10, z: -20 }, { y: 10, z: -60 }]

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

        var leftbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 25, 50),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        leftbase.receiveShadow = true;
        leftbase.position.set(0, -5, 40);
        scene.add(leftbase);
        leftbase.name = "ground";

        var rightbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 25, 50),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        rightbase.receiveShadow = true;
        rightbase.position.set(0, -5, -40);
        scene.add(rightbase);
        rightbase.name = "ground";


        var platform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        platform.receiveShadow = true;
        platform.position.set(0, 7, 0);
        scene.add(platform);
        platform.name = "ground";
        this.oneWayPlatforms.push(platform);

    }
}