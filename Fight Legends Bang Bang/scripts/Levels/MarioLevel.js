class MarioLevel extends Level {
    constructor() {
        super();

        this.name = "MarioLevel";
        this.topLeft = {y: 200, z: 150 } ;
        this.bottomRight = {y: -70, z: -150};
        var material;
        var players = getPlayers();

        this.myAudio = new Audio('Music/Mario.mp3');
        this.myAudio.volume = MUSIC_VOLUME;
        this.myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.myAudio.play();
        this.coinBlockDoneMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/emptyQuestionmark.png ' )
            }),
            0,
            1
        )
        this.coinSound = new Audio('Sounds/smb3_coin.wav');

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

        var groundTex = THREE.ImageUtils.loadTexture(' Textures/MarioLevel/groundTop.png ');
        groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
        groundTex.repeat.set(10, 1);

        
        var groundTopMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: groundTex,
            }),
            0,
            1
        )

        var ground2Tex = THREE.ImageUtils.loadTexture(' Textures/MarioLevel/ground.png ');
        ground2Tex.wrapS = ground2Tex.wrapT = THREE.RepeatWrapping;
        ground2Tex.repeat.set(10, 28);

        
        var groundMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: ground2Tex,
            }),
            0,
            1
        )

        var bottomTop = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 50),
            groundTopMaterial,
            0
        );
        bottomTop.receiveShadow = true;
        bottomTop.position.set(0, -2.5, 40);
        scene.add(bottomTop);
        bottomTop.name = "ground";

        var bottom = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 200, 50),
            groundMaterial,
            0
        );
        bottom.receiveShadow = true;
        bottom.position.set(0, -105, 40);
        scene.add(bottom);
        bottom.name = "ground";

        
        var bottomTop2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 5, 50),
            groundTopMaterial,
            0
        );
        bottomTop2.receiveShadow = true;
        bottomTop2.position.set(0, -7.5, -25);
        scene.add(bottomTop2);
        bottomTop2.name = "ground";

        var bottom2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 200, 50),
            groundMaterial,
            0
        );
        bottom2.receiveShadow = true;
        bottom2.position.set(0, -110, -25);
        scene.add(bottom2)
        bottom2.name = "ground";

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
        questionmark.position.set(0, 15, 40);
        questionmark.hit = false;
        scene.add(questionmark);
        questionmark.name = "ground";

        var questionmark2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark2.receiveShadow = true;
        questionmark2.position.set(0, 15, 44);
        scene.add(questionmark2);
        questionmark2.name = "ground";

        var questionmark3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark3.receiveShadow = true;
        questionmark3.position.set(0, 30, 30);
        questionmark3.hit = false;
        scene.add(questionmark3);
        questionmark3.name = "ground";

        var questionmark4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark4.receiveShadow = true;
        questionmark4.position.set(0, 30, 26);
        scene.add(questionmark4);
        questionmark4.name = "ground";

        var questionmark5 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark5.receiveShadow = true;
        questionmark5.position.set(0, 40, 8);
        scene.add(questionmark5);
        questionmark5.name = "ground";

        var questionmark6 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark6.receiveShadow = true;
        questionmark6.position.set(0, 40, 4);
        scene.add(questionmark6);
        questionmark6.name = "ground";

        var questionmark7 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark7.receiveShadow = true;
        questionmark7.position.set(0, 40, 0);
        scene.add(questionmark7);
        questionmark7.name = "ground";

        var questionmark8 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark8.receiveShadow = true;
        questionmark8.position.set(0, 40, -4);
        scene.add(questionmark8);
        questionmark8.name = "ground";

        var questionmark9 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark9.receiveShadow = true;
        questionmark9.position.set(0, 40, -8);
        scene.add(questionmark9);
        questionmark9.name = "ground";

        var questionmark10 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark10.receiveShadow = true;
        questionmark10.position.set(0, 30, -30);
        questionmark10.hit = false;
        scene.add(questionmark10);
        questionmark10.name = "ground";

        var questionmark11 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark11.receiveShadow = true;
        questionmark11.position.set(0, 30, -26);
        scene.add(questionmark11);
        questionmark11.name = "ground";

        var questionmark12 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark12.receiveShadow = true;
        questionmark12.position.set(0, 15, -40);
        questionmark12.hit = false;
        scene.add(questionmark12);
        questionmark12.name = "ground";

        var questionmark13 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(4, 4, 4),
            material,
            0
        );
        questionmark13.receiveShadow = true;
        questionmark13.position.set(0, 15, -44);
        scene.add(questionmark13);
        questionmark13.name = "ground";

        questionmark.isQuestionmark = true;
        questionmark2.isQuestionmark = true;
        questionmark3.isQuestionmark = true;
        questionmark4.isQuestionmark = true;
        questionmark5.isQuestionmark = true;
        questionmark6.isQuestionmark = true;
        questionmark7.isQuestionmark = true;
        questionmark8.isQuestionmark = true;
        questionmark9.isQuestionmark = true;
        questionmark10.isQuestionmark = true;
        questionmark11.isQuestionmark = true;
        questionmark12.isQuestionmark = true;
        questionmark13.isQuestionmark = true;
