const people = [
  {
    name: "Alice",
    address: { city: "New York", street: { name: "Broadway", number: 123 } },
  },
  {
    name: "Bob",
    address: {
      city: "Los Angeles",
      street: { name: "Sunset Boulevard", number: 456 },
    },
  },
];

const sentence = function (people) {
  let blankArr = [];
  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    let result = `${person?.name} is from ${person?.address?.city} ${person?.address?.street?.name} ${person?.address?.street?.number}`;
    blankArr.push(result);
  }
  console.log(blankArr);
};

sentence(people);
