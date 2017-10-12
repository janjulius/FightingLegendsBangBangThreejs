class Thundergart extends Level{
    constructor(){
        super();
        
        this.spawn1 = {y: 5, z : 30};
        this.spawn2 = {y: 5, z : 15};
        this.spawn3 = {y: 5, z : -25};
        this.spawn4 = {y: 5, z : -40};

        var leftbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        leftbase.receiveShadow = true;
        leftbase.position.set(0, -5 , 20);
        scene.add(leftbase);

        var rightbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        rightbase.receiveShadow = true;
        rightbase.position.set(0, -5 , -30)  ;
        scene.add(rightbase);

        var platform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.iceblue }),
            0
        );
        platform.receiveShadow = true;
        platform.position.set(0, -0.5 , -10);
        scene.add(platform);
        
    }
}