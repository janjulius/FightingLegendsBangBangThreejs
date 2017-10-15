class Thundergart extends Level {
    constructor() {
        super();

        this.name = "Thundergart";
        this.topLeft = {y: 100, z: 100 } ;
        this.bottomRight = {y: -75, z: -100};


        var possibleSpawns = [{ y: 5, z: 30 }, { y: 5, z: 15 }, { y: 5, z: -25 }, { y: 5, z: -40 }]

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

        var leftbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        leftbase.receiveShadow = true;
        leftbase.position.set(0, -5, 20);
        scene.add(leftbase);
        leftbase.name = "ground";

        var rightbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        rightbase.receiveShadow = true;
        rightbase.position.set(0, -5, -30);
        scene.add(rightbase);
        rightbase.name = "ground";


        var platform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        platform.receiveShadow = true;
        platform.position.set(0, -0.5, -10);
        scene.add(platform);
        platform.name = "ground";

    }
}