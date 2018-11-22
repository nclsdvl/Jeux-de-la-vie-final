//------- canvas carré (ici 600 * 600)   ---------///


let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let tailleMax = document.getElementById('myCanvas').height;

let denominateur = 100;
let cellSize = canvas.height/denominateur;      
let NbrDeCasesVivantes = 7000;
var monTabDeVivant;
var monTabDeVivantSuivant;

var hasStarted = false;
var gameIterator = undefined;

function creationDuTabDeVivant(){
    monTabDeVivant = new Array()

    for (i=0; i<tailleMax/cellSize; i++){
        let maColDeNbrVoisinVivant = new Array(); 
        for (j=0; j<tailleMax/cellSize; j++){
            maColDeNbrVoisinVivant[j] = 0;
        }
        monTabDeVivant[i] = maColDeNbrVoisinVivant;
    }

}


//--------CREATION DU TABLEAU CANVAS----------//
function drawVertical(x1)
{
context.beginPath();
context.fillStyle = "black"
context.moveTo(cellSize * x1, 0);
context.lineTo(cellSize * x1, tailleMax);
context.stroke(); 
} 
function drawHorizontal(y1)
{
context.beginPath();
context.fillStyle = "black"
context.moveTo(0,cellSize * y1);
context.lineTo(tailleMax, cellSize * y1);
context.stroke(); 
} 

function showGrid(){
    for (i=0; i<=denominateur; i++){
        drawHorizontal(i)
        drawVertical(i)
    }

}


//---------REMPLISSAGE ALEATOIRE DU TABLEAU-------//


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function remplissageDemarrageAleatoire(){
    for (var k=0; k<NbrDeCasesVivantes; k++){
        let maCaseX = getRandomIntInclusive(0,tailleMax/cellSize -1)
        let maCaseY = getRandomIntInclusive(0,tailleMax/cellSize -1) 
        context.fillRect(maCaseX*cellSize, maCaseY*cellSize, cellSize, cellSize)
        //console.log("i : "+k +" x : " + maCaseX + " y : " + maCaseY);
       
        monTabDeVivant[maCaseX][maCaseY] = 1;
    }
}




function MonTableauPlus1(){

     monTabDeVivantSuivant = new Array();

    for (var i=0; i<tailleMax/cellSize; i++){
        let maColDeVivantSuivant = new Array();
        for (var j=0; j<tailleMax/cellSize; j++){
            let count = 0;

            if (i == 0 && j == 0){
               count = monComptageHautGauche(i,j) 
            }
            else if (i == 0 && j == tailleMax/cellSize -1){
                count = monComptageBasGauche(i,j)
            }
            else if (i == tailleMax/cellSize -1 && j == tailleMax/cellSize -1){
                count = monComptageBasDroite(i,j)
            }
            else if (i == tailleMax/cellSize -1 &&  j == 0){
                count = monComptageHautDroite(i,j)
            }
            else if (i == 0 ){
                count = monComptageColGauche(i,j)
            }
            else if (i == tailleMax/cellSize -1){
                count = monComptageColDroite(i,j)
            }
            else if (j == 0){
                count = monComptageLigneHaut(i,j)
            }
            else if (j == tailleMax/cellSize -1){
                count = monComptageLigneBas(i,j)
            }
            else{
                count = monComptageInterieur(i,j)
            }
            if (count == 3){
                maColDeVivantSuivant[j] = 1
            }
            else if( count == 2 && monTabDeVivant[i][j] == 1){
                maColDeVivantSuivant[j] = 1
            }
            else{
                maColDeVivantSuivant[j] = 0
            }
        }
        monTabDeVivantSuivant[i] = maColDeVivantSuivant;
    }
}



