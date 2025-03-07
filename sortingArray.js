function sortNames(namesArray) {
  let result = namesArray.sort((a, b) => a.localeCompare(b));
  return result;
}
console.log(sortNames(["charlie", "alice", "bob"]));
