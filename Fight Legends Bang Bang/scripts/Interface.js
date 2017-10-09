class Interface{
constructor(){
    this.cursorSprite = [];
        console.log(MAX_PLAYERS);
        var img;
        var material;
        img = new THREE.TextureLoader().load("/sprites/Menu/pointer0.jpg");
        console.log(img); 
        material = new THREE.SpriteMaterial({map:img});
        console.log("mat" + material);
        this.cursorSprite[0] = new THREE.Sprite(material);
    }

LoadCursors(texture){
       
}
}