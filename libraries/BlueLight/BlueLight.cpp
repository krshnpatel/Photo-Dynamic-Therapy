#include<BlueLight.h>


BlueLight::BlueLight(char pNum) : pinNumber(pNum) {
    pinMode(pinNumber, OUTPUT);
    digitalWrite(pinNumber, HIGH);
}

void BlueLight::on() {
    digitalWrite(pinNumber, LOW);
    pinState = true;
}

void BlueLight::off() {
    digitalWrite(pinNumber, HIGH);
    pinState = false;
}