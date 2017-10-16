class Metalplant extends Level {
    constructor() {
        super();

        this.name = "Metalplant";
        this.topLeft = {y: 100, z: 100 } ;
        this.bottomRight = {y: -50, z: -100};

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

        var middleBase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 2.5, 25),
            new THREE.MeshBasicMaterial({ color: this.rusty }),
            0
        );
        middleBase.receiveShadow = true;
        middleBase.position.set(0, 22.5, 5);
        scene.add(middleBase);
        middleBase.name = "ground";

        var middlePillar = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 35, 2.5),
            new THREE.MeshBasicMaterial({ color: this.rusty }),
            0
        );
        middlePillar.receiveShadow = true;
        middlePillar.position.set(0, 5, 5);
        scene.add(middlePillar);
        middlePillar.name = "ground";

        var rightplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 25),
            new THREE.MeshBasicMaterial({ color: this.rusty }),
            0
        );
        rightplatform.receiveShadow = true;
        rightplatform.position.set(0, 0, -50);
        scene.add(rightplatform);
        rightplatform.name = "ground";

        var leftplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 15, 20),
            new THREE.MeshBasicMaterial({ color: this.rusty }),
            0
        );
        leftplatform.receiveShadow = true;
        leftplatform.position.set(0, 35, 35);
        scene.add(leftplatform);
        leftplatform.name = "ground";
    }
}