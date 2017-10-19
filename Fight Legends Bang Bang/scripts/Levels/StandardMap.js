class StandardMap extends Level {
    constructor() {
        super();

        this.name = "StandardMap";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};
        var material;
        var players = getPlayers();

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
        var cubeMaterial = new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('Textures/MarioBox/skybox.jpg'), side: THREE.DoubleSide});
        var cube = new THREE.Mesh (geometry, cubeMaterial);
        scene.add(cube);

        var groundTex = THREE.ImageUtils.loadTexture(' Textures/MarioLevel/ground.png ');
        groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
        groundTex.repeat.set(32, 4);

        
        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: groundTex,
            }),
            0,
            1
        )

        var bottom = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 100),
            material,
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

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/pipetopLeft.png ' )
            }),
            0,
            1
        )

        var pipetopLeft = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 5),
            material,
            0
        );
        pipetopLeft.receiveShadow = true;
        pipetopLeft.position.set(0, 10, 20);
        scene.add(pipetopLeft);
        pipetopLeft.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/pipetopRight.png ' )
            }),
            0,
            1
        )
    
        var pipetopRight = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 5),
            material,
            0
        );
        pipetopRight.receiveShadow = true;
        pipetopRight.position.set(0, 10, 18);
        scene.add(pipetopRight);
        pipetopRight.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/pipeLeft.png ' )
            }),
            0,
            1
        )

        var pipeLeft = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeLeft.receiveShadow = true;
        pipeLeft.position.set(0, 7, 20);
        scene.add(pipeLeft);
        pipeLeft.name = "ground";

        var pipeLeftUnder = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeLeftUnder.receiveShadow = true;
        pipeLeftUnder.position.set(0, 4, 20);
        scene.add(pipeLeftUnder);
        pipeLeftUnder.name = "ground";

        var pipeLeftUnder2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeLeftUnder2.receiveShadow = true;
        pipeLeftUnder2.position.set(0, 1, 20);
        scene.add(pipeLeftUnder2);
        pipeLeftUnder2.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/pipeRight.png ' )
            }),
            0,
            1
        )

        var pipeRight = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeRight.receiveShadow = true;
        pipeRight.position.set(0, 7, 18);
        scene.add(pipeRight);
        pipeRight.name = "ground";

        var pipeRightUnder = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeRightUnder.receiveShadow = true;
        pipeRightUnder.position.set(0, 4, 18);
        scene.add(pipeRightUnder);
        pipeRightUnder.name = "ground";

        var pipeRightUnder2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(3, 3, 4),
            material,
            0
        );
        pipeRightUnder2.receiveShadow = true;
        pipeRightUnder2.position.set(0, 1, 18);
        scene.add(pipeRightUnder2);
        pipeRightUnder2.name = "ground";

        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/Questionmark.png ' )
            }),
            0,
            1
        )

        var questionmark = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark.receiveShadow = true;
        questionmark.position.set(0, 28, 31);
        questionmark.hit = false;
        scene.add(questionmark);
        questionmark.name = "ground";

        var questionmark2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark2.receiveShadow = true;
        questionmark2.position.set(0, 28, 35);
        scene.add(questionmark2);
        questionmark2.name = "ground";

        var questionmark3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        
        questionmark3.receiveShadow = true;
        questionmark3.position.set(0, 28, 39);
        scene.add(questionmark3);
        questionmark3.name = "ground";
        
    	material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/coin.png ' )
            }),
            0,
            1
        )
        var coin = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        coin.receiveShadow = true;
        coin.position.set(0, 32, 39);
        scene.add(coin);
        coin.name = "ground";
        
        material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/bush.png ' )
            }),
            0,
            1
        )
        var bush = new Physijs.BoxMesh(
            new THREE.CubeGeometry(1, 4, 4),
            material,
            0
        )
        bush.receiveShadow = true;
        bush.position.set(0,2, 39);
        scene.add(bush);
        bush.name = "ground";

        while (questionmark.hit = false)
        {
         foreach (character in players)
         {
             if (character.position.y <= questionmark.position.y - 3)
             {
                material = Physijs.createMaterial(
                    new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/emptyQuestionmark.png ' )
                    }),
                    0,
                    1
                )
                questionmark.material = material;
                scene.add(questionmark);
                questionmark.hit = true;
             }
         }
        }
    }
}
