// Step 1: Define Observer interface
interface Observer {
  update(): void;
}

// Step 2: Implement Smartphone and Tablet classes
class Smartphone implements Observer {
  update(): void {
    console.log("Smartphone received notification");
  }
}

class Tablet implements Observer {
  update(): void {
    console.log("Tablet received notification");
  }
}

// Step 3: Create NotificationCenter (Subject)
class NotificationCenter {
  private observers: Observer[] = [];

  // Method to add observers
  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log(`Observer added: ${observer.constructor.name}`);
  }

  // Method to remove observers
  detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
    console.log(`Observer removed: ${observer.constructor.name}`);
  }

  // Method to notify all observers
  notify(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}

// Step 4: Test
const notificationCenter = new NotificationCenter();

const smartphone = new Smartphone();
const tablet = new Tablet();

// Subscribing observers
notificationCenter.attach(smartphone);
notificationCenter.attach(tablet);

// Sending notification to all observers
notificationCenter.notify();
