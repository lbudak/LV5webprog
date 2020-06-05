// Zadatak 1 kod ide ovdjež
class ChooseFighter {
    constructor(){
        this.idLeft="";
        this.idRight="";
    }
    init(){
        this._buttonDisableFight(true)  
        this._clickHandler()

    }
    _clickHandler(){
        this._handleFighterPick("#firstSide",".fighter-box")
        this._handleFighterPick("#secondSide",".fighter-box")

        this._handleGenerateFightBtn();
        this._randomGenerateFighters();
    }
    _buttonDisableFight(state){
        let button  = document.querySelector("#generateFight")
        button.disabled = state;
    }
    _buttonDisableRandom(state){
        let button  = document.querySelector("#randomFight")
        button.disabled = state;
    }
    _buttonDisableNew(state){
        let button  = document.querySelector("#newFighter")
        button.disabled = state;
    }
    _clearView(){
        this._resetBorder("#firstSide","#secondSide")
        document.querySelector(".message").innerHTML = "";
    }
    _handleGenerateFightBtn(){
        const fightBtn = document.querySelector("#generateFight")
        fightBtn.addEventListener("click",(event) => {
            this._clearView()
            this._buttonDisableFight(true)
            this._buttonDisableRandom(true)
            this._buttonDisableNew(true)
            this._setDisplay("none")
            this._downCounter(this.idLeft,this.idRight)
        });
    }
    _downCounter(left,right){
        var counter = 3;
        var interval = setInterval( function(){
            let timer = document.querySelector("#clock")
            timer.innerHTML = counter
            counter--;
            if(counter <0){ 
                hideTimer(timer); 
                clearInterval(interval); 
            }
        }, 1000);
        var hideTimer = function(timer){
            timer.innerHTML="";
            oldSettings(left,right)
        }
    }
    _setDisplay(style){
        let fighters = document.querySelectorAll(".fighter-list")
        Array.from(fighters).forEach(element => {
            element.setAttribute("style","display:" + style)
        })
    }
    _countPictures(){ 
        let parent = document.querySelector("#firstSide");
        let fighters = parent.querySelectorAll(".fighter-box");
        return fighters.length;
    }
    _randomGenerateFighters(){
        const randomBtn = document.querySelector("#randomFight")
        randomBtn.addEventListener("click",(event) => {
            this._clearView();
            var picNumber = this._countPictures();
            
            var firstId = Math.floor(Math.random() * picNumber); //za lv3 je picNumber bio hardcodean na 6 jer ih je izvorno toliko 
            this.idLeft = firstId;
            do {
                var secondId = Math.floor(Math.random() * picNumber);
              }
            while (firstId == secondId);
            this.idRight = secondId;

            this._randomLoad("#firstSide",firstId);
            this._randomLoad("#secondSide",secondId);
        })
    }
    _resetBorder(side1,side2){
        let parent1 = document.querySelector(side1)
        let parent2 = document.querySelector(side2)
        let img1 = parent1.querySelector(".img-rounded")
        let img2 = parent2.querySelector(".img-rounded")

        img1.setAttribute("style","border:none")
        img2.setAttribute("style","border:none")
    }
    _randomLoad(side,id){
        const parent = document.querySelector(side)
        let imageBoxes = parent.querySelectorAll(".fighter-box")
        let listInfo = parent.querySelector(".cat-info")
       
        Array.from(imageBoxes).forEach(element => {
            let object = JSON.parse(element.dataset.info)
            if(object.id == id){
                let image = element.querySelector("img")
                this._setId(side,object)
                this._setRandomImage(parent,image.src)
                this._loadData(object,listInfo)
            }
        })
    }
    _handleFighterPick(side,imagebox){
        const parent = document.querySelector(side)
        const imageBoxes = parent.querySelectorAll(imagebox)
        Array.from(imageBoxes).forEach(element => {
            element.addEventListener("click", (event) => {
            this._clearView();
            this._loadFighter(side);
            });
        });
    }
    _loadFighter(side) {
        const parent = document.querySelector(side)
        const listInfo = parent.querySelector(".cat-info")
       
        let obj = JSON.parse(event.target.parentNode.dataset.info)

        this._setId(side,obj)
        this._setImage(parent)
        this._loadData(obj,listInfo)
    }
    _setId(side,obj){
        if(side == "#firstSide"){
            this.idLeft = obj.id
            this._disableOtherSide("#secondSide",this.idLeft)
        }
        else{ 
            this.idRight = obj.id
            this._disableOtherSide("#firstSide",this.idRight)
        }
        if(this.idLeft != "" && this.idRight !=""){
            this._buttonDisableFight(false)
        }
    }
    _disableOtherSide(side,id){
        const parent = document.querySelector(side)
        let dimageboxes = parent.querySelectorAll(".fighter-box")

        Array.from(dimageboxes).forEach(element => {
            let object = JSON.parse(element.dataset.info)
            if(object.id == id){
                element.setAttribute("style","pointer-events:none;opacity:0.1")
            }
            else{
                element.setAttribute("style","pointer-events:auto;")
            }
        });
    }
    _loadData(obj,listInfo){
        listInfo.querySelector(".name").innerHTML = obj.name
        listInfo.querySelector(".age").innerHTML = obj.age
        listInfo.querySelector(".skills").innerHTML = obj.catInfo
        listInfo.querySelector(".record").innerHTML = "Wins:"+obj.record.wins+" Loss:"+obj.record.loss
    }
    _setRandomImage(parent,src){
        let mainImg = parent.querySelector(".img-rounded")
        mainImg.src = src
    }
    _setImage(parent){
        let mainImg = parent.querySelector(".img-rounded")
        mainImg.src = event.target.src
    }
}


