class Level {
    constructor(){
        this.name = "";
        this.spawn = [{y: 0,z: 0}, {y: 0,z: 0}, {y: 0,z: 0}, {y: 0,z: 0}]

        this.topLeft = {y: 0, z: 0};
        this.bottomRight = {y: 0, z:0}
        this.oneWayPlatforms = [];
        this.myAudio= new Audio('Music/mortalKombat.mp3');
        this.myAudio.volume = MUSIC_VOLUME;

        this.oneWayPlatforms = [];
        this.burlywoodbrown = 0xDEB887;
        this.iceblue = 0xdcf3ff;
        this.mudbrown = 0x794c13;
        this.grassgreen = 0x4DBD33;
        this.mossgreen = 0xADDFAD;
        this.tilegray = 0x747D7D;
        this.rustydark = 0xB7410E;
        this.sandyellow = 0xc2b280;
        this.saddlebrown = 0x8B4513;
        this.goldenrod = 0xDAA520;
        this.forestgreen = 0x228B22;
        this.castle = 0x696969;
        this.darkgreen = 0x006400;
        this.rope =  0x8D5118;
        this.rusty = 0xB75D0E;
    
    }

    StopMusic(){
        this.myAudio.pause();
        this.myAudio.currentTime = 0;
    }
}
