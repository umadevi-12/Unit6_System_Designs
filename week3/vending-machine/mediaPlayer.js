
class State {
  play(player) {
    console.log("Action not allowed in current state");
  }
  pause(player) {
    console.log("Action not allowed in current state");
  }
  stop(player) {
    console.log("Action not allowed in current state");
  }
}

class PlayState extends State {
  play(player) {
    console.log("Already playing media...");
  }
  pause(player) {
    console.log("Pausing media...");
    player.setState(player.pauseState);
  }
  stop(player) {
    console.log("Stopping media...");
    player.setState(player.stopState);
  }
}


class PauseState extends State {
  play(player) {
    console.log("Resuming media...");
    player.setState(player.playState);
  }
  pause(player) {
    console.log("Already paused.");
  }
  stop(player) {
    console.log("Stopping media...");
    player.setState(player.stopState);
  }
}

class StopState extends State {
  play(player) {
    console.log("Playing media from beginning...");
    player.setState(player.playState);
  }
  pause(player) {
    console.log("Cannot pause. Media is stopped.");
  }
  stop(player) {
    console.log("Media is already stopped.");
  }
}

class MediaPlayer {
  constructor() {
    this.playState = new PlayState();
    this.pauseState = new PauseState();
    this.stopState = new StopState();

    this.state = this.stopState; 
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play(this);
  }

  pause() {
    this.state.pause(this);
  }

  stop() {
    this.state.stop(this);
  }
}

const player = new MediaPlayer();

player.play();   
player.play();   
player.pause();  
player.pause();  
player.play();  
player.stop();   
player.pause();  
player.play();   
