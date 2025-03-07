function countDown() {
  let count = prompt("enter");
  let intervalId = setInterval(() => {
    count--;
    console.log(count);
    if (count == 0) {
      clearInterval(intervalId);
      console.log("countDown complete");
    }
  }, 1000);
}

setTimeout(() => {
  countDown();
}, 100);