function saveFighterObject(leftId,rightId){
   
    var leftObject = findObject("#firstSide",leftId)
    var rightObject = findObject("#secondSide",rightId)

    calculate(leftObject,rightObject)
}
function oldSettings(leftId,rightId){
    document.querySelector("#generateFight").disabled = false
    document.querySelector("#randomFight").disabled = false
    document.querySelector("#newFighter").disabled = false
    let fighters = document.querySelectorAll(".fighter-list")
    Array.from(fighters).forEach(element => {
        element.setAttribute("style","display:flex")
    })
    saveFighterObject(leftId,rightId)
}
function getWinner(percentageLeft,percentageRight){
    var winNumber = Math.random()
    let apsoluteDifference = Math.abs((percentageLeft - percentageRight))
    console.log("winNum: " + winNumber)
    console.log("dif: " + apsoluteDifference)
    if(apsoluteDifference < 0.1){
        if(winNumber <= 0.59){
                colorizeMainBoxes("#firstSide","#secondSide")
                updateScore(cfc.idLeft,"#firstSide",cfc.idRight,"#secondSide")
                //ovdje se radi update podataka (2 poziva, prvi par pa drugi), tu staviti novu funckiju za fetch(php)
                fetchUpdatePhp(cfc.idLeft,"#firstSide")
                fetchUpdatePhp(cfc.idRight,"#secondSide")
                
            }else{
                colorizeMainBoxes("#secondSide","#firstSide")   
                updateScore(cfc.idRight,"#secondSide",cfc.idLeft,"#firstSide")
                //ovdje se radi update podataka (2 poziva, prvi par pa drugi), tu staviti novu funckiju za fetch(php)
                fetchUpdatePhp(cfc.idRight,"#secondSide")
                fetchUpdatePhp(cfc.idLeft,"#firstSide")
            }
        
    }else{
        if(winNumber <= 0.69){
            colorizeMainBoxes("#firstSide","#secondSide") 
            updateScore(cfc.idLeft,"#firstSide",cfc.idRight,"#secondSide")
            //ovdje se radi update podataka (2 poziva, prvi par pa drugi), tu staviti novu funckiju za fetch(php)
            fetchUpdatePhp(cfc.idLeft,"#firstSide")
            fetchUpdatePhp(cfc.idRight,"#secondSide")
        }else{
            colorizeMainBoxes("#secondSide","#firstSide")  
            updateScore(cfc.idRight,"#secondSide",cfc.idLeft,"#firstSide")
            //ovdje se radi update podataka (2 poziva, prvi par pa drugi), tu staviti novu funckiju za fetch(php)
            fetchUpdatePhp(cfc.idRight,"#secondSide")
            fetchUpdatePhp(cfc.idLeft,"#firstSide")
        }
    }    
}
function calculate(left,right){
    let percentageLeft = (left.record.wins/(left.record.wins + left.record.loss))
    let percentageRight = (right.record.wins/(right.record.wins + right.record.loss))
    console.log("l: " + percentageLeft)
    console.log("r: " + percentageRight)
    getWinner(percentageLeft,percentageRight)
}
function colorizeMainBoxes(sideWin,sideLose){
    let parentWin = document.querySelector(sideWin)
    let listWin = parentWin.querySelector(".cat-info")
    let winname = listWin.querySelector(".name").textContent
    setWinnerMessage(winname)
    let winner = parentWin.querySelector(".img-rounded")

    let parentLose = document.querySelector(sideLose)
    let loser = parentLose.querySelector(".img-rounded")

    winner.setAttribute("style","border:13px solid green")
    loser.setAttribute("style","border:13px solid red")
}
function updateScore(idWinner,sideWinner,idLoser,sideLoser){ 
    let parentWin = document.querySelector(sideWinner)
    let winners = parentWin.querySelectorAll(".fighter-box")
    let parentLoser = document.querySelector(sideLoser)
    let lossers = parentLoser.querySelectorAll(".fighter-box") 
    for (let i =0 ; i< winners.length;i++){
        var object = JSON.parse(winners[i].dataset.info)
        console.log("idW " + idWinner)
        if(object.id == idWinner){
            object.record.wins += 1
            winners[i].setAttribute("data-info",JSON.stringify(object))
            let list = parentWin.querySelector(".cat-info")
            loadList(object,list)
        }

    } 
    for (let i =0 ; i< lossers.length;i++){
        var object = JSON.parse(lossers[i].dataset.info)
        console.log("idL " + idLoser)
        if(object.id == idLoser){
            object.record.loss += 1
            lossers[i].setAttribute("data-info",JSON.stringify(object))
            let list = parentLoser.querySelector(".cat-info")
            loadList(object,list)
        }

    } 

}
function fetchUpdatePhp(id,side) {
    let parent = document.querySelector(side)
    let fighters = parent.querySelectorAll(".fighter-box")
    var wins, loss
    for (let i = 0 ; i < fighters.length; i++){
        var object = JSON.parse(fighters[i].dataset.info)
        if(object.id == id){
            wins = object.record.wins
            loss = object.record.loss
            break
        }
    }
       fetch('fetch.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, wins, loss })
        }
    )
        .then(response => response.text()).then(data => console.log(data) ) 
        
    
}

function findObject(side,id){
    let parent = document.querySelector(side)
    let fighters = parent.querySelectorAll(".fighter-box")
    
    for (let i =0 ; i< fighters.length;i++){
        var object = JSON.parse(fighters[i].dataset.info)
        if(object.id == id)
            return object
    } 
}
function setWinnerMessage(name){
    document.querySelector(".message").innerHTML = "Pobjednik je " + name
}
function loadList(obj,listInfo){
    listInfo.querySelector(".name").innerHTML = obj.name
    listInfo.querySelector(".age").innerHTML = obj.age
    listInfo.querySelector(".skills").innerHTML = obj.catInfo
    listInfo.querySelector(".record").innerHTML = "Wins:"+obj.record.wins+" Loss:"+obj.record.loss
}


const cfc = new ChooseFighter()
cfc.init(); 
              
