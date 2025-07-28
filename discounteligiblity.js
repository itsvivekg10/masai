function discountApp(age) {
  let result =
    age <= 0
      ? "invalid input"
      : age >= 60
      ? "eligible for the descount"
      : "not eligible";
  console.log(result);
}
discountApp(0);
