class ZeldaMap extends Level{
    constructor(){
        super();
        
        
        this.spawn = [{y: 5, z : 30}, {y: 5, z : 15}, {y: 5, z : -25}, {y: 5, z : -40}]

        var leftsmallisland = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        leftsmallisland.receiveShadow = true;
        leftsmallisland.position.set(0, -5 , 20);
        scene.add(leftsmallisland);
        leftsmallisland.name = "ground";

        var rightbase = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 10, 30),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        rightbase.receiveShadow = true;
        rightbase.position.set(0, -5 , -30)  ;
        scene.add(rightbase);
        rightbase.name = "ground";

        var platform = new Physijs.BoxMesh(
            new THREE.CubeGeometry(15, 1, 30),
            new THREE.MeshBasicMaterial({ color: this.mudbrown }),
            0
        );
        platform.receiveShadow = true;
        platform.position.set(0, -0.5 , -10);
        scene.add(platform);
        platform.name ="ground";
        
    }
}