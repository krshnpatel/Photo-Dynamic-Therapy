#include <LightModule.h>

LightModule::LightModule(char p0, char p1, char p2, char p3, char p4) : pin0(p0), pin1(p1), pin2(p2), pin3(p3), pin4(p4) {
    pinMode(pin0, OUTPUT);
    pinMode(pin1, OUTPUT);
    pinMode(pin2, OUTPUT);
    pinMode(pin3, OUTPUT);
    pinMode(pin4, OUTPUT);
}

void LightModule::on(){
    analogWrite(pin0, 255*dutyCycle);
    analogWrite(pin1, 255*dutyCycle);
    analogWrite(pin2, 255*dutyCycle);
    analogWrite(pin3, 255*dutyCycle);
    analogWrite(pin4, 255*dutyCycle);
}

void LightModule::off(){
    analogWrite(pin0, 0);
    analogWrite(pin1, 0);
    analogWrite(pin2, 0);
    analogWrite(pin3, 0);
    analogWrite(pin4, 0);
}

void LightModule::changeDutyCycle(float dCycle){
    dutyCycle = ((dCycle < 0.96) ? dCycle:dutyCycle); //restrict the duty cycle so the lights do not blow
}


