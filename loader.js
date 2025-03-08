function loader() {
  let count = 0;
  let intervalid = setInterval(() => {
    console.log("loading");
    count++;
    if (count == 5) {
      console.log("loading complete");
      clearInterval(intervalid);
    }
  }, 1000);
}

loader();
