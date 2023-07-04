var board;
var context;

var blockSize = 25;
var gameSizeX = 60;
var gameSizeY = 20;
var boxPositionX = 5;
var boxPositionY = 19;
var boxRoad = [];
var xPositonMove = -1;
var newBarrierPostionX;
var newBarrierPositionY;
var jumpSpeed = 0.1;
var targetPositionY = 15;
var score=0;

window.onload = function () {
    board = document.getElementById("board");
    board.width = blockSize * gameSizeX;
    board.height = blockSize * gameSizeY;
    context = board.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(boxGame, 1000 / 15);
    setInterval(removeBarier, 1000 / 15);
}

function boxGame() {
    barrierSpawn();
    gameOver();
    getPoint();
    //board 
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //Barrier spawn noktalarını ekranda yazmak için koordinatları al ve ekranda çıktısını göster
    for (i = 0; i < boxRoad.length; i++) {
        context.fillStyle = "red";
        context.fillRect(boxRoad[i].x * blockSize, boxRoad[i].y * blockSize, blockSize, blockSize);
    }

    context.fillStyle = "yellow";
    context.fillRect(boxPositionX * blockSize, boxPositionY * blockSize, blockSize, blockSize);

}

function barrierSpawn() {
    // rastgele bariyer spawn noktasını belirle 
    newBarrierPostionX = Math.floor(Math.random() * gameSizeX);
    newBarrierPositionY = Math.floor(Math.random() * gameSizeY);
    // eğer yeni bariyer spawn noktası şartları sağlıyorsa boxRoad'a pushla koordinatları
    if (newBarrierPostionX > 40 && newBarrierPositionY >= 17) {
        boxRoad.push({ x: newBarrierPostionX, y: newBarrierPositionY });
    }

}

function removeBarier() {
    //Spawn olan barrierlerin X koordinatını sürekli artır eğer X koordinatı 0 dan küçükse , küçük olan koordinatları 
    // boxRoad dizisinden sil.
    for (i = 0; i < boxRoad.length; i++) {
        boxRoad[i].x += xPositonMove;
        if (boxRoad[i].x < 0) {
            boxRoad.shift();
        }
    }
}

var animationSpeed = 0.1; // Yavaşlık ayarı

function keyPush(e) {
    if (e.code === "ArrowUp") {
        animateUp();
    }
}

function animateUp() {
    var targetPositionY = 15;
    var currentPositionY = boxPositionY;

    var animationInterval = setInterval(function() {
        if (currentPositionY > targetPositionY) {
            currentPositionY -= animationSpeed;
            boxPositionY = Math.round(currentPositionY);
        } else {
            clearInterval(animationInterval);
            animateDown(); // Yavaş animasyon tamamlandıktan sonra tekrar 19'a dönme animasyonunu başlat
        }
    }, 10);
}

function animateDown() {
    var targetPositionY = 19;
    var currentPositionY = boxPositionY;

    var animationInterval = setInterval(function() {
        if (currentPositionY < targetPositionY) {
            currentPositionY += animationSpeed;
            boxPositionY = Math.round(currentPositionY);
        } else {
            clearInterval(animationInterval);
        }
    }, 10);
}

function gameOver(){
    for(i=0; i<boxRoad.length ; i++){
        if(boxRoad[i].y == boxPositionY && boxRoad[i].x == boxPositionX){
            alert("GAME OVER")
            score = 0;
        }
    }
}

function getPoint (){
 let scoreTable = document.getElementById("point");
 for(i=0; i<boxRoad.length ; i++){
     if(boxRoad[i].x == boxPositionX-1){
        score +=1;
        console.log(score);
        scoreTable.innerHTML = score ;
     }

 }

}


