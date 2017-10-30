class Thundergart extends Level {
    constructor() {
        super();

        this.name = "Thundergart";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};
        
        this.myAudio = new Audio('Music/Thundergart.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 15, z: 60 }, { y: 15, z: 20 }, { y: 15, z: -20 }, { y: 15, z: -60 }]

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

        var base1 = THREE.ImageUtils.loadTexture(' Textures/Thundergard/base.png ')
        base1.wrapS = base1.wrapT = THREE.RepeatWrapping;
        base1.repeat.set(1, 1);

        var Base1 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: base1,
            }),
            0,
            1
        )

        var platform1 = THREE.ImageUtils.loadTexture(' Textures/Thundergard/platform.png ')
        platform1.wrapS = platform1.wrapT = THREE.RepeatWrapping;
        platform1.repeat.set(1, 1);

        var Platform1 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: platform1,
            }),
            0,
            1
        )

        var leftbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 50, 50),
            Base1,
            0
        );
        leftbase.receiveShadow = true;
        leftbase.position.set(0, -15, 50);
        scene.add(leftbase);
        leftbase.name = "ground";

        var rightbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 50, 50),
            Base1,
            0
        );
        rightbase.receiveShadow = true;
        rightbase.position.set(0, -15, -50);
        scene.add(rightbase);
        rightbase.name = "ground";


        var platform = new THREE.Mesh(
            new THREE.CubeGeometry(15, 2.5, 50),
            Platform1,
            0
        );
        platform.receiveShadow = true;
        platform.position.set(0, 9.5, 0);
        scene.add(platform);
        platform.name = "ground";
        this.oneWayPlatforms.push(platform);

    }
}