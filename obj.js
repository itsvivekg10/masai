const user = { id: 123, profile: { name: "John Doe", address: {} } };

let result = `User ${user?.profile?.name} ("ID" : ${user?.id} ) lives in ${
  user?.profile?.address?.city ?? "information not available"
} (ZIPCODE :${user?.profile?.address?.zipcode ?? "info is not avail"})`;
console.log(result);
