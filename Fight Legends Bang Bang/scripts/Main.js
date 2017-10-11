var container;
var controls;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var gameInterface;
var players = [];
var controls = new THREE.GamepadControls();
var playerPlaying = 4;
var charSelect = true;
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
}

  window.addEventListener('keydown', function(event) {
	 if(charSelect){
		if(event.keyCode == 65){
			 console.log("test");
			 charSelect = false;
			 runGame();
		}
	 }
 });

 window.addEventListener('keyup', function(event) {
 });


scene.addEventListener( 'update', function() {
	if(!charSelect){
	physics_stats.update();
    var timeElapsed = clock.getDelta();
	for (var i = 0; i < players.length; i++) {
		var element = players[i];
		element.Update(timeElapsed);
	}

    scene.simulate(undefined, 1 ); // run physics
	}
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
	function runGame(){
if(!charSelect){
	players[0] = new Willem(15, 10);
	players[0].setId(0);
	players[1] = new Berend(15, 0);
	players[1].setId(1);
	players[2] = new BoomStronk(15, -10);
	players[2].setId(2);
	players[3] = new Jens(15, 15);
	players[3].setId(3);
    //console.log(box.getvelocity());

    newLevel(1);
	gameInterface.LoadGameInterface(players[0], players[1], players[2], players[3]); scene.simulate();
	physics_stats.update();
    requestAnimationFrame( animate );
	window.addEventListener('keydown', function(event){
    if (event.keyCode == 65) { //a
        players[0].direction = 1;
    } else if (event.keyCode == 68) { //d
        players[0].direction = -1;
	} else if (event.keyCode == 87) { //w
		players[0].setDamage(players[0].getDamage() + 1); //test code for color coding and spacing
    } else if (event.keyCode == 83) { //s
		players[0].setStock(players[0].getStock() - 1);
    }
	});
}
}