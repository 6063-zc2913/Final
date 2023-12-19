int waterButtonPin = 2; 
int lightSensorPin = A0; 
                                  
void setup() {
  Serial.begin(9600);
  pinMode(waterButtonPin, INPUT_PULLUP); 
}

void loop() {
  int waterButtonState = digitalRead(waterButtonPin); 
  int lightSensorValue = analogRead(lightSensorPin); 

 
  Serial.print(waterButtonState);
  Serial.print(",");
  Serial.println(lightSensorValue);

  delay(100);
}