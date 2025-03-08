function data() {
  return new Promise((res, rej) => {
    const success = false;
    if (success) {
      res("this is data");
    } else {
      rej("you get an error");
    }
  });
}
data()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
