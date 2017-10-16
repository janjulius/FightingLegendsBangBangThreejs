class Level{
    constructor(){
        this.name = "";
        this.spawn = [{y: 0,z: 0}, {y: 0,z: 0}, {y: 0,z: 0}, {y: 0,z: 0}]

        this.topLeft = {y: 0, z: 0};
        this.bottomRight = {y: 0, z:0}

        this.myAudio= new Audio('Music/mortalKombat.mp3');
        this.myAudio.volume = MUSIC_VOLUME;

        this.burlywoodbrown = 0xDEB887;
        this.iceblue = 0xdcf3ff;
        this.mudbrown = 0x794c13;
        this.grassgreen = 0x4DBD33;
        this.mossgreen = 0xADDFAD;
        this.tilegray = 0x747D7D;
        this.rusty = 0xB7410E;
    
    }
}
