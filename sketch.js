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

function preload() {

  waterImage = loadImage("water.jpg");
  lightImage = loadImage("light.png");
  spriteSheet = loadImage("spritesheet.png");
  plantImage = loadImage("plant.png");
  spriteSheetwater = loadImage("SpriteSheetwater.png");
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
  
  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }

  if (waterButtonState == 1) {
    startAnimation('water');
    animateSpriteSheetWater(0, 12); 
    image(waterImage, width - width / 5, height/6, width / 5, height / 3);
  } else if (lightSensorValue > 350) {
    startAnimation('light');
    animateSprite(0, 9);
    image(lightImage, width/2, 0, width / 5 * 2, height / 3 * 2);
  } else {
    stopAnimation();
    image(plantImage, width/2, height/2, plantImage.width, plantImage.height);
  }
}
  
  
  function animateSprite(row, frameCount) {
    if (!animating) return;
  
    let spriteWidth = spriteSheet.width/9; 
    let x = currentFrame*spriteWidth;
    let y = 0;
    image(spriteSheet, width/2-45, height/2+8, spriteWidth, spriteSheet.height, x, y, spriteWidth, spriteSheet.height);
    
    currentFrame++;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  }

  function animateSpriteSheetWater(row, frameCount) {
    if (!animating) return;
  
    let spriteWidth = spriteSheetwater.width / 12; 
    let x = currentFrame * spriteWidth;
    let y = 0;
    image(spriteSheetwater, width/2, height/2, spriteWidth, spriteSheetwater.height, x, y, spriteWidth, spriteSheetwater.height);
  
    currentFrame++;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  }
