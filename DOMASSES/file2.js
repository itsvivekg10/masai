console.log("hellow ");
let para = document.getElementById("para-box");
let add = document.getElementById("add_button");
let remove = document.getElementById("remove");
add.addEventListener("click", () => {
  para.innerText = "This is new para graph";
});
remove.addEventListener("click", () => {
  para.remove();
});