/*
    	
        */
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
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        bush.receiveShadow = true;
        bush.position.set(-5,2, 39);
        scene.add(bush);
        bush.name = "ground";

        var bush2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        bush2.receiveShadow = true;
        bush2.position.set(-5,2, 35);
        scene.add(bush2);
        bush2.name = "ground";

        var bush3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        bush3.receiveShadow = true;
        bush3.position.set(-5,2, 31);
        scene.add(bush3);
        bush3.name = "ground";

        var bush4 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        bush4.receiveShadow = true;
        bush4.position.set(-5,2, 27);
        scene.add(bush4);
        bush4.name = "ground";

        var tlMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/topleftHill.png ' )
            }),
            0,
            1
        )

        var trMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/toprightHill.png ' )
            }),
            0,
            1
        )

        var tlMaterialnoB = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x00a800,
                transparent : false,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/topleftHill.png ' )
            }),
            0,
            1
        )

        var trMaterialnoB = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x00a800,
                transparent : false,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/toprightHill.png ' )
            }),
            0,
            1
        )

        var dlMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/leftHill.png ' )
            }),
            0,
            1
        )

        var drMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/rightHill.png ' )
            }),
            0,
            1
        )

        var tlHill = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            tlMaterial,
            0
        )
        tlHill.receiveShadow = true;
        tlHill.position.set(-5, 14, -10);
        scene.add(tlHill);
        tlHill.name = "ground";

        var trHill = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            trMaterial,
            0
        )
        trHill.receiveShadow = true;
        trHill.position.set(-5, 14, -14);
        scene.add(trHill);
        trHill.name = "ground";

        var dlHill = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHill.receiveShadow = true;
        dlHill.position.set(-5, 10, -10);
        scene.add(dlHill);
        dlHill.name = "ground";

        var drHill = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHill.receiveShadow = true;
        drHill.position.set(-5, 10, -14);
        scene.add(drHill);
        drHill.name = "ground";

        var dlHill2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHill2.receiveShadow = true;
        dlHill2.position.set(-5, 6, -10.2);
        scene.add(dlHill2);
        dlHill2.name = "ground";

        var dlHill3 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHill3.receiveShadow = true;
        dlHill3.position.set(-5, 2, -10.2);
        scene.add(dlHill3);
        dlHill3.name = "ground";

        var tlHillC = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            tlMaterial,
            0
        )
        tlHillC.receiveShadow = true;
        tlHillC.position.set(-4, 4, -6.5);
        scene.add(tlHillC);
        tlHillC.name = "ground";

        var trHillC = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            trMaterial,
            0
        )
        trHillC.receiveShadow = true;
        trHillC.position.set(-4, 4, -10.5);
        scene.add(trHillC);
        trHillC.name = "ground";

        var dlHillC = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHillC.receiveShadow = true;
        dlHillC.position.set(-4, 0, -6.5);
        scene.add(dlHillC);
        dlHillC.name = "ground";

        var drHillC = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillC.receiveShadow = true;
        drHillC.position.set(-4, 0, -10.5);
        scene.add(drHillC);
        drHillC.name = "ground";

        var drHillC2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillC2.receiveShadow = true;
        drHillC2.position.set(-4, -4, -10.5);
        scene.add(drHillC2);
        drHillC2.name = "ground";
        
        var tlHillD = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            tlMaterial,
            0
        )
        tlHillD.receiveShadow = true;
        tlHillD.position.set(-4, 0, -3);
        scene.add(tlHillD);
        tlHillD.name = "ground";

        var trHillD = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            trMaterial,
            0
        )
        trHillD.receiveShadow = true;
        trHillD.position.set(-4, 0, -7);
        scene.add(trHillD);
        trHillD.name = "ground";

        var dlHillD = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHillD.receiveShadow = true;
        dlHillD.position.set(-4, -4, -3);
        scene.add(dlHillD);
        dlHillD.name = "ground";

        var drHillD = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillD.receiveShadow = true;
        drHillD.position.set(-4, -4, -7);
        scene.add(drHillD);
        drHillD.name = "ground"; 

        var tlHillB = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            tlMaterial,
            0
        )
        tlHillB.receiveShadow = true;
        tlHillB.position.set(-4.5, 8, -13);
        scene.add(tlHillB);
        tlHillB.name = "ground";

        var trHillB = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            trMaterial,
            0
        )
        trHillB.receiveShadow = true;
        trHillB.position.set(-4.5, 8, -17);
        scene.add(trHillB);
        trHillB.name = "ground";

        var dlHillB = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHillB.receiveShadow = true;
        dlHillB.position.set(-4.5, 4, -13);
        scene.add(dlHillB);
        dlHillB.name = "ground";

        var drHillB = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillB.receiveShadow = true;
        drHillB.position.set(-4.5, 4, -17);
        scene.add(drHillB);
        drHillB.name = "ground"; 

        var dlHillB1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHillB1.receiveShadow = true;
        dlHillB1.position.set(-4.5, 0, -13);
        scene.add(dlHillB1);
        dlHillB1.name = "ground";

        var drHillB1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillB1.receiveShadow = true;
        drHillB1.position.set(-4.5, 0, -17);
        scene.add(drHillB1);
        drHillB1.name = "ground"; 

        var dlHillB2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            dlMaterial,
            0
        )
        dlHillB2.receiveShadow = true;
        dlHillB2.position.set(-4.5, -4, -13);
        scene.add(dlHillB2);
        dlHillB2.name = "ground";

        var drHillB2 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            drMaterial,
            0
        )
        drHillB2.receiveShadow = true;
        drHillB2.position.set(-4.5, -4, -17);
        scene.add(drHillB2);
        drHillB2.name = "ground"; 

        var tlHillE = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            tlMaterial,
            0
        )
        tlHillE.receiveShadow = true;
        tlHillE.position.set(-4, 1, -17);
        scene.add(tlHillE);
        tlHillE.name = "ground";

        var trHillE = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            trMaterial,
            0
        )
        trHillE.receiveShadow = true;
        trHillE.position.set(-4, 1, -21);
        scene.add(trHillE);
        trHillE.name = "ground";

        var dlHillE = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 6, 4),
            dlMaterial,
            0
        )
        dlHillE.receiveShadow = true;
        dlHillE.position.set(-4, -3, -17);
        scene.add(dlHillE);
        dlHillE.name = "ground";

        var drHillE = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 6, 4),
            drMaterial,
            0
        )
        drHillE.receiveShadow = true;
        drHillE.position.set(-4, -3, -21);
        scene.add(drHillE);
        drHillE.name = "ground";

        var nonAutisticCloud = THREE.ImageUtils.loadTexture(' Textures/MarioLevel/cloud.png ')
        nonAutisticCloud.wrapS = nonAutisticCloud.wrapT = THREE.RepeatWrapping;
        nonAutisticCloud.repeat.set(1, 1);

        var Cloudmaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                map: nonAutisticCloud,
            }),
            0,
            1
        )

        var cloud1 = new Physijs.BoxMesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            Cloudmaterial,
            0
        )
        cloud1.receiveShadow = true;
        cloud1.position.set(0, 25, 10);
        scene.add(cloud1);
        cloud1.name = "ground";

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

    playCoinSound(){
        this.coinSound.pause();
        this.coinSound.currentTime = 0;
        this.coinSound.play();
    }

    popCoin(x, y, z){
        var material = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent : true,
                map: THREE.ImageUtils.loadTexture(' Textures/MarioLevel/coin.png ' )
            }),
            0,
            1
        )
        var coin = new THREE.Mesh(
            new THREE.CubeGeometry(0.1, 4, 4),
            material,
            0
        )
        coin.receiveShadow = true;
        coin.position.set(x, y + 5, z);
        scene.add(coin);
        coin.name = "ground";
        deleteAfter(coin, 200);
    }
}
