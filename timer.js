function timer() {
  let duration = prompt("enter");
  let intervalId = setInterval(() => {
    duration--;
    console.log(duration);
    if (duration == 0) {
      clearInterval(intervalId);
      console.log("countDown complete");
    }
  }, 1000);
}

setTimeout(() => {
  timer();
}, 100);
