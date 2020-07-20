// import 'onoff' package
const { Gpio } = require( 'onoff' );

const { env } = require('process');
let self;

const gi = require('node-gtk');
Fin = gi.require('Fin', '0.2');
const fin = new Fin.Client()
const fs = require('fs');
const BALENA_FIN_REVISION = fin.revision;

// configure LED pins
// set defaults
const redPath = '/sys/class/leds/pca963x:red/brightness';
const greenPath = '/sys/class/leds/pca963x:green/brightness';
const bluePath = '/sys/class/leds/pca963x:blue/brightness';
// var red_gpio = env.LED_RED_GPIO;
// if (!red_gpio) {
//   red_gpio = 26;
// }

// var yellow_gpio = env.LED_YELLOW_GPIO;
// if (!yellow_gpio) {
//   yellow_gpio = 19;
// }

// var green_gpio = env.LED_GREEN_GPIO;
// if (!green_gpio) {
//   green_gpio = 13;
// }

var buzz_gpio = env.LED_BUZZ_GPIO;
if (!buzz_gpio) {
  buzz_gpio = 6;
}

// const pin_red = new Gpio( red_gpio, 'out' );
// const pin_yellow = new Gpio( yellow_gpio, 'out' );
// const pin_green = new Gpio( green_gpio, 'out' );
const pin_buzz = new Gpio( buzz_gpio, 'out' );

 // Define how the requested colors will control each LED
 this.colors = {
  "red": [1, 0, 0],
  "yellow": [1, 1, 0],
  "purple": [1, 0, 1],
  "green": [0, 1, 0],
  "cyan": [0, 1, 1],
  "white": [1, 1, 1],
  "blue": [0, 0, 1],
  "black": [0, 0, 0],
};

 // set to logic level that turns on LEDs
var my_high = Gpio.LOW;
var my_low = Gpio.HIGH;
if (env.LED_RELAY_HIGH == 1) {
  my_high = Gpio.HIGH;
  my_low = Gpio.LOW;
} 
const pin_high = my_high;
const pin_low = my_low;

// change LED state
let color = function(color) {
  return new Promise((resolve, reject) => {
    if (self.colors.hasOwnProperty(color)) {
      self.reset();

        fs.writeFileSync(self.redPath, self.colors[color][0]*255);
        fs.writeFileSync(self.greenPath, self.colors[color][1]*255);
        fs.writeFileSync(self.bluePath, self.colors[color][2]*255);
      
      resolve(color);
    } else {
      reject("The requested color:" + color + " is not supported.");
    }
  });
};
let reset = function() {
  fs.writeFileSync(self.redPath, 0);
  fs.writeFileSync(self.greenPath, 0);
  fs.writeFileSync(self.bluePath, 0);
 
};
const pin_red = color("red")
const pin_green = color("green")
const pin_yellow = color("yellow")
const led_bal = color("blue")

exports.toggle = ( c, b ) => {

  pin_buzz.writeSync( b ? pin_high : pin_low );

  if( c == 'r') {
    led_bal = pin_red
    // pin_red.writeSync( pin_high );
    // sleep(500);
    // pin_red.writeSync( pin_low );
    // sleep(500);
    // pin_red.writeSync( pin_high );
    // sleep(500);
    // pin_red.writeSync( pin_low );
    // sleep(500);
    // pin_red.writeSync( pin_high );
    // pin_yellow.writeSync( pin_low );
    // pin_green.writeSync(  pin_low );
  }

  if( c == 'y') { 
    led_bal = pin_yellow
    // pin_yellow.writeSync( pin_high );
    // sleep(500);
    // pin_yellow.writeSync( pin_low );
    // sleep(500);
    // pin_yellow.writeSync( pin_high );
    // sleep(500);
    // pin_yellow.writeSync( pin_low );
    // sleep(500);
    // pin_yellow.writeSync( pin_high );
    // pin_red.writeSync( pin_low );
    // pin_green.writeSync( pin_low );
  }
    
  if( c == 'g') { 
    led_bal = pin_green
    // pin_red.writeSync( pin_low );
    // pin_yellow.writeSync( pin_low );
    // pin_green.writeSync( pin_high );
    // sleep(1000);
  }

  pin_buzz.writeSync(1);

};

// read LED states
exports.red_led_state = ( ) => {


  return myXNOR(pin_high, led_bal.readFileSync());

};

exports.yellow_led_state = ( ) => {
  
  return myXNOR(pin_high, led_bal.readFileSync());

};

exports.green_led_state = ( ) => {
  
  return myXNOR(pin_high, led_bal.readFileSync());

};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// simple exclusive NOR function
function myXNOR(a,b) {
  return ( a === b );
}
