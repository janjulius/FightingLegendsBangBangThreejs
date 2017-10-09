var container;
var controls;
var camera, scene, renderer;

'use strict';

Physijs.scripts.worker = '../physijs_worker.js';
Physijs.scripts.ammo = 'physi/ammo.js';


init();
animate();

function init() {



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
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera)

}