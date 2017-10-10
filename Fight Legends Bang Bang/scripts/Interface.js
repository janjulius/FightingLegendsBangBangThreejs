class Interface{

    constructor(){ //to load any files
        this.playerInterface = [];
    }

    LoadGameInterface(p0, p1, p2, p3){
        console.log(p0);console.log(p1);console.log(p2);console.log(p3);

        this.mainInterface = document.getElementById("GameInterface");
        this.playerInterface[0] = document.getElementById("pGameInterface0");
        this.playerInterface[1] = document.getElementById("pGameInterface1");
        this.playerInterface[2] = document.getElementById("pGameInterface2");
        this.playerInterface[3] = document.getElementById("pGameInterface3");

        this.pName0 = this.playerInterface[0].getElementsByClassName("pName");
        this.pName1 = this.playerInterface[1].getElementsByClassName("pName");
        this.pName2 = this.playerInterface[2].getElementsByClassName("pName");
        this.pName3 = this.playerInterface[3].getElementsByClassName("pName");

        var base = 400;
        //code that counts for all players
        for(var i = 0; i < MAX_PLAYERS; i++){
            this.playerInterface[i].style.position = "absolute";
            this.playerInterface[i].style.height = "400px";
            this.playerInterface[i].style.width = "200px";
            this.playerInterface[i].style.left = base + "px";
            this.playerInterface[i].style.bottom = "0px";
            base += 400;
        }


        if(p0 !== undefined){ //interface specific for player 0
        this.pName0[0].innerHTML = p0.name;
        this.playerInterface[0].style.backgroundColor = "red";
        this.playerInterface[0].style.border = "thick solid #0000FF"
        }
        if(p1 !== undefined){ //interface specific for player 1
        this.pName1[0].innerHTML = p1.name;
        }
        if(p2 !== undefined){ //interface specific for player 2
        this.pName2[0].innerHTML = p2.name;
        }
        if(p3 !== undefined){ //interface speicific for player 3
        this.pName3[0].innerHTML = p3.name;
        }
        
        if(p0 !== undefined){
            console.log("p0 is not undefined");
        }
        if(p3 === undefined){
            console.log("p3 is undefined");
        }
    }

    UpdateGameInterface(){
        
    }

}