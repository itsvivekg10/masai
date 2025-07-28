let user = { name: "Alice", role: "atul", active: true };

function userRole(user) {
  // console.log(user.role==="admin"||user.role==="user")
  let acsess =
    (user.role === "admin" || user.role === "user") && user.active === true
      ? `${user.role} acsess Granted`
      : `${user.role} acsess revoked`;
  return acsess;
}
console.log(userRole(user));
