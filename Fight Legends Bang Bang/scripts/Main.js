var container;
var controls;
var camera, scene, renderer;
var direction = 0;
var speed = 8;
var clock = new THREE.Clock(true);
'use strict';

Physijs.scripts.worker = 'physi/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3( 0,-30,0));
init();

function init() {
	var gameHUD = new Interface();
	scene.add(gameHUD.getCursor(0));
	
    renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;
    container = document.createElement( 'div' );
    document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	
	scene = new Physijs.Scene;
	
	camera = new THREE.PerspectiveCamera(
		35,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.set( 60, 50, 0 );
	camera.lookAt( scene.position );
	scene.add( camera );

    light = new THREE.DirectionalLight( 0xFFFFFF );
		light.position.set( 20, 40, -15 );
		light.target.position.copy( scene.position );
		light.castShadow = true;
		light.shadowCameraLeft = -60;
		light.shadowCameraTop = -60;
		light.shadowCameraRight = 60;
		light.shadowCameraBottom = 60;
		light.shadowCameraNear = 20;
		light.shadowCameraFar = 200;
		light.shadowBias = -.0001
		light.shadowMapWidth = light.shadowMapHeight = 2048;
		light.shadowDarkness = .7;
		scene.add( light );


    box = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 },
            1)
	);
    box.castShadow = true;
    box.position.set(0,15,0);
	scene.add( box );

    testbox = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5, 5, 5 ),
			new THREE.MeshBasicMaterial({ color: 0x888888 })
	);
    testbox.castShadow = true;
    testbox.position.set(0,5,-10);
	scene.add( testbox );

    //console.log(box.getvelocity());

    floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 15, 2, 50 ),
			new THREE.MeshBasicMaterial({ color: 0x48ff00 }),
            0
	);
    floor.receiveShadow = true;
    floor.position.set(0,-5,0);
    scene.add(floor);

    scene.simulate();
    requestAnimationFrame( animate );

    /*
	var t = new Willem("willem");
	var b = new Willem("brede willem");
	t.specialAtk();
	t.getMoveSpeed();
	b.getMoveSpeed();
	console.log(t.name);
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 0, 0, 40 );
	controls = new THREE.GamepadControls( camera );
	scene = new THREE.Scene();
	scene.add( new THREE.AmbientLight( 0x808080 ) );
	mesh = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 10 ), new THREE.MeshNormalMaterial() );
	scene.add( mesh );
	camera.lookAt( mesh.position );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
    */
}

 window.addEventListener('keydown', function(event) {
    if (event.keyCode == 65) { //a
        direction = 1;
    } else if (event.keyCode == 68) { //d
        direction = -1;
    } else if (event.keyCode == 87) { //w
    } else if (event.keyCode == 83) { //s
    }
 });

 window.addEventListener('keyup', function(event) {
    if (event.keyCode == 65) { //a
        direction = 0;
    } else if (event.keyCode == 68) { //d
        direction = 0;
    } else if (event.keyCode == 87) { //w
    } else if (event.keyCode == 83) { //s
    }
 });


scene.addEventListener( 'update', function() {
    var timeElapsed = clock.getDelta();
    // the scene's physics have finished updating
    box.position.z += (direction *speed)*timeElapsed;
    box.setAngularFactor( new THREE.Vector3(0,0,0));
    box.__dirtyPosition = true;
    scene.simulate(); // run physics
});

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
	renderer.clear();
    renderer.render(scene, camera);
	renderer.clearDepth();
}