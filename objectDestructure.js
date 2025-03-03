let Input = [
  { name: "Alice", tasksCompleted: 8, rating: 4.7 },

  { name: "Bob", tasksCompleted: 4, rating: 4.0 },

  { name: "Charlie", tasksCompleted: 6, rating: 3.5 },

  { name: "David", tasksCompleted: 10, rating: 4.9 },

  { name: "Eve", tasksCompleted: 7, rating: 2.8 },
];

const dataFilter = () => {
  let filterData = Input.filter((ele, i) => {
    return ele.tasksCompleted >= 6 && ele.rating >= 3.5;
  });
  let sortRes = filterData.sort((a, b) => {
    return b.rating - a.rating;
  });

  let mapRes = sortRes.map(({ name, rating }) => ({
    name,
    performance: rating > 4 ? "Excelent" : "Good",
  }));
  console.log(mapRes);
};
