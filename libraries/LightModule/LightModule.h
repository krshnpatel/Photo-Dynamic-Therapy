#ifndef LightModule_h
#define LightModule_h
#if defined(ARDUINO) && ARDUINO >= 100
#include <Arduino.h>
#else
#include <WProgram.h>
#include <pins_arduino.h>
#endif

class LightModule {

    const char pin0, pin1, pin2, pin3, pin4;
    float dutyCycle = 0.2;

public:
    LightModule(char p0, char p1, char p2, char p3, char p4);
    void on();
    void off();
    void changeDutyCycle(float dCycle);

};
#endif
