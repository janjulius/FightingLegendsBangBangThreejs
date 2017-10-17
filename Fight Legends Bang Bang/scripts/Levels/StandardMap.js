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

        var bottom = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 75),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        bottom.receiveShadow = true;
        bottom.position.set(0, -5, 0);
        scene.add(bottom);
        bottom.name = "ground";

        var leftplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 15),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 15, -35);
        scene.add(leftplatform);
        leftplatform.name = "ground";

        var rightplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 15),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 15, 35);
        scene.add(rightplatform);
        rightplatform.name = "ground";

        var upper = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 30),
            new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
            0
        );
        upper.receiveShadow = true;
        upper.position.set(0, 25, 0);
        scene.add(upper);
        upper.name = "ground";
    }
}
