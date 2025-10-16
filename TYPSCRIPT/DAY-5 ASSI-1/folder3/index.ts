
interface State {
  play(context: MediaPlayer): void;
  pause(context: MediaPlayer): void;
  stop(context: MediaPlayer): void;
  getName(): string;
}


class PlayState implements State {
  play(context: MediaPlayer): void {
    console.log("▶️ Already playing media.");
  }
  pause(context: MediaPlayer): void {
    console.log("⏸️ Media paused.");
    context.setState(new PauseState());
  }
  stop(context: MediaPlayer): void {
    console.log("⏹️ Media stopped.");
    context.setState(new StopState());
  }
  getName(): string {
    return "Play";
  }
}

class PauseState implements State {
  play(context: MediaPlayer): void {
    console.log("▶️ Resuming media from pause.");
    context.setState(new PlayState());
  }
  pause(context: MediaPlayer): void {
    console.log("⏸️ Already paused.");
  }
  stop(context: MediaPlayer): void {
    console.log("⏹️ Media stopped from pause.");
    context.setState(new StopState());
  }
  getName(): string {
    return "Pause";
  }
}

class StopState implements State {
  play(context: MediaPlayer): void {
    console.log("▶️ Starting media from beginning.");
    context.setState(new PlayState());
  }
  pause(context: MediaPlayer): void {
    console.log("⏸️ Can't pause. Media is stopped.");
  }
  stop(context: MediaPlayer): void {
    console.log("⏹️ Already stopped.");
  }
  getName(): string {
    return "Stop";
  }
}

class MediaPlayer {
  private currentState: State;

  constructor() {
    this.currentState = new StopState();
  }

  setState(state: State): void {
    this.currentState = state;
  }

  play(): void {
    this.currentState.play(this);
  }

  pause(): void {
    this.currentState.pause(this);
  }

  stop(): void {
    this.currentState.stop(this);
  }

  showState(): void {
    console.log(`🎵 Current State: ${this.currentState.getName()}`);
  }
}


const player = new MediaPlayer();

player.showState();
player.play(); 
player.showState();

player.pause(); 
player.showState();

player.play(); 
player.showState();

player.stop(); 

player.pause(); 
player.showState();
