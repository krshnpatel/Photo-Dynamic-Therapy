#ifndef BlueLight_h
#define BlueLight_h
#if defined(ARDUINO) && ARDUINO >= 100
#include <Arduino.h>
#else
#include <WProgram.h>
#include <pins_arduino.h>
#endif

class BlueLight {

    const char pinNumber;
    bool pinState;

public:
    BlueLight(char pNum);
    void on();
    void off();

};
#endif