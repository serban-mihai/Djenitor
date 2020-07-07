/**
 * Teensy 4.0 Sketch for YACc
 * Author: Șerban Mihai-Ciprian
 * Reference: https://github.com/serban-mihai/Djenitor.git
 */

#define ADC_TEENSY_4 // Teensy 4.0 Microcontroller

#include <ArduinoJson.h>
#include <settings_defines.h>
#include <ADC.h>
#include <ADC_util.h>
#include <array>

#define STRING_NUMBER 8       // Number of guitar strings
#define VOLTAGE_THRERHOLD 100 // Max value for noise till pitch detection

// Global Pins and Names Arrays
const int pins[8] = {A0, A1, A2, A3, A4, A5, A6, A7};
const String names[8] = {"El", "Bl", "G", "D", "A", "Eh", "Bh", "F#"};

DynamicJsonDocument encode(std::array<uint32_t, STRING_NUMBER> values);
ADC *adc = new ADC(); // ADC Object that contains both ADC_0 and ADC_1

void setup()
{
    // TODO: Adjust below values
    adc->adc0->setAveraging(0);                                           // set number of averages
    adc->adc0->setResolution(16);                                         // set bits of resolution
    adc->adc0->setConversionSpeed(ADC_CONVERSION_SPEED::VERY_HIGH_SPEED); // change the conversion speed
    adc->adc0->setSamplingSpeed(ADC_SAMPLING_SPEED::VERY_HIGH_SPEED);     // change the sampling speed
#ifdef ADC_DUAL_ADCS
    adc->adc1->setAveraging(0);                                           // set number of averages
    adc->adc1->setResolution(16);                                         // set bits of resolution
    adc->adc1->setConversionSpeed(ADC_CONVERSION_SPEED::VERY_HIGH_SPEED); // change the conversion speed
    adc->adc1->setSamplingSpeed(ADC_SAMPLING_SPEED::VERY_HIGH_SPEED);     // change the sampling speed
#endif
    for (int pin = 0; pin < STRING_NUMBER; pin++)
    {
        pinMode(pins[pin], INPUT);
    }
    Serial.begin(2000000);
}

void loop()
{
    std::array<uint32_t, STRING_NUMBER> values;
    for (int couple = 0; couple < STRING_NUMBER; couple += 2)
    {
        ADC::Sync_result pinCouple = adc->analogSynchronizedRead(pins[couple], pins[couple + 1]);
        values[couple] = pinCouple.result_adc0;
        values[couple + 1] = pinCouple.result_adc1;
    }
    serializeJson(encode(values), Serial);
    Serial.print("\n");
    return;
}

/*
 * Encodes details from each pin in JSON and returns a serialized Doc
 * Args: None
 * Returns: A byte formatted DynamicJsonDocument Object
*/
DynamicJsonDocument encode(std::array<uint32_t, STRING_NUMBER> values)
{
    DynamicJsonDocument doc(1024);
    doc["timestamp"] = millis();
    JsonArray strings = doc.createNestedArray("strings");
    // String JSON Objects
    for (int string = 0; string < STRING_NUMBER; string++)
    {
        JsonObject string_obj = strings.createNestedObject();
        string_obj["name"] = names[string];
        string_obj["value"] = values[string];
        string_obj["pitched"] = string_obj["value"] > VOLTAGE_THRERHOLD ? true : false;
    }
    return doc;
}