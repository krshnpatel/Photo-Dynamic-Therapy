#include<BlueLight.h>
#include<LightModule.h>

BlueLight blueLight(52);
LightModule redArray(13, 12, 11, 10, 9);
LightModule orangeArray(6, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600);
  
}

void loop() {
  if(Serial.available()) 
    handleCommand(Serial.read());
  
}

double ConvertWavelength2RedLight(float wavelength) {
  if(wavelength < 608 || wavelength > 624) {
    return 0.1;
  }
  else
    return (-.000359085595647)*(wavelength*wavelength*wavelength) + (0.660955206968357)*(wavelength*wavelength) - 405.488124920128*wavelength + 82912.5155789246; 
}

double ConvertWavelength2OrangeLight(float wavelength) {
  if(wavelength < 600 || wavelength > 611) {
    return 0.1;
  }
  else
    return (-.001342592592592593)*(wavelength*wavelength*wavelength) + (2.444537037036480)*(wavelength*wavelength) - 1483.60754629596*wavelength + 300131.98101845; 
}

void handleCommand(byte b) {

  if(b == 0xFF) {
    blueLight.on();
  }

  else if(b == 0xFE) {
    blueLight.off();
  }

  else if(b == 0xEE) {
    byte b[4];
    char i = 0;
    while(1) {
      if(Serial.available()) {
        b[i++] = Serial.read();
      }
      if(i == 4)
      break;
    }
    float d;
    memcpy(&d, b, 4);
    redArray.changeDutyCycle(ConvertWavelength2RedLight(d));
    orangeArray.changeDutyCycle(ConvertWavelength2OrangeLight(d));
    redArray.on();
    orangeArray.on();
    
  }
  
  else if(b == 0xED) {
    redArray.off();
    orangeArray.off();
  }

}




