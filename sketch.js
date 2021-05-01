var road, coin, coins, player;
var roadImage, coinImage, coinsImage, playerImage;
var branch, stone, dog;
var branchImage, dogImage, stoneImage;
var obstacleGroup, obstaclesGroup, obsGroup;
var coinGroup, coinsGroup;
var score;
var gameState = "play";

function preload(){
  roadImage = loadImage("road.jpg");
  coinImage = loadImage("coin.png");
  coinsImage = loadImage("coin1.png");
  playerImage = loadImage("player.png");
  branchImage = loadImage("branch.png");
  stoneImage = loadImage("stone.png");
  dogImage = loadImage("dog.png");
}

function setup() {
 createCanvas(400,450);
 road = createSprite(200, 400, 200, 50);
 road.addImage(roadImage);
 road.scale = 1.3;
  
  player = createSprite(85, 400);
  player.addImage(playerImage);
  player.scale = 0.15;
  
  coinGroup = new Group();
  coinsGroup = new Group();
  obstacleGroup = new Group();
  obstaclesGroup = new Group();
  obsGroup = new Group();
  
  score = 0;
}


function coinC(){
  if(frameCount%80 === 0){
  var coin = createSprite(Math.round(random(50, 350)), 50);
  coin.addImage(coinImage);
  coin.scale = 0.027;
  coin.velocityY = road.velocityY;
  coin.lifetime = 450;
  coinGroup.add(coin);
  }
}

function coins(){
  if(frameCount%60 === 0){
  var coins = createSprite(Math.round(random(20, 350)), 50);
  coins.addImage(coinsImage);
  coins.scale = 0.027;
  coins.velocityY = road.velocityY;
  coins.lifetime = 450;
  coinsGroup.add(coins);
  }
}

function dog(){
  if(frameCount%110 === 0){
  var dog = createSprite(Math.round(random(20, 350)), 50);
  dog.addImage(dogImage);
  dog.scale = 0.07;
  dog.velocityY = road.velocityY;
  dog.lifetime = 450;
  obstacleGroup.add(dog);
  }
}

function branch(){
  if(frameCount%80 === 0){
  var branch = createSprite(Math.round(random(20, 350)), 50);
  branch.addImage(branchImage);
  branch.scale = 0.07;
  branch.velocityY = road.velocityY;
  branch.lifetime = 450;
  obsGroup.add(branch);
  }
}

function stone(){
  if(frameCount%120 === 0){
  var stone = createSprite(Math.round(random(20, 350)), 50);
  stone.addImage(stoneImage);
  stone.scale = 0.01;
  stone.velocityY = road.velocityY;
  stone.lifetime = 450;
  obstaclesGroup.add(stone);
  }
}

function draw() {
    
  drawSprites();
  if(gameState === "play"){
    stone();
      dog();
      branch();
      coinC();
      coins();
     road.velocityY = 4;
    
    if(player.x - 35 > 25 ){
    if(keyDown("left_arrow")){
  player.x = player.x - 25;
  }
 }
    if(player.x + 35 < 380){
    if(keyDown("right_arrow")){
  player.x = player.x + 25;
  }
 }
    if(road.y > 400){
  road.y = 100;    
      
 }
    if(coinGroup.isTouching(player)){
    coinGroup.destroyEach();
    score = score+1;
  }
    if(coinsGroup.isTouching(player)){
    coinsGroup.destroyEach();
    score = score+1;
  } 
  
    if(coinGroup.isTouching(obstacleGroup) || 
      coinsGroup.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
  }
    if(coinGroup.isTouching(obstaclesGroup) || 
      coinsGroup.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
  }
    if(coinGroup.isTouching(obsGroup) || 
      coinsGroup.isTouching(obsGroup)){
    obsGroup.destroyEach();
  }
    
    if(player.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    gameState = "end";
  }
    
    if(player.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    gameState = "end";
  }
    
    if(player.isTouching(obsGroup)){
    obsGroup.destroyEach();
    gameState = "end";
  }
    
    road.velocityY = 4 + 3 * score/10;
    console.log(road.velocityY);
}
        else{ road.velocityY = 0;
       fill("red");
       textSize(40);
       text("Game Over", 100, 200);
       
       fill("red");
       textSize(20);
       text("Press Space to  Restart", 100, 220);
       
       if(keyDown("space")){
         gameState = "play";
       }
  }
    fill("blue");
    textSize(25);
    text("Score : " + score,270,50);
}






