var container;
var controls;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var gameInterface;
var players = [];
var controls = new THREE.GamepadControls();
'use strict';

Physijs.scripts.worker = 'physi/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3( 0,-30,0));


gameInterface = new Interface();

init();

function init() {
	
    renderer = new THREE.WebGLRenderer({});
	renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;
    container = document.createElement( 'div' );
    document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	
	render_stats = new Stats();
		render_stats.domElement.style.position = 'absolute';
		render_stats.domElement.style.top = '0px';
		render_stats.domElement.style.zIndex = 100;
		container.appendChild( render_stats.domElement );
		
	physics_stats = new Stats();
		physics_stats.domElement.style.position = 'absolute';
		physics_stats.domElement.style.top = '50px';
		physics_stats.domElement.style.zIndex = 100;
		container.appendChild( physics_stats.domElement );


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

	players[0] = new Willem(15, 10);
	players[0].setId(0);
	players[1] = new Willem(15, 0);
	players[1].setId(1);
	players[2] = new Willem(15, -10);
	players[2].setId(2);
	players[3] = new Willem(15, 15);
	players[3].setId(3);
    //console.log(box.getvelocity());

	var material = Physijs.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x48ff00 }),
        1,
        0
    );

    floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 15, 2, 50 ),
			material,
            0
	);
    floor.receiveShadow = true;
    floor.position.set(0,-5,0);
    scene.add(floor);

    scene.simulate();
	physics_stats.update();
    requestAnimationFrame( animate );

	gameInterface.LoadGameInterface(players[0], players[1], players[2], players[3]);
}

 window.addEventListener('keydown', function(event) {
 });

 window.addEventListener('keyup', function(event) {
 });


scene.addEventListener( 'update', function() {
	physics_stats.update();
    var timeElapsed = clock.getDelta();
	for (var i = 0; i < players.length; i++) {
		var element = players[i];
		element.Update(timeElapsed);
	}

    scene.simulate(undefined, 1 ); // run physics
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
	render_stats.update();
    requestAnimationFrame(animate);
}

function render() {
	renderer.clear();
    renderer.render(scene, camera);
	renderer.clearDepth();
}