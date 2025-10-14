
class State {
  turnOn(light) {
    console.log("Action not allowed in current state");
  }
  turnOff(light) {
    console.log("Action not allowed in current state");
  }
  motionDetected(light) {
    console.log("Action not allowed in current state");
  }
  adjustBrightness(light, isDaytime) {
    console.log("Action not allowed in current state");
  }
}


class OffState extends State {
  turnOn(light) {
    console.log("Light turned ON manually.");
    light.setState(light.onState);
  }
  motionDetected(light) {
    console.log("Motion detected! Light turns ON automatically.");
    light.setState(light.motionDetectedState);
  }
}
class OnState extends State {
  turnOff(light) {
    console.log("Light turned OFF.");
    light.setState(light.offState);
  }
  adjustBrightness(light, isDaytime) {
    console.log(`Adjusting brightness. Daytime: ${isDaytime ? "Reduce" : "Increase"} brightness.`);
    light.setState(light.brightnessAdjustmentState);
  }
}

class MotionDetectedState extends State {
  turnOff(light) {
    console.log("Light turned OFF.");
    light.setState(light.offState);
  }
  adjustBrightness(light, isDaytime) {
    console.log(`Adjusting brightness due to motion. Daytime: ${isDaytime ? "Reduce" : "Increase"} brightness.`);
    light.setState(light.brightnessAdjustmentState);
  }
}


class BrightnessAdjustmentState extends State {
  turnOff(light) {
    console.log("Light turned OFF.");
    light.setState(light.offState);
  }
  turnOn(light) {
    console.log("Light turned ON manually.");
    light.setState(light.onState);
  }
}


class SmartLight {
  constructor() {
    this.offState = new OffState();
    this.onState = new OnState();
    this.motionDetectedState = new MotionDetectedState();
    this.brightnessAdjustmentState = new BrightnessAdjustmentState();

    this.state = this.offState; 
  }

  setState(state) {
    this.state = state;
  }

  turnOn() {
    this.state.turnOn(this);
  }

  turnOff() {
    this.state.turnOff(this);
  }

  motionDetected() {
    this.state.motionDetected(this);
  }

  adjustBrightness(isDaytime) {
    this.state.adjustBrightness(this, isDaytime);
  }
}
const light = new SmartLight();

light.turnOn();          
light.adjustBrightness(true); 
light.turnOff();         
light.motionDetected();   
light.adjustBrightness(false); 
light.turnOff();          
