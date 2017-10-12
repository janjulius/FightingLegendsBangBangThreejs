var container;
var controls;
var camera, scene, renderer;
var clock = new THREE.Clock(true);
var gameInterface;
var players = [];
var controls = new THREE.GamepadControls();
var playersPlaying = 4;
var charSelect = true;
'use strict';
var charScreens = [];
var playerFiches = [];

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
<<<<<<< HEAD
	camera.position.set( 60, 25, 0 );
	camera.lookAt( scene.position );
=======
	camera.position.set( 60, 50, 0 );
	camera.lookAt(scene.position);
>>>>>>> 5745e6b1c14218fd3cf01f2a45121a8ff944081e
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
	
	
	
   if(charSelect){
	   runCharSelect();
   }

	
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
	
    requestAnimationFrame( animate );
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

function runCharSelect(){
	if(charSelect){
	var material;
var baseZ = 0;
var baseY = -5;
var constZ = 0;
var constY = -5;
var amount = 8;
	for(var i = 0; i < amount; i++){
		material = Physijs.createMaterial(
		new THREE.MeshBasicMaterial({ color: 0xffffff, map:THREE.ImageUtils.loadTexture( getCharImgByNameOrId(i) )}),
		0,
		1
	);
		if(i % 4 == 0){
		baseY += 5;
		baseZ = constZ;
				}
				baseZ += 5;
		charScreen = new Physijs.BoxMesh(new THREE.BoxGeometry(5, 5 ,5), material, 0);
		charScreen.position.set(-3, baseY, baseZ);
		charScreens[i] = charScreen;
		charScreens.castShadow = true;
		scene.add(charScreen);
		
	}
	console.log();
	camera.lookAt(charScreens[0].position);
	camera.position.set(60, 0, 0);
	camera.lookAt(new THREE.Vector3(0,0,0));

	for(var i = 0; i < playersPlaying; i++){
		var c = 0xff0000;
		switch(i){ case 0: c = 0xff0000; break; case 1: c = 0x0000ff; break; case 2: c = 0xffff00; break; case 3: c = 0x33cc33; break;}
		material = Physijs.createMaterial(
			new THREE.MeshBasicMaterial({ color: c}),
			0,
			1
		);
		fische = new Physijs.BoxMesh(new THREE.BoxGeometry(0, 1, 1), material, 0);
		playerFiches[i] = fische;
		scene.add(fische);
	}

	window.addEventListener('keydown', function(event){
		if (event.keyCode == 68) { //a	
			ray0 = new THREE.Raycaster(playerFiches[0].position, new THREE.Vector3(-1,0,0));
			console.log("created ray");
			var intersects = ray0.intersectObjects(scene.children);
			for(var i = 0 ; i < intersects.length; i++){
				intersects[i].object.material.color.set(0xff0000);
			}
			console.log("test" + intersects.length);
			playerFiches[0].position.z = playerFiches[0].position.z + 1;
			ray0.set(playerFiches[0].position, new THREE.Vector3(1,0,0));
			console.log(playerFiches[0].position);
			console.log(charScreens[0].position);
		} else if (event.keyCode == 68) { //d
			//players[0].direction = -1;
		} else if (event.keyCode == 87) { //w
			playerFiches[1].position.y = playerFiches[1].position.y + 1; //test code for color coding and spacing
		} else if (event.keyCode == 83) { //s
			playerFiches[2].position.y = playerFiches[2].position.y + 1;
		}
		});
}
}

	function runGame(){
if(!charSelect){
	for(var i = 0; i < 8; i++){
		charScreens[i].position.set(100,100,100);
	}
	players[0] = new Willem(15, 10);
	players[0].setId(0);
	players[1] = new Rocky(15, 0);
	players[1].setId(1);
	players[2] = new BoomStronk(15, -10);
	players[2].setId(2);
	players[3] = new Paardman(15, 15);
	players[3].setId(3);
    //console.log(box.getvelocity());

    newLevel(2);
	gameInterface.LoadGameInterface(players[0], players[1], players[2], players[3]); scene.simulate();
	physics_stats.update();
    requestAnimationFrame( animate );
	if(DEBUG_MODE){
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
}