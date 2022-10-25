let num = 0;
let currencyName = "num";
let clickPower = 1;
let tickSpeed = 10;
let s = 0;
let min = 0
let hour = 0

//bldg vars
let bldgTotal = 5
let bldgCol = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,128,0)', 'rgb(128,0,255)'];
let bldgPannel = document.getElementById("bldgPannel");
let bldgCost = [25,150,500,3000,10000];
let bldgOGCost = [... bldgCost];
let bldgProduction = [0.5,3,12,85,320];
let bldgLvl = [0,0,0,0,0]
let bldgNxt = [20,20,20,20,20]
let bldgOwned = [0,0,0,0,0,0,0,0,0,0,0,0,0]; // lol
let bldgs = [];
let bldgsLvl = [];

document.getElementById('numDisp').innerHTML = num + " " + currencyName;

function handleBigClick(){
    num += clickPower;
    document.getElementById('numDisp').innerHTML = Math.round(num) + " " + currencyName;
}

function handleBldgClick(i){
    if (num >= bldgCost[i]){
        bldgOwned[i] += 1;
        num -= bldgCost[i];
        console.log(bldgOwned);
        bldgCost[i] = Math.round(bldgCost[i]*1.1)
    }
    console.log(bldgOwned);
}

function handleBldgLvlClick(i){
    console.log('again invoke');
    if (bldgOwned[i] >= bldgNxt[i]){
        bldgOwned[i] = 0;
        bldgLvl[i]++;
        bldgNxt[i] *= 2;
        bldgCost[i] = bldgOGCost[i];
        bldgProduction[i] *= 2;
    }
}

function initBldg(){
    for (let i = 0; i<bldgTotal; i++){
        console.log(i);
        let newDiv = document.createElement("div");
        newDiv.className = "bldgDiv"

        let amtLabel = document.createElement("p");
        amtLabel.id = "bldgLabel"+i;
        amtLabel.className = "amtLabel";
        amtLabel.innerHTML = bldgOwned[i];
        newDiv.appendChild(amtLabel);
        bldgPannel.appendChild(newDiv);

        let newB = document.createElement("button");
        newB.className = "bldgButton";
        newB.onclick = function(){handleBldgClick(i);};
        bldgs.push(newB);
        console.log(newB.onclick);
        newB.style.borderColor = bldgCol[i];
        newDiv.appendChild(newB);

        let newInfoContainer = document.createElement("div");
        newInfoContainer.className = "bldgIC";
        newDiv.appendChild(newInfoContainer);

        // let newLvlContainer = document.createElement("div");
        // newInfoContainer.className = "bldgIC";
        // newDiv.appendChild(newLvlContainer);

        let newID = document.createElement("div");
        newID.innerHTML = "cost: " +bldgCost[i]+" "+ currencyName;
        newID.id = "bldgCost"+i;
        newID.className = "bldgInfo";
        newInfoContainer.appendChild(newID)

        let newID2 = document.createElement("div");
        newID2.innerHTML = bldgProduction[i]+" " + currencyName +"/sec each";
        newID2.className = "bldgInfo";
        newID2.id = 'prod'+i;
        newInfoContainer.appendChild(newID2);

        let newInfoContainer2 = document.createElement("div");
        newInfoContainer2.className = "bldgIC";
        newDiv.appendChild(newInfoContainer2);

        let newID3 = document.createElement("div");
        newID3.innerHTML = "lvl: " + bldgLvl[i];
        newID3.className = "bldgInfo";
        newID3.id = 'lvl'+i;
        newInfoContainer2.appendChild(newID3);

        let newID4 = document.createElement("div");
        newID4.innerHTML = "nxt: " + bldgNxt[i];
        newID4.className = "bldgInfo";
        newID4.id = 'nxt'+i;
        newInfoContainer2.appendChild(newID4);

        let newlvlB = document.createElement("button");
        newlvlB.className = "bldgButton";
        newlvlB.onclick = function(){handleBldgLvlClick(i);};
        bldgsLvl.push(newlvlB);
        console.log(newlvlB.onclick);
        newlvlB.style.borderColor = bldgCol[i];
        newlvlB.style.borderRadius = "0px";
        newDiv.appendChild(newlvlB);
    }
}

initBldg()

setInterval(doTick, tickSpeed)

function getProdSec(){
    let sum = 0
    for (i in bldgProduction){
        sum += bldgProduction[i] * bldgOwned[i];
    }
    return sum
}

function updateButtons(){
    for (let i = 0; i < bldgTotal; i++){
        if (bldgCost[i] > num){
            bldgs[i].className = "disabled";
        }
        else{
            bldgs[i].className = "bldgButton";
        }

        if (bldgOwned[i] < bldgNxt[i]){
            bldgsLvl[i].className = "disabled";
        }
        else{
            bldgsLvl[i].className = "bldgButton";
        }
    }
    // update lables
    for (let i = 0; i < bldgTotal; i++){
        document.getElementById("bldgLabel"+i).innerHTML = bldgOwned[i];
        document.getElementById("bldgCost"+i).innerHTML = "cost: " + bldgCost[i] + " "+ currencyName;
        document.getElementById("lvl"+i).innerHTML = "lvl: " + bldgLvl[i];
        document.getElementById("nxt"+i).innerHTML = "nxt: " + bldgNxt[i];
        document.getElementById('prod'+i).innerHTML = bldgProduction[i]+" " + currencyName +"/sec each";
    }


}

function doTick(){
    let dt = tickSpeed/1000
    s += dt;
    min = s/60;
    hour = min/60;
    document.getElementById("numDisp").innerHTML = Math.round(num) + " "+ currencyName;
    document.getElementById('timer').innerHTML = Math.floor(hour) + 'h ' + Math.floor(min%60)+ 'm ' + Math.floor(s%60) + "s"
    let sum = getProdSec();
    document.getElementById("production").innerHTML = sum + " " + currencyName +"/sec"
    num += sum*dt;
    updateButtons()
}