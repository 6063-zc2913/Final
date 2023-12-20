let readyToReceive;

let mSerial;
let waterImage, lightImage;
let waterButtonState;
let lightSensorValue;

let spriteSheet;
let spriteSheetwater;
let currentFrame = 0;
let frameCount = 9;
let animating = false;
let lastAnimation = '';
let waterCount = 0;
let lightCount = 0;
let plantDieImage;
let plantdied;

function preload() {

  waterImage = loadImage("water.png");
  lightImage = loadImage("light.png");
  spriteSheet = loadImage("spritesheet.png");
  plantImage = loadImage("plant.png");
  spriteSheetwater = loadImage("SpriteSheetwater.png");
  plantDieImage = loadImage("plantdie.png");
}

function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;


  print(line);
  let values = line.split(",");
  waterButtonState = values[0];
  lightSensorValue = values[1];

  readyToReceive = true;

  if (waterButtonState == 1) {
    waterCount++;
    if(plantdied){
      plantdied = false;
    }
  }
  
  if (lightSensorValue > 350) {
    lightCount++; 
    if(plantdied){
      plantdied = false;
    }
  }
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    readyToReceive = true;
    connectButton.hide();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  readyToReceive = false;
  frameRate(10);
  imageMode (CENTER);
  plantdied = false;

  mSerial = createSerial();

  connectButton = createButton("Connect To Serial");
  connectButton.position( 100, 700);
  connectButton.mousePressed(connectToSerial);
}

function startAnimation(type) {
  if (lastAnimation !== type) {
    lastAnimation = type;
    currentFrame = 0;
    animating = true;
  }
}

function stopAnimation() {
  animating = false;
  lastAnimation = '';
}
function draw() {
  background("white");
  noStroke();
  
  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }
  if (plantdied){
    image(plantDieImage, width / 2, height / 2, plantDieImage.width, plantDieImage.height);
    stopAnimation();
    lightCount = 0;
    waterCount = 0;
  }else if (waterButtonState == 1) {
    startAnimation('water');
    animateSpriteSheetWater(0, 12); 
    image(waterImage, width/2 +300, height/6, width / 5, height / 3);
  } else if (lightSensorValue > 350) {
    startAnimation('light');
    animateSprite(0, 9);
    image(lightImage, width/2-300, 0, width / 5 * 2, height / 3 * 2);
  
  
  } 
  
  else {

    stopAnimation();
    image(plantImage, width/2, height/2, plantImage.width, plantImage.height);
  }

}
  
  
  function animateSprite(row, frameCount) {
    if (!animating) return;
  
    let spriteWidth = spriteSheet.width/9; 
    let x = currentFrame*spriteWidth;
    let y = 0;
   
    
    currentFrame++;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }

    let lightBarHeight = map(lightCount, 0, 30, 0, windowHeight); 

    if (lightBarHeight >= windowHeight||plantdied ) {
      image(plantDieImage, width / 2, height / 2, plantDieImage.width, plantDieImage.height);
      plantdied = true;
    } else {
      image(spriteSheet, width/2-45, height/2+12, spriteWidth, spriteSheet.height, x, y, spriteWidth, spriteSheet.height);
    fill(237, 146, 53); 
    rect(100, height - 50 - lightBarHeight, 20, lightBarHeight);
  
  }
}

  function animateSpriteSheetWater(row, frameCount) {
    if (!animating) return;
  
    let spriteWidth = spriteSheetwater.width / 12; 
    let x = currentFrame * spriteWidth;
    let y = 0;
 
    currentFrame++;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }

    let waterBarHeight = map(waterCount, 0, 30, 0, windowHeight); 
  if (waterBarHeight >= windowHeight ||plantdied) {
    image(plantDieImage, width / 2, height / 2, plantDieImage.width, plantDieImage.height);
    plantdied = true;
  } else {
    image(spriteSheetwater, width/2-45, height/2+12, spriteWidth, spriteSheetwater.height, x, y, spriteWidth, spriteSheetwater.height);
    fill(101, 154, 208); 
    rect(50, height - 50 - waterBarHeight, 20, waterBarHeight);
  }
}
