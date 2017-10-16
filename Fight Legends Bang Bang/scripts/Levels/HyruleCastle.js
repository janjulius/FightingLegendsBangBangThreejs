class HyruleCastle extends Level {
    constructor() {
        super();

        this.name = "HyruleCastle";
        this.topLeft = {y: 100, z: 100 } ;
        this.bottomRight = {y: -50, z: -100};

        this.myAudio = new Audio('Music/Castle.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
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

        var middleLowRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 20),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleLowRooftop.receiveShadow = true;
        middleLowRooftop.position.set(0, -75, 20);
        scene.add(middleLowRooftop);
        middleLowRooftop.name = "ground";

        var rightRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 30),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        rightRooftop.receiveShadow = true;
        rightRooftop.position.set(0, -65, -25);
        scene.add(rightRooftop);
        rightRooftop.name = "ground";

        var leftRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 150, 20),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        leftRooftop.receiveShadow = true;
        leftRooftop.position.set(0, -65, 40);
        scene.add(leftRooftop);
        leftRooftop.name = "ground";

        var middleRooftop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 45),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleRooftop.receiveShadow = true;
        middleRooftop.position.set(0, 20, 10);
        scene.add(middleRooftop);
        middleRooftop.name = "ground";

        var middleRoofBase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 150, 45),
            new THREE.MeshBasicMaterial({ color: this.castle }),
            0
        );
        middleRoofBase.receiveShadow = true;
        middleRoofBase.position.set(-6, -55, 10);
        scene.add(middleRoofBase);
        middleRoofBase.name = "ground";

        var CastleTower = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 40, 15),
            new THREE.MeshBasicMaterial({ color: this.castle }),
            0
        );
        CastleTower.receiveShadow = true;
        CastleTower.position.set(-6, 40, 5);
        scene.add(CastleTower);
        CastleTower.name = "ground";

        var platform1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        platform1.receiveShadow = true;
        platform1.position.set(-6, 50, 7.5);
        scene.add(platform1);
        platform1.name = "ground";

        var platform2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        platform2.receiveShadow = true;
        platform2.position.set(-6, 40, 2.5);
        scene.add(platform2);
        platform2.name = "ground";

        var platform3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 7.5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        platform3.receiveShadow = true;
        platform3.position.set(-6, 27.5, 7.5);
        scene.add(platform3);
        platform3.name = "ground";
    }
}
