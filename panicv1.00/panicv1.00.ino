// Test code for Adafruit GPS modules using MTK3329/MTK3339 driver
//
// This code shows how to listen to the GPS module in an interrupt
// which allows the program to have more 'freedom' - just parse
// when a new NMEA sentence is available! Then access data when
// desired.
//
// Tested and works great with the Adafruit Ultimate GPS module
// using MTK33x9 chipset
//    ------> http://www.adafruit.com/products/746
// Pick one up today at the Adafruit electronics shop
// and help support open source hardware & software! -ada

#include <Adafruit_GPS.h>
#include <SoftwareSerial.h>
int interruptPin = 3;
 int state = 0 ;
String Reset = " ";
SoftwareSerial mySerial(6, 2);
SoftwareSerial BTserial(5, 4);

char c = ' ';
Adafruit_GPS GPS(&mySerial);

#define GPSECHO  false

// this keeps track of whether we're using the interrupt
// off by default!
boolean usingInterrupt = false;
void useInterrupt(boolean); // Func prototype keeps Arduino 0023 happy

void setup()
{
   
  pinMode(7, OUTPUT);
  pinMode(8,OUTPUT);  
    Startup();
    
  
}

void Startup(){
  digitalWrite(7, HIGH);
 
 Serial.println (state);
  delay(1000);
  digitalWrite(7, LOW);

  digitalWrite(8,HIGH);
  attachInterrupt(digitalPinToInterrupt(3), panic, RISING);

  Serial.begin(115200);
   Serial.println (state);
  BTserial.begin(9600);
 
  GPS.begin(9600);
  
  Serial.print("gps on");
   Serial.println (state);
  BTserial.println("gps on ");

  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
 
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);

  GPS.sendCommand(PGCMD_ANTENNA);

    Serial.println (state); 
  useInterrupt(true);

  delay(1000);
  // Ask for firmware version
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
    
    OCR0A = 0xAF;
    TIMSK0 |= _BV(OCIE0A);
    usingInterrupt = true;
  } else {
 
    TIMSK0 &= ~_BV(OCIE0A);
    usingInterrupt = false;
  }
}

uint32_t timer = millis();
void loop()                
{



  Reset = BTserial.read();
          if (Reset == "stop"){
              state = false; 
            }

  if (! usingInterrupt) {
   
    char c = GPS.read();
  
    if (GPSECHO)
      if (c) Serial.print(c);
  }

 
  if (GPS.newNMEAreceived()) {


    if (!GPS.parse(GPS.lastNMEA()))  
      return;  
  }

 
  if (timer > millis())  timer = millis();

 
  if (millis() - timer > 2000) {
    timer = millis(); // reset the timer
     Serial.println(state);
 
        if (!GPS.fix) {
      BTserial.println("no location yet ");
      BTserial.println(state);
      
    }
    
   
    if (GPS.fix) {
      BTserial.println("fix aquired");

      digitalWrite(7, HIGH);
      delay(5000);
      digitalWrite(7, LOW);
     
      // sets the LED on
      
       if (state == false){
      BTserial.println("gps data");
      BTserial.println("      ");
      BTserial.println(GPS.latitudeDegrees, 4);
      BTserial.println(GPS.longitudeDegrees, 4);
     
       }else{
       
        BTserial.println(GPS.latitudeDegrees, 8);
        BTserial.println(GPS.longitudeDegrees, 8);
        BTserial.println(state);
      
     
      }
    }
  }
}

void panic() {
 
  state = state + 1  ;
  
}


