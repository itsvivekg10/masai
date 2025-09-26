const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("userLoggedIn", (username) => {
  console.log(`> User ${username} logged in`);
});

eventEmitter.on("userLoggedIn", (username) => {
  console.log(`> Notification sent to ${username}`);
});

eventEmitter.on("messageReceived", (from, message) => {
  console.log(`> New message from ${from}: "${message}"`);
});


eventEmitter.on("dataSynced", (username) => {
  console.log(`> Data sync complete for ${username}`);
});


function simulateAppFlow() {
  const username = "John";

  setTimeout(() => {
    eventEmitter.emit("userLoggedIn", username);

    setTimeout(() => {
      eventEmitter.emit("messageReceived", "Alice", "Hey John, welcome back!");


      console.log("> Syncing user data...");
      setTimeout(() => {
        eventEmitter.emit("dataSynced", username);
      }, 1500);

    }, 1000);
  }, 1000);
}


simulateAppFlow();