function monComptageHautGauche(i,j){
    let count = 0;


    if (monTabDeVivant[i][j+1] == 1){count++} 
    if (monTabDeVivant[i+1][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j] == 1){count++}

    if (monTabDeVivant[tailleMax/cellSize -1][j+1] == 1){count++} //bg
    if (monTabDeVivant[tailleMax/cellSize -1][j] == 1){count++} //g
    if (monTabDeVivant[tailleMax/cellSize -1][tailleMax/cellSize -1] == 1){count++} //hg
    if (monTabDeVivant[i][tailleMax/cellSize -1] == 1){count++}  //h
    if (monTabDeVivant[i+1][tailleMax/cellSize -1]){count++}  //hd

    return count;
}
function monComptageHautDroite(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    if (monTabDeVivant[i-1][tailleMax/cellSize -1] == 1){count++} //hg
    if (monTabDeVivant[i][tailleMax/cellSize -1] ==1){count++} //h
    if (monTabDeVivant[0][tailleMax/cellSize -1] ==1){count++} //hd
    if (monTabDeVivant[0][0] == 1){count++} //d
    if (monTabDeVivant[0][1] == 1){count++} //bd

    return count;
}
function monComptageBasDroite(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    if (monTabDeVivant[0][j-1] == 1){count++} //hd
    if (monTabDeVivant[0][tailleMax/cellSize -1] == 1){count++} //d
    if (monTabDeVivant[0][0] == 1){count++}  //bd
    if (monTabDeVivant[tailleMax/cellSize -1][0] == 1){count++}  //b
    if (monTabDeVivant[i-1][0] == 1){count++} //bg

    return count;
}
function monComptageBasGauche(i,j){
    let count = 0;
    if (monTabDeVivant[i+1][j] == 1){count++}
    if (monTabDeVivant[i+1][j-1] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    if (monTabDeVivant[tailleMax/cellSize -1][j-1] == 1){count++}  //hg
    if (monTabDeVivant[tailleMax/cellSize -1][j] == 1){count++}  //g
    if (monTabDeVivant[0][tailleMax/cellSize -1] == 1){count++}  //bg
    if (monTabDeVivant[0][0] == 1){count++}  //b
    if (monTabDeVivant[1][0] == 1){count++}  //bd

    return count;
}
function monComptageColGauche(i,j){
    let count = 0;
    if (monTabDeVivant[i][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j] == 1){count++}
    if (monTabDeVivant[i+1][j-1] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    if (monTabDeVivant[tailleMax/cellSize -1][j-1] == 1){count++} //hg
    if (monTabDeVivant[tailleMax/cellSize -1][j] == 1){count++} //h
    if (monTabDeVivant[tailleMax/cellSize -1][j+1] == 1){count++} //bg

    return count;
}
function monComptageColDroite(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i][j+1] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j+1] == 1){count++}

    if (monTabDeVivant[0][j-1] == 1){count++} //hd
    if (monTabDeVivant[0][j] == 1){count++}  //d
    if (monTabDeVivant[0][j+1] == 1){count++} //bd

    return count;
}
function monComptageLigneHaut(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i-1][j+1] == 1){count++}
    if (monTabDeVivant[i][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j] == 1){count++}

    if (monTabDeVivant[i-1][tailleMax/cellSize -1] == 1){count++} //hg
    if (monTabDeVivant[i][tailleMax/cellSize -1] == 1){count++} //h
    if (monTabDeVivant[i+1][tailleMax/cellSize -1] == 1){count++} //hd

    return count;
}
function monComptageLigneBas(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i+1][j] == 1){count++}
    if (monTabDeVivant[i+1][j-1] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    if (monTabDeVivant[i-1][0] == 1){count++} //bg
    if (monTabDeVivant[i][0] == 1){count++} //b
    if (monTabDeVivant[i+1][0] == 1){count++} //bd

    return count;
}
function monComptageInterieur(i,j){
    let count = 0;
    if (monTabDeVivant[i-1][j-1] == 1){count++}
    if (monTabDeVivant[i-1][j] == 1){count++}
    if (monTabDeVivant[i-1][j+1] == 1){count++}
    if (monTabDeVivant[i][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j+1] == 1){count++}
    if (monTabDeVivant[i+1][j] == 1){count++}
    if (monTabDeVivant[i+1][j-1] == 1){count++}
    if (monTabDeVivant[i][j-1] == 1){count++}

    return count;
}


function remplissageMonCanvasPlus1(){

    for (var i=0; i<tailleMax/cellSize; i++){

        for (var j=0; j<tailleMax/cellSize; j++){
    
            if(monTabDeVivantSuivant[i][j] == 1){
                context.fillStyle = "black"
            context.fillRect( i*cellSize, j*cellSize, cellSize, cellSize)
            }
            else{
                context.fillStyle = "white"
                context.fillRect( i*cellSize, j*cellSize, cellSize, cellSize)
    
            } 
    
        }
    }


}

showGrid();

function start(){
    showGrid();
    creationDuTabDeVivant();
    remplissageDemarrageAleatoire();
    hasStarted = true;
}

function iterate(){
    MonTableauPlus1()

    remplissageMonCanvasPlus1()
    showGrid();
    monTabDeVivant = monTabDeVivantSuivant
}

function play(){
    if (!hasStarted){
        start();
    }
    if (gameIterator === undefined){
        hasStarted = true;
        gameIterator = setInterval(iterate, 100)
    }
}

function pause(){

    window.clearInterval(gameIterator);
    gameIterator = undefined;
}