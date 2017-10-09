var cursorSprite = [];

function init(){
    var textureLoader = new THREE.TextureLoader();
    for(var i = 0; i < Constants.MAX_PLAYERS; i++){
        var img = textureLoader.load("/sprites/Menu/pointer"+i+".jpg");
        var spMat = new THREE.SpriteMaterial({map:img});
        var width = spMat.map.image.width;
        var height = spMat.map.image.heigt;
        cursorSprite[i] = new THREE.Sprite(spMat);
        cursorSprite[i].scale.set(width, height, 1);
    }
}
function LoadCursors(){
    cursorSprite.forEach(function(entry){
        console.log(entry);
    });
    interfaceScene.add(cursorSprite[0]);
}