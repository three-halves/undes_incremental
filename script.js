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
let bldgCost = [15,125,500,3000,10000];
let bldgProduction = [0.5,5,25,200,750]
let bldgOwned = [0,0,0,0,0,0,0,0,0,0,0,0,0] // lol

document.getElementById('numDisp').innerHTML = num + " " + currencyName;

function handleBigClick(){
    num += clickPower;
    document.getElementById('numDisp').innerHTML = Math.round(num) + " " + currencyName;
}

function handleBldgClick(i){
    console.log("Invoked" + i);
    if (num >= bldgCost[i]){
        bldgOwned[i] += 1;
        num -= bldgCost[i];
        console.log(bldgOwned);
        document.getElementById("bldgLabel"+i).innerHTML = bldgOwned[i];
        bldgCost[i] = Math.round(bldgCost[i]*1.1)
        document.getElementById("bldgCost"+i).innerHTML = "cost: " + bldgCost[i] + " "+ currencyName;
    }
    console.log(bldgOwned);
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

        console.log(newB.onclick);
        newB.style.borderColor = bldgCol[i];
        newDiv.appendChild(newB);
        let newInfoContainer = document.createElement("div");
        newInfoContainer.className = "bldgIC";
        newDiv.appendChild(newInfoContainer);
        let newID = document.createElement("div");
        newID.innerHTML = "cost: " +bldgCost[i]+" "+ currencyName;
        newID.id = "bldgCost"+i;
        newID.className = "bldgInfo";
        newInfoContainer.appendChild(newID)
        let newID2 = document.createElement("div");
        newID2.innerHTML = bldgProduction[i]+" " + currencyName +"/sec each";
        newID2.className = "bldgInfo";
        newInfoContainer.appendChild(newID2);
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

function doTick(){
    let dt = tickSpeed/1000
    s += dt;
    min = s/60;
    hour = min/60;
    document.getElementById("numDisp").innerHTML = Math.round(num) + " "+ currencyName;
    document.getElementById('timer').innerHTML = Math.floor(hour) + 'h ' + Math.floor(min%60)+ 'm ' + Math.floor(s%60) + "s"
    let sum = getProdSec();
    console.log(sum)
    document.getElementById("production").innerHTML = sum + " " + currencyName +"/sec"
    num += sum*dt;
}