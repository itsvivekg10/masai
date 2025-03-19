async function dataFetch() {
  try {
    let data = await fetch("https://fakestoreapi.com/products");
    let dataRes = await data.json();
    console.log(dataRes);
  } catch (error) {
    console.log(error);
  }
}
dataFetch();
