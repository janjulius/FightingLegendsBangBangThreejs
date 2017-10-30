class Interface {

    constructor() { //to load any files
        this.playerInterface = [];
        this.playerCharSelectInterface = [];
        this.players = [];
        this.cNames = [];
        this.endGameScreen = [];
        this.readyTexts = [];
        this.loadedGameInterface = false;
        this.loadedCharSelectInterface = false;
        this.loadedEndScreenInterface = false;
        this.pressStartInterface;
    }

    LoadGameInterface(p0, p1, p2, p3) {

        if (this.loadedGameInterface) {
            this.mainInterface.style.visibility = "visible";
            if(playersPlaying > 1){
                this.spaBar0.value = this.players[0].getSpecialAttackCounter();
                this.spaBar1.value = this.players[1].getSpecialAttackCounter();
            this.spaBar0.style.visibility = "visible";
            this.spaBar1.style.visibility = "visible";
                if(playersPlaying > 2){
                    this.spaBar2.value = this.players[2].getSpecialAttackCounter();
            this.spaBar2.style.visibility = "visible";
                    if(playersPlaying > 3){
                        this.spaBar3.value = this.players[3].getSpecialAttackCounter();
            this.spaBar3.style.visibility = "visible";
                    }
                }
            } 
        }

            var w = document.width;
            var h = document.height;
            this.players[0] = p0;
            this.players[1] = p1;
            this.players[2] = p2;
            this.players[3] = p3;

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

            this.spaBar0 = document.getElementById("pHealth0");
            this.spaBar1 = document.getElementById("pHealth1");
            this.spaBar2 = document.getElementById("pHealth2");
            this.spaBar3 = document.getElementById("pHealth3");

            var base = 25;
            //code that counts for all players
            for (var i = 0; i < this.playerInterface.length; i++) {
                this.playerInterface[i].style.position = "absolute";
                this.playerInterface[i].style.height = "200px";
                this.playerInterface[i].style.width = "150px";
                this.playerInterface[i].style.left = base + "%";
                this.playerInterface[i].style.bottom = "10px";
                //this.playerInterface[i].style.opacity = "0.9";
                this.playerInterface[i].style.backgroundImage = "url(" + players[i].portrait + ")";
                this.playerInterface[i].style.backgroundSize = "200px 200px";
                this.playerInterface[i].style.backgroundPosition = "bottom left";
                this.playerInterface[i].style.backgroundRepeat = "no-repeat";
                this.playerInterface[i].style.borderRadius = "15px 50px 30px 5px"
                this.playerInterface[i].style.color = "white";
                this.playerInterface[i].style.textShadow = "2px 2px 4px black";
                base += 15;
            }


            if (p0 instanceof Character) { //interface specific for player 0
                this.pName0[0].innerHTML = p0.name;
                this.pName0[0].style.textAlign = "center";

                this.playerInterface[0].style.backgroundColor = getPlayerColors(0, 0.8);

                this.pDamage0[0].innerHTML = p0.getDamage() + "%";
                this.pDamage0[0].style.textShadow = "2px 2px 4px black";
                this.pDamage0[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
                this.pDamage0[0].style.textAlign = "center";
                this.pDamage0[0].style.color = getDamagePercentageColor(p0.getDamage);

                this.pStock0[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
                this.pStock0[0].style.textShadow = "2px 2px 4px black";
                this.pStock0[0].innerHTML = "❤" + p0.getStock();
                this.pStock0[0].style.textAlign = "center";

                this.spaBar0.style.visibility = "visible";
            }
            if (p1 instanceof Character) { //interface specific for player 1
                this.pName1[0].innerHTML = p1.name;
                this.pName1[0].style.textAlign = "center";

                this.playerInterface[1].style.backgroundColor = getPlayerColors(1, 0.8);

                this.pDamage1[0].innerHTML = p1.getDamage() + "%";
                this.pDamage1[0].style.textShadow = "2px 2px 4px black";
                this.pDamage1[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
                this.pDamage1[0].style.textAlign = "center";

                this.pStock1[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
                this.pStock1[0].style.textShadow = "2px 2px 4px black";
                this.pStock1[0].innerHTML = "❤" + p1.getStock();
                this.pStock1[0].style.textAlign = "center";
                this.spaBar1.style.visibility = "visible";
            }
            if (p2 instanceof Character) { //interface specific for player 2
                this.pName2[0].innerHTML = p2.name;
                this.pName2[0].style.textAlign = "center";
                this.playerInterface[2].style.backgroundColor = getPlayerColors(2, 0.8);
                this.pDamage2[0].innerHTML = p2.getDamage() + "%";
                this.pDamage2[0].style.textShadow = "2px 2px 4px black";
                this.pDamage2[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
                this.pDamage2[0].style.textAlign = "center";
                this.pStock2[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
                this.pStock2[0].style.textShadow = "2px 2px 4px black";
                this.pStock2[0].innerHTML = "❤" + p2.getStock();
                this.pStock2[0].style.textAlign = "center";
                this.spaBar2.style.visibility = "visible";
            }
            if (p3 instanceof Character) { //interface speicific for player 3
                this.pName3[0].innerHTML = p3.name;
                this.pName3[0].style.textAlign = "center";
                this.playerInterface[3].style.backgroundColor = getPlayerColors(3, 0.8);
                this.pDamage3[0].innerHTML = p3.getDamage() + "%";
                this.pDamage3[0].style.textShadow = "2px 2px 4px black";
                this.pDamage3[0].style.fontSize = INTERFACE_DAMAGE_TEXT_SIZE;
                this.pDamage3[0].style.textAlign = "center";
                this.pStock3[0].style.fontSize = INTERFACE_STOCK_TEXT_SIZE;
                this.pStock3[0].style.textShadow = "2px 2px 4px black";
                this.pStock3[0].innerHTML = "❤" + p3.getStock();
                this.pStock3[0].style.textAlign = "center";
                this.spaBar3.style.visibility = "visible";
            }
            this.loadedGameInterface = true;
        
    }

    UpdateGameInterface(pid) {
        if (pid === 0) {
            this.pDamage0[0].innerHTML = players[0].getDamage() + "%";
            this.pDamage0[0].style.color = getDamagePercentageColor(players[0].getDamage());
            this.pStock0[0].innerHTML = "❤" + players[0].getStock();
            this.spaBar0.value = players[0].getSpecialAttackCounter();
            var a = players[0].getDamage();
        }
        if (pid === 1) {
            this.pDamage1[0].innerHTML = players[1].getDamage() + "%";
            this.pDamage1[0].style.color = getDamagePercentageColor(players[1].getDamage());
            this.pStock1[0].innerHTML = "❤" + players[1].getStock();
            this.spaBar1.value = players[1].getSpecialAttackCounter();
            var a = players[1].getDamage();
        }
        if (pid === 2) {
            this.pDamage2[0].innerHTML = players[2].getDamage() + "%";
            this.pDamage2[0].style.color = getDamagePercentageColor(players[2].getDamage());
            this.pStock2[0].innerHTML = "❤" + players[2].getStock();
            var a = players[0].getDamage();
            this.spaBar2.value = players[2].getSpecialAttackCounter();
            var a = players[2].getDamage();
        }
        if (pid === 3) {
            this.pDamage3[0].innerHTML = players[3].getDamage() + "%";
            this.pDamage3[0].style.color = getDamagePercentageColor(players[3].getDamage());
            this.pStock3[0].innerHTML = "❤" + players[3].getStock();
            var a = players[0].getDamage();
            this.spaBar3.value = players[3].getSpecialAttackCounter();
            var a = players[3].getDamage();
        }

    }

    LoadCharSelectInterface() {

        if (this.loadedCharSelectInterface) {
            for (var i = 0; i < this.playerCharSelectInterface.length; i++) {
                this.playerCharSelectInterface[i].style.visibility = "visible";

            }
        } else {
            this.mainInterface = document.getElementById("CharSelectInterface");

            this.playerCharSelectInterface[0] = document.getElementById("pCharInterface0");
            this.playerCharSelectInterface[1] = document.getElementById("pCharInterface1");
            this.playerCharSelectInterface[2] = document.getElementById("pCharInterface2");
            this.playerCharSelectInterface[3] = document.getElementById("pCharInterface3");

            this.cNames[0] = this.playerCharSelectInterface[0].getElementsByClassName("pName");
            this.cNames[1] = this.playerCharSelectInterface[1].getElementsByClassName("pName");
            this.cNames[2] = this.playerCharSelectInterface[2].getElementsByClassName("pName");
            this.cNames[3] = this.playerCharSelectInterface[3].getElementsByClassName("pName");

            var basep = 25;
            for (var i = 0; i < this.playerCharSelectInterface.length; i++) {
                var a = this.playerCharSelectInterface[i].style;
                a.right = "0px";
                a.position = "absolute";
                a.width = "400px";
                a.height = "150px";
                a.backgroundColor = getPlayerColors(i, 0.8);
                a.top = basep * i + 5 + "%";
                this.cNames[i][0].style.color = "white";
                this.cNames[i][0].style.textShadow = "2px 2px 4px black";
                this.cNames[i][0].style.fontSize = "25px";
                this.cNames[i][0].style.margin = "10px 10px 10px 10px";
            }
            this.loadedCharSelectInterface = true;
        }
    }

    UpdateCharSelectInterface(fid, p) {
        this.playerCharSelectInterface[fid].style.backgroundImage = "url(" + getCharImgByNameOrId(p) + ")";
        this.playerCharSelectInterface[fid].style.backgroundSize = "200px 200px";
        this.playerCharSelectInterface[fid].style.backgroundPosition = "bottom right";
        this.playerCharSelectInterface[fid].style.backgroundRepeat = "no-repeat";
        this.cNames[fid][0].innerHTML = getCharNameById(p);
    }

    ClearCharSelectInterface() {
        for (var i = 0; i < this.playerCharSelectInterface.length; i++) {
            this.playerCharSelectInterface[i].style.visibility = "hidden";

        }
    }

    ClearGameInterface() {
        this.mainInterface.style.visibility = "hidden";
        this.spaBar0.style.visibility = "hidden";
        this.spaBar2.style.visibility = "hidden";
        this.spaBar1.style.visibility = "hidden";
        this.spaBar3.style.visibility = "hidden";
    }

    LoadEndGameScreen() {

        if (this.loadedEndScreenInterface) {
            for (var i = 0; i < playersPlaying; i++) {
                this.endGameScreen[i].style.visibility = "visible";
                this.endGameScreen[i].innerHTML = "";
            }
        } 

        this.endGameScreen[0] = document.getElementById("pEndInterface0");
        this.endGameScreen[1] = document.getElementById("pEndInterface1");
        this.endGameScreen[2] = document.getElementById("pEndInterface2");
        this.endGameScreen[3] = document.getElementById("pEndInterface3");

        var baseP = 5;
        for (var i = 0; i < playersPlaying; i++) {
            var a = this.endGameScreen[i];

            a.style.position = "absolute";
            a.style.backgroundColor = getPlayerColors(i, 0.9);
            a.style.left = baseP + "%";
            baseP += 22.5;
            a.style.width = "20%";
            a.style.height = "90%";
            a.style.margin = "0";
            a.style.borderRadius = "50px 50px 50px 50px";
            a.style.border = "5px solid " + this.getPlayerColorsDark(i);
            a.style.boxShadow = "10px 10px 5px black";
            a.style.color = "white";
            a.style.textShadow = "2px 2px 4px black";
            a.style.fontSize = "28px";

            var name = document.createElement('div');
            a.appendChild(name);
            name.style.textAlign = "center";
            name.innerHTML = players[i].name;
            name.style.fontSize = "36px";

            var cImg = document.createElement("img");
            a.appendChild(cImg);
            cImg.className = "image";
            cImg.src = getCharImgByNameOrId(players[i].cid);
            cImg.style.width = "200px";
            cImg.style.height = "200px";
            cImg.style.marginLeft = "auto";
            cImg.style.marginRight = "auto";
            cImg.style.display = "block";


            var tabel = document.createElement('div');
            tabel.className = "panel";
            a.appendChild(tabel);
            var ul = document.createElement('ul');
            tabel.appendChild(ul);

            var kills = document.createElement('li');
            ul.appendChild(kills);
            kills.className = "left";
            kills.innerHTML = "Kills ";

            var actualKills = document.createElement('li');
            ul.appendChild(actualKills);
            actualKills.className = "right";
            actualKills.innerHTML = this.players[i].TKills;

            var deaths = document.createElement("li");
            ul.appendChild(deaths);
            deaths.className = "left";
            deaths.innerHTML = "Deaths ";

            var actualDeaths = document.createElement('li');
            ul.appendChild(actualDeaths);
            actualDeaths.className = "right";
            actualDeaths.innerHTML = this.players[i].TDeaths;

            var damageDone = document.createElement("li");
            ul.appendChild(damageDone);
            damageDone.className = "left";
            damageDone.innerHTML = "Damage dealt ";

            var actualDamageDone = document.createElement("li");
            ul.appendChild(actualDamageDone);
            actualDamageDone.className = "right";
            actualDamageDone.innerHTML = Math.floor(this.players[i].TDamageDone);

            var damageTaken = document.createElement("li");
            ul.appendChild(damageTaken);
            damageTaken.className = "left";
            damageTaken.innerHTML = "Damage taken ";

            var actualdamageTaken = document.createElement('li');
            ul.appendChild(actualdamageTaken);
            actualdamageTaken.className = "right";
            actualdamageTaken.innerHTML = Math.floor(this.players[i].TDamageTaken);

            var damageDoneWUlt = document.createElement("li");
            ul.appendChild(damageDoneWUlt);
            damageDoneWUlt.className = "left";
            damageDoneWUlt.innerHTML = "Ultimate damage ";

            var acutualDamageDoneWithUlt = document.createElement('li');
            ul.appendChild(acutualDamageDoneWithUlt);
            acutualDamageDoneWithUlt.className = "right";
            acutualDamageDoneWithUlt.innerHTML = Math.floor(this.players[i].TDamageDoneWithUlt);

            var damageBlocked = document.createElement("li");
            ul.appendChild(damageBlocked);
            damageBlocked.className = "left";
            damageBlocked.innerHTML = "Damage blocked ";

            var actualDamageBlocked = document.createElement('li');
            ul.appendChild(actualDamageBlocked);
            actualDamageBlocked.className = "right";
            actualDamageBlocked.innerHTML = Math.floor(this.players[i].TDamageBlocked);

            var highestDamageSurvived = document.createElement("li");
            ul.appendChild(highestDamageSurvived);
            highestDamageSurvived.className = "left";
            highestDamageSurvived.innerHTML = "Highest damage ";

            var actualhighestDamageSurvived = document.createElement('li');
            ul.appendChild(actualhighestDamageSurvived);
            actualhighestDamageSurvived.className = "right";
            actualhighestDamageSurvived.innerHTML = Math.floor(this.players[i].THighestDamageSurvived);

            var ultsUsed = document.createElement("li");
            ul.appendChild(ultsUsed);
            ultsUsed.className = "left";
            ultsUsed.innerHTML = "Ultimates used ";

            var actualUltsUsed = document.createElement('li');
            ul.appendChild(actualUltsUsed);
            actualUltsUsed.className = "right";
            actualUltsUsed.innerHTML = Math.floor(this.players[i].TotalUltsUsed);

            var dmgHealed = document.createElement("li");
            ul.appendChild(dmgHealed);
            dmgHealed.className = "left";
            dmgHealed.innerHTML = "Damage healed ";

            var actualDmgHealed = document.createElement('li');
            ul.appendChild(actualDmgHealed);
            actualDmgHealed.className = "right";
            actualDmgHealed.innerHTML = Math.floor(this.players[i].TDamageHealed);

            var position = document.createElement('img');
            a.appendChild(position);
            position.src = this.getPlayerFinishImages(this.players[i].Tplace);
            position.style.marginLeft = "auto";
            position.style.marginRight = "auto";
            position.style.display = "block";
            position.style.width = "250px";
            position.style.height = "250px";

            this.readyTexts[i] = document.createElement('div');
            a.appendChild(this.readyTexts[i]);
            this.readyTexts[i].className = "readyText";
            this.readyTexts[i].innerHTML = "Ready for next battle?";
            this.readyTexts[i].style.color = "red";

        }
        this.loadedEndScreenInterface = true;
    }

    ClearEndInterface() {
        for (var i = 0; i < playersPlaying; i++) {
            this.endGameScreen[i].style.visibility = "hidden";
        }
    }

    UpdateEndScreen() {
        for (var i = 0; i < playersPlaying; i++) {
            if (players[i].readyForNextGame) {
                this.readyTexts[i].innerHTML = "READY!";
                this.readyTexts[i].style.color = "green";
            } else {
                this.readyTexts[i].innerHTML = "Ready for next battle?";
                this.readyTexts[i].style.color = "red";
            }
        }
    }

    DisplayPressStart(display){
        this.pressStartInterface = document.getElementById("pressStartToGo");
        if(display){
            this.pressStartInterface.style.visibility = "visible";
        }
        if(!display){
            this.pressStartInterface.style.visibility = "hidden";
        }
    }

    DisplayDidYouKnow(display){
        this.didYouKnowInterface = document.getElementById("didYouKnow");
        if(display){
            var r = Math.floor((Math.random() * stages.length) + 1)
            this.didYouKnowInterface.innerHTML = "Did you know: " + TIPS[r];
            this.didYouKnowInterface.style.visibility = "visible";
        }
        if(!display){
            this.didYouKnowInterface.style.visibility = "hidden";
        }
    }


    getPlayerColorsDark(id) {
        switch (id) {
            case 0:
                return "#a90707";
            case 1:
                return "#05056f";
            case 2:
                return "#a9a046";
            case 3:
                return "#008000";
        }
    }

    getPlayerFinishImages(rank) {
        switch (rank) {
            case 1:
                return 'sprites/Result_rank_1.png';
            case 2:
                return 'sprites/Result_rank_2.png';
            case 3:
                return 'sprites/Result_rank_3.png';
            case 4:
                return 'sprites/Result_rank_4.png';
        }
    }

}