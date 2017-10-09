class Interface{
constructor(){
    this.cursorSprite = [];
        console.log(MAX_PLAYERS);
        var img;
        var material;
        //img = new THREE.TextureLoader().load("/sprites/Menu/pointer0.jpeg");
        // instantiate a loader
var loader = new THREE.TextureLoader();
for(var i = 0; i < MAX_PLAYERS; i++){
// load a resource
loader.load(
    // resource URL
    'sprites/Menu/pointer'+i+'.jpg',
    // Function when resource is loaded
    function ( texture ) {
        // do something with the texture
        console.log(texture); 
        var material = new THREE.SpriteMaterial( {
            map: texture
         } );
    },
    // Function called when download progresses
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
        console.log(xhr);
    }
);
        console.log(img); 
        //material = new THREE.SpriteMaterial({map:img});
        console.log("mat" + material);
        this.cursorSprite[i] = new THREE.Sprite(material);
        console.log(this.cursorSprite[i]);
    }
}

getCursor(id){
    return this.cursorSprite[id];
}
}