function manageStudents(user, checkUser) {
  let students = ["Alice", "Bob", "Charlie"];

  // Add "David" at index 1
  students.splice(1, 0, user);

  // Check if "Eve" is in the list
  console.log(students.includes(checkUser)); // Should return false

  // Convert the array to a string with names separated by commas
  console.log(students.join(",")); // Expected: "Alice,David,Bob,Charlie"
}

manageStudents("David", "David");
