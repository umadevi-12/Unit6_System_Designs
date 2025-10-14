
class State {
  next(light) {
    console.log("Action not allowed in current state");
  }
}

class RedState extends State {
  next(light) {
    console.log("Red Light → Vehicles must stop");
    console.log("Switching to Green Light");
    light.setState(light.greenState);
  }
}


class GreenState extends State {
  next(light) {
    console.log("Green Light → Vehicles can move");
    console.log("Switching to Yellow Light");
    light.setState(light.yellowState);
  }
}


class YellowState extends State {
  next(light) {
    console.log("Yellow Light → Vehicles should slow down");
    console.log("Switching to Red Light");
    light.setState(light.redState);
  }
}


class TrafficLight {
  constructor() {
    this.redState = new RedState();
    this.yellowState = new YellowState();
    this.greenState = new GreenState();

    this.state = this.redState; 
  }

  setState(state) {
    this.state = state;
  }

  change() {
    this.state.next(this);
  }
}


const light = new TrafficLight();


for (let i = 0; i < 6; i++) {
  light.change();
  console.log("------");
}
