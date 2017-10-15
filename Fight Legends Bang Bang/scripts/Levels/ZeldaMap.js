class ZeldaMap extends Level {
    constructor() {
        super();
        
        this.name = "ZeldaMap";
        this.topLeft = {y: 125, z: 120 } ;
        this.bottomRight = {y: -75, z: -120};

        var possibleSpawns = [{ y: 20, z: 50 }, { y: -12.50, z: 30 }, { y: 10, z: -30 }, { y: 32.5, z: -60 }];

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


        var leftsmallisland = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 10),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        leftsmallisland.receiveShadow = true;
        leftsmallisland.position.set(0, 15, 55);
        scene.add(leftsmallisland);
        leftsmallisland.name = "ground";

        var leftsmallislandsolid = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 10),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        leftsmallislandsolid.receiveShadow = true;
        leftsmallislandsolid.position.set(0, 12.5, 45);
        scene.add(leftsmallislandsolid);
        leftsmallislandsolid.name = "ground";

        var leftplatform1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        leftplatform1.receiveShadow = true;
        leftplatform1.position.set(0, 17, 35);
        scene.add(leftplatform1);
        leftplatform1.name = "ground";

        var leftplatform2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        leftplatform2.receiveShadow = true;
        leftplatform2.position.set(0, 8, 38);
        scene.add(leftplatform2);
        leftplatform2.name = "ground";

        var leftlargeislandsolid = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 5),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        leftlargeislandsolid.receiveShadow = true;
        leftlargeislandsolid.position.set(0, 12.5, 27.5);
        scene.add(leftlargeislandsolid);
        leftlargeislandsolid.name = "ground";

        var leftlargeislandsolid2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 12.5, 15),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        leftlargeislandsolid2.receiveShadow = true;
        leftlargeislandsolid2.position.set(0, 13.75, 17.5);
        scene.add(leftlargeislandsolid2);
        leftlargeislandsolid2.name = "ground";

        var leftlargeislandsolid3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 15),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        leftlargeislandsolid3.receiveShadow = true;
        leftlargeislandsolid3.position.set(0, 15, 5);
        scene.add(leftlargeislandsolid3);
        leftlargeislandsolid3.name = "ground";

        var middleplatform1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleplatform1.receiveShadow = true;
        middleplatform1.position.set(0, 20, -20);
        scene.add(middleplatform1);
        middleplatform1.name = "ground";

        var middleplatform2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleplatform2.receiveShadow = true;
        middleplatform2.position.set(0, 25, -40);
        scene.add(middleplatform2);
        middleplatform2.name = "ground";

        var middleplatform3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleplatform3.receiveShadow = true;
        middleplatform3.position.set(0, 30, -60);
        scene.add(middleplatform3);
        middleplatform3.name = "ground";

        var middleplatform4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleplatform4.receiveShadow = true;
        middleplatform4.position.set(0, 40, -60);
        scene.add(middleplatform4);
        middleplatform4.name = "ground";

        var middleplatform5 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 27.5),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        middleplatform5.receiveShadow = true;
        middleplatform5.position.set(0, 30, 11);
        scene.add(middleplatform5);
        middleplatform5.name = "ground";

        var mainisland = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 20, 50),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        mainisland.receiveShadow = true;
        mainisland.position.set(0, -2.5, -40);
        scene.add(mainisland);
        mainisland.name = "ground";

        var mainislandplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        mainislandplatform.receiveShadow = true;
        mainislandplatform.position.set(0, 7, -65);
        scene.add(mainislandplatform);
        mainislandplatform.name = "ground";

        var mainisland2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 20),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        mainisland2.receiveShadow = true;
        mainisland2.position.set(0, -10, -5);
        scene.add(mainisland2);
        mainisland2.name = "ground";

        var lowerisland1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 30, 25),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        lowerisland1.receiveShadow = true;
        lowerisland1.position.set(0, -30, 32.5);
        scene.add(lowerisland1);
        lowerisland1.name = "ground";

        var lowerisland2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 22.5, 25),
            new THREE.MeshBasicMaterial({ color: this.mossgreen }),
            0
        );
        lowerisland2.receiveShadow = true;
        lowerisland2.position.set(0, -32.5, 20);
        scene.add(lowerisland2);
        lowerisland2.name = "ground";

        var lowerplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 10),
            new THREE.MeshBasicMaterial({ color: this.tilegray }),
            0
        );
        lowerplatform.receiveShadow = true;
        lowerplatform.position.set(0, -35, -10);
        scene.add(lowerplatform);
        lowerplatform.name = "ground";

    }
}