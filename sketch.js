let readyToReceive;

let mSerial;
let waterImage, lightImage;
let waterButtonState;
let lightSensorValue;

let spriteSheet;
let currentFrame = 0;
let frameCount = 9;
let animating = false;
let lastAnimation = '';

function preload() {

  waterImage = loadImage("water.jpg");
  lightImage = loadImage("light.png");
  spriteSheet = loadImage("spritesheet.png");
}

function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;

  // if (line.charAt(0) != "{") {
  //   print("error: ", line);
  //   readyToReceive = true;
  //   return;
  // }

  // let data = JSON.parse(line).data;


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

  mSerial = createSerial();

  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
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
  

  // if (mSerial.opened() && readyToReceive) {
  //   readyToReceive = false;
  //   mSerial.clear();
  //   mSerial.write(0xab);
  // }
  if (waterButtonState == 1) {
    image(waterImage, width - width / 5, 0, width / 5, height / 5);
  } else if (lightSensorValue > 350) {
    image(lightImage, 0, 0, width / 5, height / 5);
  }

  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }
  if (waterButtonState == 1) {
    startAnimation('water');
    animateSprite(0, 9); 
  } else if (lightSensorValue > 350) {
    startAnimation('light');
    animateSprite(0, 9); 
  } else {
    stopAnimation();
  }
  
  
  function animateSprite(row, frameCount) {
    if (!animating) return;
  
    let spriteWidth = spriteSheet.width/9; 
    let x = currentFrame*spriteWidth;
    let y = 0;
    image(spriteSheet, width/2-300, 0, spriteWidth, spriteSheet.height, x, y, spriteWidth, spriteSheet.height);
  
    currentFrame++;
    if (currentFrame >= frameCount) {
      currentFrame = 0;
    }
  }
}