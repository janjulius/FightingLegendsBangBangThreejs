class Interface{

    constructor(){ //to load any files
        this.playerInterface = [];
        this.players = [];
    }

    LoadGameInterface(p0, p1, p2, p3){
        var w = document.width;
        var h = document.height;
        this.players[0] = p0;
        this.players[1] = p1;
        this.players[2] = p2;
        this.players[3] = p3;
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

        this.pDamage0 = this.playerInterface[0].getElementsByClassName("pDamage");
        this.pDamage1 = this.playerInterface[1].getElementsByClassName("pDamage");
        this.pDamage2 = this.playerInterface[2].getElementsByClassName("pDamage");
        this.pDamage3 = this.playerInterface[3].getElementsByClassName("pDamage");

        this.pStock0 = this.playerInterface[0].getElementsByClassName("pStock");
        this.pStock1 = this.playerInterface[1].getElementsByClassName("pStock");
        this.pStock2 = this.playerInterface[2].getElementsByClassName("pStock");
        this.pStock3 = this.playerInterface[3].getElementsByClassName("pStock");

        var base = 25;
        //code that counts for all players
        for(var i = 0; i < MAX_PLAYERS; i++){
            this.playerInterface[i].style.position = "absolute";
            this.playerInterface[i].style.height = "200px";
            this.playerInterface[i].style.width = "150px";
            this.playerInterface[i].style.left = base + "%";
            this.playerInterface[i].style.bottom = "10px";
            //this.playerInterface[i].style.opacity = "0.9";
            this.playerInterface[i].style.color = "white";
            this.playerInterface[i].style.textShadow = "2px 2px 4px black";
            this.playerInterface[i].style.backgroundImage = "url("+players[i].portrait+")";
            this.playerInterface[i].style.backgroundSize = "200px 200px"; 
            this.playerInterface[i].style.backgroundPosition = "bottom left"; 
            this.playerInterface[i].style.backgroundRepeat = "no-repeat";
            this.playerInterface[i].style.borderRadius = "15px 50px 30px 5px"
            base += 15;
        }


        if(p0 !== undefined){ //interface specific for player 0
        this.pName0[0].innerHTML = p0.name;
        this.pName0[0].style.textAlign = "center";

        this.playerInterface[0].style.backgroundColor = "rgba(255, 0, 0, 0.3)";

        this.pDamage0[0].innerHTML = p0.getDamage() + "%";
        this.pDamage0[0].style.textShadow = "2px 2px 4px black";
        this.pDamage0[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
        this.pDamage0[0].style.textAlign = "center";
        console.log(getDamagePercentageColor(p0.getDamage));
        this.pDamage0[0].style.color = getDamagePercentageColor(p0.getDamage);

        this.pStock0[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
        this.pStock0[0].style.textShadow = "2px 2px 4px black";
        this.pStock0[0].innerHTML = "❤" + p0.getStock();
        this.pStock0[0].style.textAlign = "center";
       
        }
        if(p1 !== undefined){ //interface specific for player 1
        this.pName1[0].innerHTML = p1.name;
        this.pName1[0].style.textAlign = "center";

        this.playerInterface[1].style.backgroundColor = "rgba(0, 0, 255, 0.3)";

        this.pDamage1[0].innerHTML = p1.getDamage() + "%";
        this.pDamage1[0].style.textShadow = "2px 2px 4px black";
        this.pDamage1[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
        this.pDamage1[0].style.textAlign = "center";

        this.pStock1[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
        this.pStock1[0].style.textShadow = "2px 2px 4px black";
        this.pStock1[0].innerHTML = "❤" + p1.getStock();
        this.pStock1[0].style.textAlign = "center";
        }
        if(p2 !== undefined){ //interface specific for player 2
        this.pName2[0].innerHTML = p2.name;
        this.pName2[0].style.textAlign = "center";
        this.playerInterface[2].style.backgroundColor = "rgba(255, 165, 0, 0.3)";
        this.pDamage2[0].innerHTML = p2.getDamage() + "%";
        this.pDamage2[0].style.textShadow = "2px 2px 4px black";
        this.pDamage2[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
        this.pDamage2[0].style.textAlign = "center";
        this.pStock2[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
        this.pStock2[0].style.textShadow = "2px 2px 4px black";
        this.pStock2[0].innerHTML = "❤" + p2.getStock();
        this.pStock2[0].style.textAlign = "center";
        }
        if(p3 !== undefined){ //interface speicific for player 3
        this.pName3[0].innerHTML = p3.name;
        this.pName3[0].style.textAlign = "center";
        this.playerInterface[3].style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        this.pDamage3[0].innerHTML = p3.getDamage() + "%";
        this.pDamage3[0].style.textShadow = "2px 2px 4px black";
        this.pDamage3[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
        this.pDamage3[0].style.textAlign = "center";
        this.pStock3[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
        this.pStock3[0].style.textShadow = "2px 2px 4px black";
        this.pStock3[0].innerHTML = "❤" + p3.getStock();
        this.pStock3[0].style.textAlign = "center";
        }
        
        if(p0 !== undefined){
            console.log("p0 is not undefined");
        }
        if(p3 === undefined){
            console.log("p3 is undefined");
        }
    }

    UpdateGameInterface(pid){
        if(pid === 0){
            var a = this.players[0].getDamage();
            this.pDamage0[0].innerHTML = this.players[0].getDamage() + "%";
            this.pDamage0[0].style.color = getDamagePercentageColor(this.players[0].getDamage());
            this.pStock0[0].innerHTML = "❤" + this.players[0].getStock();
            if(a >= 10 && a < 100){
                this.pDamage0[0].style.fontSize = "75px";
            } else if(a >= 100){
                this.pDamage0[0].style.fontSize = "50px";
            }
        }
        if(pid === 1){
            this.pDamage1[0].innerHTML = this.players[1].getDamage() + "%";
            this.pDamage1[0].style.color = getDamagePercentageColor(this.players[1].getDamage());
            this.pStock1[0].innerHTML = "❤" + this.players[1].getStock();
        }
        if(pid === 2){
            this.pDamage2[0].innerHTML = this.players[2].getDamage() + "%";
            this.pDamage2[0].style.color = getDamagePercentageColor(this.players[2].getDamage());
            this.pStock2[0].innerHTML = "❤" + this.players[2].getStock();
        }
        if(pid === 3){
            this.pDamage3[0].innerHTML = this.players[3].getDamage() + "%";
            this.pDamage3[0].style.color = getDamagePercentageColor(this.players[3].getDamage());
            this.pStock3[0].innerHTML = "❤" + this.players[3].getStock();
        }

    }


}