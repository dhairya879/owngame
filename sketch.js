var PLAY = 1;
var END = 0;
var gameState = PLAY;

var balloon;
var balloonImg;
var spinesGroup, spines1,  spines2, spines3;
var score=0;
var bub,bubImg;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){
  

  balloonImg=loadImage("ballon.png");

  spines1Img=loadImage("cac.png");

  spines2Img=loadImage("cac2.png");

  spines3Img=loadImage("cac3.png");

  bgIMG=loadImage("BG..png");

  bubImg=loadImage("bub.png");

  gameOverImg=loadImage("game over.png");

  restartImg=loadImage("restart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // creating balloon
  balloon = createSprite(650,509,50,20);
  balloon.addImage(balloonImg);
  balloon.scale=0.5;
  balloon.debug = true;
  balloon.setCollider("circle",0,0,30);
  
  //creating spines
   spinesGroup= new Group() 

   bubGroup = new Group();
  
   //bg
   bg=createSprite(500,500);
   bg.scale=10
   bg.addImage(bgIMG);

  //gameOver restart
  gameOver=createSprite(width/2-10,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.3;
  gameOver.visible = false;

 //restart
 restart=createSprite(width/2,300);
 restart.addImage(restartImg);
 restart.scale=0.3;
 restart.visible = false;

 
}

function draw() {
  background("white");
  drawSprites();
  
  //moving balloon
  
  if(gameState===PLAY){
    
    balloon.depth=10;
  
    textSize(30);
    fill("black");
    text("Score: "+ score,width-200,500);
    
    //text.depth=100;
  
  
    score = score + Math.round(getFrameRate()/60);
    balloon.x = World.mouseX;
  
  
  
  
  spawnBub();
    spawspines();
    
    
    if(spinesGroup.isTouching(balloon)){
      gameState = END;
    }
     
  }  
   if(gameState ===  END){
    gameOver.visible = true;
    
    
    restart.visible = true;
  
    spinesGroup.setVelocityYEach(0);
    bubGroup.setVelocityYEach(0);
     bub.velocityY=0;
   
     
     
     spinesGroup.setLifetimeEach(-1);
      
     if(keyDown("SPACE")){
      Reset();
     }
     
  }
  
console.log(gameState);

}



function spawspines(){
  
  
  if(frameCount % 30 === 0){
     spines = createSprite(Math.round(random(50,width-100)),-10,20,30);

     var rand = Math.round(random(1,3));
     switch(rand){
       case 1: spines.addImage(spines1Img);
          break;
       case 2: spines.addImage(spines2Img);
          break;
          case 3 :spines.addImage(spines3Img);
          break;
     }
   
     spinesGroup.add(spines);
     spines.scale=0.7
     spines.debug = true;
     
     spines.velocityY=15;
    

    }

    
    
     

}

function spawnBub(){

  if(frameCount % 5 === 0){
   bub=createSprite(Math.round(random(50,width-100)),-10,20,30);
   bub.addImage(bubImg);
   bub.scale=0.5;
   bub.velocityY=15;
   bub.depth=20;
   bubGroup.add(bub);


  }


}


 function Reset(){
 
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
   bub.destroy();
  spinesGroup.destroyEach();
  bub.destroy();
 }

