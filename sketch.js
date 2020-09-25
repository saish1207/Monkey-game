var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var food

var ground ;
var score

var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 300);
  monkey = createSprite(80,270,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1 ;
  
  ground = createSprite(700,300,1200,10);
  ground.x = ground.width/2 ;
   ground.velocityX = -4;
  
 
  
   
  foodGroup = createGroup();
   obstacleGroup = createGroup();
  
  
  score = 0;
survivalTime = 0;
  
}


function draw() {
  background("white");
  
  textSize(20)
  text("Score: "+ score, 500,50);
  
  stroke("black");
  fill("black");
  survivalTime = Math.ceil(frameCount / getFrameRate());
   text("SurvivalTime:"+ survivalTime ,100,50);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  if(gameState === PLAY){
    
food1();
obstacle1();
    
    
    if(monkey.collide(ground)){
    if(keyDown("space")){
      monkey.velocityY = -15;
   }
    }
    
    
    
    
   if(monkey.isTouching(obstacleGroup)){
     gameState = END ;
   } 
    
    if(monkey.isTouching(foodGroup)){
      foodGroup .destroyEach() ;
     score = score +2
   } 
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    
  }
  else if (gameState === END) {
    obstacleGroup.setLifetimeEach(-1);
     foodGroup .setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
     foodGroup .setVelocityXEach(0); 
    
    monkey.velocityY = monkey.velocityY + 0.8
    ground.velocityX = 0 ;
    
    
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
  
  
}

function food1(){
  if(frameCount % 200 === 0){
  food = createSprite(600,265,20,20);
    food.velocityX = -(6 + 3 * score / 100);
    food.addImage( bananaImage);
    food.velocityX = -3 ;
    food.scale = 0.1
    food.y = Math.round(random(120,200));
     foodGroup.add(food);
  }
}

function obstacle1(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(600,280,20,20);
    obstacle.velocityX = -(6 + 3 * score / 100);
    obstacle.addImage( obstaceImage);
    obstacle.velocityX = -3 ;
    obstacle.scale = 0.2
    obstacle.setCollider("circle",10,10,30);
   obstacle.debug = false ;
    obstacleGroup.add(obstacle) ;
    
    
    
  }
}




