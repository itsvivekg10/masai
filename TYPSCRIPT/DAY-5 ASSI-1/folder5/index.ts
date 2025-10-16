
interface LightState {
  turnOn(context: SmartLight): void;
  turnOff(context: SmartLight): void;
  detectMotion(context: SmartLight): void;
  adjustBrightness(context: SmartLight, isDaytime: boolean): void;
  getName(): string;
}


class OffState implements LightState {
  turnOn(context: SmartLight): void {
    console.log("💡 Light turned ON manually.");
    context.setState(new OnState());
  }

  turnOff(context: SmartLight): void {
    console.log("❌ Light is already OFF.");
  }

  detectMotion(context: SmartLight): void {
    console.log("👀 Motion detected! Turning light ON automatically.");
    context.setState(new MotionDetectionState());
  }

  adjustBrightness(context: SmartLight, isDaytime: boolean): void {
    console.log("⚙️ Can't adjust brightness — light is OFF.");
  }

  getName(): string {
    return "Off";
  }
}


class OnState implements LightState {
  turnOn(context: SmartLight): void {
    console.log("❌ Light is already ON.");
  }

  turnOff(context: SmartLight): void {
    console.log("💡 Light turned OFF manually.");
    context.setState(new OffState());
  }

  detectMotion(context: SmartLight): void {
    console.log("👀 Motion ignored — light is already ON manually.");
  }

  adjustBrightness(context: SmartLight, isDaytime: boolean): void {
    console.log("🔆 Adjusting brightness based on ambient light...");
    context.setState(new BrightnessAdjustmentState(isDaytime));
  }

  getName(): string {
    return "On";
  }
}


class MotionDetectionState implements LightState {
  turnOn(context: SmartLight): void {
    console.log("❌ Light is already ON due to motion.");
  }

  turnOff(context: SmartLight): void {
    console.log("💡 Turning OFF light after motion event.");
    context.setState(new OffState());
  }

  detectMotion(context: SmartLight): void {
    console.log("👀 Motion already detected — light remains ON.");
  }

  adjustBrightness(context: SmartLight, isDaytime: boolean): void {
    console.log("🔆 Adjusting brightness for motion-detected light...");
    context.setState(new BrightnessAdjustmentState(isDaytime));
  }

  getName(): string {
    return "MotionDetection";
  }
}

class BrightnessAdjustmentState implements LightState {
  private isDaytime: boolean;

  constructor(isDaytime: boolean) {
    this.isDaytime = isDaytime;
  }

  turnOn(context: SmartLight): void {
    console.log("💡 Light already ON (auto-adjusted).");
  }

  turnOff(context: SmartLight): void {
    console.log("💡 Turning OFF light after brightness adjustment.");
    context.setState(new OffState());
  }

  detectMotion(context: SmartLight): void {
    console.log("👀 Motion detected again — keeping adjusted brightness.");
  }

  adjustBrightness(context: SmartLight, isDaytime: boolean): void {
    this.isDaytime = isDaytime;
    if (this.isDaytime) {
      console.log("🌞 Daytime detected — reducing brightness to 50%.");
    } else {
      console.log("🌙 Nighttime detected — increasing brightness to 100%.");
    }
  }

  getName(): string {
    return "BrightnessAdjustment";
  }
}


class SmartLight {
  private currentState: LightState;

  constructor() {
    this.currentState = new OffState(); 
  }

  setState(state: LightState): void {
    this.currentState = state;
  }

  turnOn(): void {
    this.currentState.turnOn(this);
  }

  turnOff(): void {
    this.currentState.turnOff(this);
  }

  detectMotion(): void {
    this.currentState.detectMotion(this);
  }

  adjustBrightness(isDaytime: boolean): void {
    this.currentState.adjustBrightness(this, isDaytime);
  }

  showState(): void {
    console.log(`💡 Current State: ${this.currentState.getName()}`);
  }
}

const smartLight = new SmartLight();

smartLight.showState();
smartLight.detectMotion(); 
smartLight.showState();
smartLight.adjustBrightness(true); 
smartLight.showState();
smartLight.turnOff(); 
smartLight.showState();
smartLight.turnOn(); 
smartLight.showState();
smartLight.adjustBrightness(false); 
smartLight.showState();
