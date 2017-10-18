class ZeldaMap extends Level {
    constructor() {
        super();

        this.name = "ZeldaMap";
        this.topLeft = { y: 150, z: 200 };
        this.bottomRight = { y: -75, z: -200 };
        this.myAudio = new Audio('Music/zelda.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();

        var possibleSpawns = [{ y: 20, z: 50 }, { y: -12.50, z: 30 }, { y: 10, z: -30 }, { y: 32.5, z: -60 }];

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

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
                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_ft.png'), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_bk.png'), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_up.png'), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_dn.png'), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_rt.png'), side: THREE.DoubleSide }),

                new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Textures/sor_sea/sea_lf.png'), side: THREE.DoubleSide })
            ];

        var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
        var cube = new THREE.Mesh(geometry, cubeMaterial);
        scene.add(cube);
        var kms = THREE.ImageUtils.loadTexture(' Textures/HyruleTemple/mossyStone.png ')
        kms.wrapS = kms.wrapT = THREE.RepeatWrapping;
        kms.repeat.set(4, 2);

        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: kms,
            }),
            0,
            1
        )

        var texture2 = THREE.ImageUtils.loadTexture(' Textures/HyruleTemple/mossyStone.png ' )
        texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set(1, 0.3);

        var texture2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture2,
            }),
            0,
            1
        )

        var texture3 = THREE.ImageUtils.loadTexture(' Textures/HyruleTemple/mossyStone.png ' )
        texture3.wrapS = texture3.wrapT = THREE.RepeatWrapping;
        texture3.repeat.set(1.1, 1.1);

        var texture3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture3,
            }),
            0,
            1
        )

        var touwtje = THREE.ImageUtils.loadTexture(' Textures/HyruleTemple/Kastelenmuur2.png ' )
        touwtje.wrapS = touwtje.wrapT = THREE.RepeatWrapping;
        touwtje.repeat.set(1, 1);

        var touwtje = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: touwtje,
            }),
            0,
            1
        )

        var leftsmallisland = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 10),
            texture2,
            0
        );
        leftsmallisland.receiveShadow = true;
        leftsmallisland.position.set(0, 15, 55);
        scene.add(leftsmallisland);
        leftsmallisland.name = "ground";

        var leftsmallislandsolid = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 10),
            texture3,
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
            texture3,
            0
        );
        leftlargeislandsolid.receiveShadow = true;
        leftlargeislandsolid.position.set(0, 12.5, 27.5);
        scene.add(leftlargeislandsolid);
        leftlargeislandsolid.name = "ground";

        var leftlargeislandsolid2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 12.5, 15),
            texture3,
            0
        );
        leftlargeislandsolid2.receiveShadow = true;
        leftlargeislandsolid2.position.set(0, 13.75, 17.5);
        scene.add(leftlargeislandsolid2);
        leftlargeislandsolid2.name = "ground";

        var leftlargeislandsolid3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 15),
            texture3,
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
            material,
            0
        );
        mainisland.receiveShadow = true;
        mainisland.position.set(0, -2.5, -40);
        scene.add(mainisland);
        mainisland.name = "ground";

        var mainislandplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 10),
            texture2,
            0
        );
        mainislandplatform.receiveShadow = true;
        mainislandplatform.position.set(0, 7, -70);
        scene.add(mainislandplatform);
        mainislandplatform.name = "ground";

        var mainisland2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 20),
            texture2,
            0
        );
        mainisland2.receiveShadow = true;
        mainisland2.position.set(0, -10, -5);
        scene.add(mainisland2);
        mainisland2.name = "ground";

        var lowerisland1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 30, 25),
            material,
            0
        );
        lowerisland1.receiveShadow = true;
        lowerisland1.position.set(0, -30, 32.5);
        scene.add(lowerisland1);
        lowerisland1.name = "ground";

        var lowerisland2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 22.5, 25),
            material,
            0
        );
        lowerisland2.receiveShadow = true;
        lowerisland2.position.set(0, -32.5, 20);
        scene.add(lowerisland2);
        lowerisland2.name = "ground";

        var lowerplatform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 10),
            touwtje,
            0
        );
        lowerplatform.receiveShadow = true;
        lowerplatform.position.set(0, -35, -10);
        scene.add(lowerplatform);
        lowerplatform.name = "ground";

    }
}