var container;
var controls;
var camera, scene, renderer;

'use strict';

Physijs.scripts.worker = 'physi/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';


init();

function init() {
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
			new THREE.MeshBasicMaterial({ color: 0x888888 })
	);
    box.castShadow = true;
    box.position.set(0,5,0);
	scene.add( box );

    floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 20, 2, 20 ),
			new THREE.MeshBasicMaterial({ color: 0x48ff00 }),
            0
	);
    floor.receiveShadow = true;
    floor.position.set(0,-5,0);
    scene.add(floor);

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

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    scene.simulate(); // run physics
    render();
    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera)

}