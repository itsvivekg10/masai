console.log("Begin");
setTimeout(() => {
  console.log("Timeout Task");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise Task");
});
console.log("End");
// there is no issue in this code her it will print the begin then end and then promise task and then timeout task
