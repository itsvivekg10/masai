var OffState = /** @class */ (function () {
    function OffState() {
    }
    OffState.prototype.turnOn = function (context) {
        console.log("💡 Light turned ON manually.");
        context.setState(new OnState());
    };
    OffState.prototype.turnOff = function (context) {
        console.log("❌ Light is already OFF.");
    };
    OffState.prototype.detectMotion = function (context) {
        console.log("👀 Motion detected! Turning light ON automatically.");
        context.setState(new MotionDetectionState());
    };
    OffState.prototype.adjustBrightness = function (context, isDaytime) {
        console.log("⚙️ Can't adjust brightness — light is OFF.");
    };
    OffState.prototype.getName = function () {
        return "Off";
    };
    return OffState;
}());
var OnState = /** @class */ (function () {
    function OnState() {
    }
    OnState.prototype.turnOn = function (context) {
        console.log("❌ Light is already ON.");
    };
    OnState.prototype.turnOff = function (context) {
        console.log("💡 Light turned OFF manually.");
        context.setState(new OffState());
    };
    OnState.prototype.detectMotion = function (context) {
        console.log("👀 Motion ignored — light is already ON manually.");
    };
    OnState.prototype.adjustBrightness = function (context, isDaytime) {
        console.log("🔆 Adjusting brightness based on ambient light...");
        context.setState(new BrightnessAdjustmentState(isDaytime));
    };
    OnState.prototype.getName = function () {
        return "On";
    };
    return OnState;
}());
var MotionDetectionState = /** @class */ (function () {
    function MotionDetectionState() {
    }
    MotionDetectionState.prototype.turnOn = function (context) {
        console.log("❌ Light is already ON due to motion.");
    };
    MotionDetectionState.prototype.turnOff = function (context) {
        console.log("💡 Turning OFF light after motion event.");
        context.setState(new OffState());
    };
    MotionDetectionState.prototype.detectMotion = function (context) {
        console.log("👀 Motion already detected — light remains ON.");
    };
    MotionDetectionState.prototype.adjustBrightness = function (context, isDaytime) {
        console.log("🔆 Adjusting brightness for motion-detected light...");
        context.setState(new BrightnessAdjustmentState(isDaytime));
    };
    MotionDetectionState.prototype.getName = function () {
        return "MotionDetection";
    };
    return MotionDetectionState;
}());
var BrightnessAdjustmentState = /** @class */ (function () {
    function BrightnessAdjustmentState(isDaytime) {
        this.isDaytime = isDaytime;
    }
    BrightnessAdjustmentState.prototype.turnOn = function (context) {
        console.log("💡 Light already ON (auto-adjusted).");
    };
    BrightnessAdjustmentState.prototype.turnOff = function (context) {
        console.log("💡 Turning OFF light after brightness adjustment.");
        context.setState(new OffState());
    };
    BrightnessAdjustmentState.prototype.detectMotion = function (context) {
        console.log("👀 Motion detected again — keeping adjusted brightness.");
    };
    BrightnessAdjustmentState.prototype.adjustBrightness = function (context, isDaytime) {
        this.isDaytime = isDaytime;
        if (this.isDaytime) {
            console.log("🌞 Daytime detected — reducing brightness to 50%.");
        }
        else {
            console.log("🌙 Nighttime detected — increasing brightness to 100%.");
        }
    };
    BrightnessAdjustmentState.prototype.getName = function () {
        return "BrightnessAdjustment";
    };
    return BrightnessAdjustmentState;
}());
var SmartLight = /** @class */ (function () {
    function SmartLight() {
        this.currentState = new OffState();
    }
    SmartLight.prototype.setState = function (state) {
        this.currentState = state;
    };
    SmartLight.prototype.turnOn = function () {
        this.currentState.turnOn(this);
    };
    SmartLight.prototype.turnOff = function () {
        this.currentState.turnOff(this);
    };
    SmartLight.prototype.detectMotion = function () {
        this.currentState.detectMotion(this);
    };
    SmartLight.prototype.adjustBrightness = function (isDaytime) {
        this.currentState.adjustBrightness(this, isDaytime);
    };
    SmartLight.prototype.showState = function () {
        console.log("\uD83D\uDCA1 Current State: ".concat(this.currentState.getName()));
    };
    return SmartLight;
}());
var smartLight = new SmartLight();
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
