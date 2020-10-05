var monkey , monkey_running
var banana ,bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground;
var survivalTime=0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  
  ground = createSprite(400,393,900,13);
  ground.velocityX = -6;
  ground.x = (200,300);
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil( frameCount / frameRate());
  text ("Survival Time: " + survivalTime, 100, 50);
  
  
  ground.x = ground.width/2;
  monkey.collide(ground);
  
  if (gameState === PLAY){
     
    if(keyDown("space")){     
     monkey.velocityY = -10;     
     }  
  
  // gravity
  monkey.velocityY = monkey.velocityY + 0.8;
   
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
   gameState = END;
   
    
   }  
   
  
  
  obstacles();
  food();
    
  }
  
  if( gameState === END){
    
      monkey.velocityY=0;
      banana.velocityX = 0;
      obstacle.velocityX = 0;
      obstacleGroup.velocityX = 0;
    
      obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  drawSprites();
}

function food(){
  if( frameCount % 130 === 0){
    banana = createSprite(600,200,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 150;
    
    bananaGroup.add(banana);      
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(500,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.19;
    obstacle.velocityX = -7;
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);
  }
  
  
}