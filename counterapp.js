function countDown() {
  let count = 10;
  let intervalId = setInterval(() => {
    console.log(count);
    count--;

    if (count == 0) {
      clearInterval(intervalId);
      console.log("TimerFinshed");
    }
  }, 1000);
}
setTimeout(() => {
  countDown();
}, 1000);
