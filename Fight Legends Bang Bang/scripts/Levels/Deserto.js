class Deserto extends Level {
    constructor() {
        super();

        this.name = "Deserto";
        this.topLeft = {y: 100, z: 150 } ;
        this.bottomRight = {y: -50, z: -100};
        this.myAudio = new Audio('Music/subspaceEmissary.mp3');
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 20, z: 0 }, { y: 16, z: 60}, { y: 30, z: 20 }, { y: 20, z: -50 }]

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
            new THREE.CubeGeometry(50, 10, 120),
            new THREE.MeshBasicMaterial({ color: this.sandyellow }),
            0
        );
        bottom.receiveShadow = true;
        bottom.position.set(0, -13, 45);
        scene.add(bottom);
        bottom.name = "ground";

        var leftplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 15),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 0, -50);
        scene.add(leftplatform);
        leftplatform.name = "ground";

        var leftupplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 2, 40),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        leftupplatform.receiveShadow = true;
        leftupplatform.position.set(0, 15, 60);
        scene.add(leftupplatform);
        leftupplatform.name = "ground";

        var rightplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 30),
            new THREE.MeshBasicMaterial({ color: this.forestgreen }),
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 8.5, 0);
        scene.add(rightplatform);
        rightplatform.name = "ground";

        var uprightplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 12),
            new THREE.MeshBasicMaterial({ color: this.forestgreen }),
            0
        );
        uprightplatform.receiveShadow = true;
        uprightplatform.position.set(0, 20, 0);
        scene.add(uprightplatform);
        uprightplatform.name = "ground";

        var upper = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2, 60),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        upper.receiveShadow = true;
        upper.position.set(0, 3, 60);
        scene.add(upper);
        upper.name = "ground";

        var burleywoodCube = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 5),
            new THREE.MeshBasicMaterial({ color: this.saddlebrown }),
            0
        );
        burleywoodCube.receiveShadow = true;
        burleywoodCube.position.set(0, 0, 0);
        scene.add(burleywoodCube);
        burleywoodCube.name = "ground";

        var cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(0,45,45,80),
            new THREE.MeshBasicMaterial( {color: this.goldenrod }),
            0
        );
        cylinder.receiveShadow = true;
        cylinder.position.set(-40,12,70);
        scene.add(cylinder);
        cylinder.name = "ground";
    }
}
