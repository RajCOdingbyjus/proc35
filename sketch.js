
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var tree;
var engine, world
var canvas;
var player;
var playerArcher;
var playerBase;
var mango ,mango2,mango3,mango4,mango5;
var playerArrows= [];
var numberofArrows = 10;

function preload() {
   backgroundImg = loadImage("./assest/bg.png");
   
}
function setup() {
 canvas = createCanvas(windowWidth,windowHeight);


  engine = Engine.create();
  world = engine.world;
  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );
  tree = new Tree(1500, 330,500, 1000)
  mango = new Mango(1400,330,50,50)
  mango2 = new Mango(1600,400,50,50)
   mango3 =  new Mango(1550,330,50,50)
  mango4 = new Mango(1450,150,50,50)
  mango5  = new Mango(1570,150,50,50)
  
}


function draw() 
{
  background(backgroundImg);
  Engine.update(engine);
  player.display();
  playerArcher.display();
  playerBase.display();
tree.display();
mango.display();
mango2.display();
mango3.display();
mango4.display();
mango5.display();

for(var i=0; i < playerArrows.length; i++) {
  if(playerArrows[i]!== undefined) {
    playerArrows[i].display();

    var mangoCollision = Matter.SAT.collides(
      World.remove(world,mango.body),
      playerArrows[i].body
    );

    var mango2Collision = Matter.SAT.collides(
      World.remove(world,mango2.body),
      playerArrows[i].body
    );

    var mango3Collision = Matter.SAT.collides(
      World.remove(world,mango3.body),
      playerArrows[i].body
    );

    var mango4Collision = Matter.SAT.collides(
      World.remove(world,mango4.body),
      playerArrows[i].body
    );

    var mango5Collision = Matter.SAT.collides(
      World.remove(world,mango5.body),
      playerArrows[i].body
    );




    var posX = playerArrows[i].body.position.x;
    var posY = playerArrows[i].body.position.y;

    if (posX > width || posY > height) {
      if (!playerArrows[i].isRemoved) {
        playerArrows[i].remove(i);
      } else {
        playerArrows[i].trajectory = [];
      }
    }


    
  }
}
 

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
