async function UserData() {
  try {
    let api = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await api.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
