let arr = [];

function add(ele) {
  arr.push(ele);
}
add("chemist");
add("poshe");
add("lllll");
function remove(arr, name) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === name) {
      console.log(arr[i]);
      delete arr[i];
      //   arr.pop(i)
      //   delete arr[i]
    }
  }
}
remove(arr, "poshe");
function searchbook(name) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === name) {
      console.log(arr[i]);
    } else {
      console.log("not find");
    }
  }
}
searchbook("chemist");
console.log(arr);
