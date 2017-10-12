class StandardMap extends Level{
    constructor(){
        super();
        var floor;
        this.spawn = [{y: 5, z : 30}, {y: 10, z : -8}, {y: 10, z : 8}, {y: 5, z : -30}]
        
        var bottom = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 10, 50),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            bottom.receiveShadow = true;
            bottom.position.set(0, -13, 0);
            scene.add(bottom);
    
            var leftplatform = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            leftplatform.receiveShadow = true;
            leftplatform.position.set(0, 0 , -30);
            scene.add(leftplatform);
    
            var rightplatform = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 10),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            rightplatform.receiveShadow = true;
            rightplatform.position.set(0, 0 , 30);
            scene.add(rightplatform);
    
            var upper = new Physijs.BoxMesh(
                new THREE.CubeGeometry(15, 2, 30),
                new THREE.MeshBasicMaterial({ color: this.burlywoodbrown }),
                0
            );
            upper.receiveShadow = true;
            upper.position.set(0, 8 , 0);
            scene.add(upper);
        }
    }
