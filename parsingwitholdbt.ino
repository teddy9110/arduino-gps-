// This version uses the internal data queing so you can treat it like Serial (kinda)!

#include <SPI.h>
#include "Adafruit_BLE_UART.h"
#include <Adafruit_GPS.h>
#include <SoftwareSerial.h>

// Connect CLK/MISO/MOSI to hardware SPI
// e.g. On UNO & compatible: CLK = 13, MISO = 12, MOSI = 11
#define ADAFRUITBLE_REQ 10
#define ADAFRUITBLE_RDY 2     // This should be an interrupt pin, on Uno thats #2 or #3
#define ADAFRUITBLE_RST 9

Adafruit_BLE_UART BTLEserial = Adafruit_BLE_UART(ADAFRUITBLE_REQ, ADAFRUITBLE_RDY, ADAFRUITBLE_RST);
/**************************************************************************/
SoftwareSerial mySerial(5, 4);
Adafruit_GPS GPS(&mySerial);
#define GPSECHO  false
boolean usingInterrupt = false;
void useInterrupt(boolean); 
bool passive = true;
String s =""; 
  char sendbuffersize=0;
  uint8_t sendbuffer[20];
void setup()
{




  // HC-06 default serial speed for communcation mode is 9600
  //  BTserial.begin(9600);

  Serial.begin(115200);


  BTLEserial.setDeviceName("Unit:01");

  BTLEserial.begin();
  GPS.begin(9600);
  Serial.print("gps on");


  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);


  // Set the update rate
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);   // 1 Hz update rate
  GPS.sendCommand(PGCMD_ANTENNA);
  useInterrupt(true);
  delay(1000);
  mySerial.println(PMTK_Q_RELEASE);
}
SIGNAL(TIMER0_COMPA_vect) {
  char c = GPS.read();
#ifdef UDR0
  if (GPSECHO)
    if (c) UDR0 = c;
#endif
}

void useInterrupt(boolean v) {
  if (v) {
    // Timer0 is already used for millis() - we'll just interrupt somewhere
    // in the middle and call the "Compare A" function above
    OCR0A = 0xAF;
    TIMSK0 |= _BV(OCIE0A);
    usingInterrupt = true;
  } else {
    // do not call the interrupt function COMPA anymore
    TIMSK0 &= ~_BV(OCIE0A);
    usingInterrupt = false;
  }
}

uint32_t timer = millis();
aci_evt_opcode_t laststatus = ACI_EVT_DISCONNECTED;
void loop()
{
  // Tell the nRF8001 to do whatever it should be working on.
  BTLEserial.pollACI();

  // Ask what is our current status
  aci_evt_opcode_t status = BTLEserial.getState();
  // If the status changed....
  if (status != laststatus) {
    // print it out!
    if (status == ACI_EVT_DEVICE_STARTED) {
      Serial.println(F("* Advertising started"));
    }
    if (status == ACI_EVT_CONNECTED) {
      Serial.println(F("* Connected!"));
    }
    if (status == ACI_EVT_DISCONNECTED) {
      Serial.println(F("* Disconnected or advertising timed out"));
    }

    laststatus = status;

    if (! usingInterrupt) {
      // read data from the GPS in the 'main loop'
      char c = GPS.read();
      // if you want to debug, this is a good time to do it!
      if (GPSECHO)
        if (c) Serial.print(c);
    }

    // if a sentence is received, we can check the checksum, parse it...
    if (GPS.newNMEAreceived()) {
      // a tricky thing here is if we print the NMEA sentence, or data
      // we end up not listening and catching other sentences!
      // so be very wary if using OUTPUT_ALLDATA and trytng to print out data
      //Serial.println(GPS.lastNMEA());   // this also sets the newNMEAreceived() flag to false

      if (!GPS.parse(GPS.lastNMEA()))   // this also sets the newNMEAreceived() flag to false
        return;  // we can fail to parse a sentence in which case we should just wait for another
    }

    // if millis() or timer wraps around, we'll just reset it
    if (timer > millis())  timer = millis();

    // approximately every 2 seconds or so, print out the current stats
    if (millis() - timer > 2000) {
      timer = millis(); // reset the timer
      //  delay (20000);



      if (GPS.fix && passive == true ) {

        delay(20000);
        Serial.print("in passive mode");
        Serial.print("Location: ");
        Serial.print(GPS.latitude, 4); Serial.print(GPS.lat);
        Serial.print(", ");
        Serial.print(GPS.longitude, 4); Serial.println(GPS.lon);
        Serial.print("Location (in degrees, works with Google Maps): ");
        Serial.print(GPS.latitudeDegrees, 4);
        Serial.print(", ");
        Serial.println(GPS.longitudeDegrees, 4);

        Serial.print("Speed (knots): "); Serial.println(GPS.speed);
        Serial.print("Altitude: "); Serial.println(GPS.altitude);
        Serial.print("Satellites: "); Serial.println((int)GPS.satellites);
        Serial.print("Angle: "); Serial.println(GPS.angle);

         s = GPS.latitudeDegrees;
          // We need to convert the line to bytes, no more than 20 at this time
        
        s.getBytes(sendbuffer, 20);
        sendbuffersize = min(20, s.length());
            s = GPS.longitudeDegrees;
            
          // We need to convert the line to bytes, no more than 20 at this time
          
        s.getBytes(sendbuffer, 20);
        sendbuffersize = min(20, s.length());


    

        // write the data
        BTLEserial.write(sendbuffer, sendbuffersize);


      } else {


        Serial.print("in active mode");
        Serial.print("Location: ");
        Serial.print(GPS.latitude, 4); Serial.print(GPS.lat);
        Serial.print(", ");
        Serial.print(GPS.longitude, 4); Serial.println(GPS.lon);
        Serial.print("Location (in degrees, works with Google Maps): ");
        Serial.print(GPS.latitudeDegrees, 4);
        Serial.print(", ");
        Serial.println(GPS.longitudeDegrees, 4);

        Serial.print("Speed (knots): "); Serial.println(GPS.speed);
        Serial.print("Altitude: "); Serial.println(GPS.altitude);
        Serial.print("Satellites: "); Serial.println((int)GPS.satellites);
        Serial.print("Angle: "); Serial.println(GPS.angle);

        


      }
    }
  }
}
