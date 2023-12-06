let connectButton;
let readyToReceive;

let mSerial; 
let waterImage, lightImage; 

function preload() {

  waterImage = loadImage("/Users/chenziyi/Desktop/Final/water.jpg");
  lightImage = loadImage("/Users/chenziyi/Desktop/Final/light.jpg"); 
}

function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;

  if (line.charAt(0) != "{") {
    print("error: ", line);
    readyToReceive = true;
    return;
  }

  let data = JSON.parse(line).data;
  let waterButtonState = data.waterButtonState;
  let lightSensorValue = data.lightSensorValue;


  if (waterButtonState == 1) {
    image(waterImage, 0, 0, width, height); 
  } else if (lightSensorValue > someThreshold) { 
    image(lightImage, 0, 0, width, height); 
  }
  
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

function draw() {
  if (mSerial.opened() && readyToReceive) {
    readyToReceive = false;
    mSerial.clear();
    mSerial.write(0xab);
  }

  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }
}