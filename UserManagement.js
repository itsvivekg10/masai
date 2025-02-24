let person = { role: "xyz", experience: 7, active: true, department: "clds" };

function adminAcsess(person) {
  let acsess =
    person.role === "Admin" ||
    person.role === "Manager" ||
    person.role === "User"
      ? person.role === "User"
        ? person.active === true && person.department === "Support"
          ? `Priority support acesss`
          : person.active === true
          ? "UserAcsess"
          : "User Acsess Revoked"
        : person.role === "Admin"
        ? person.experience >= 5 &&
          person.active === true &&
          person.department === "IT"
          ? `full IT ${person.role} Acsess`
          : person.experience >= 5 &&
            person.active === true &&
            person.department === "Marketing"
          ? `full general ${person.role} Acsess`
          : person.experince <= 5 && person.active === true
          ? `${person.role} limited acsee`
          : "no acsees"
        : person.experinece >= 3 &&
          person.active === true &&
          person.department === "sales"
        ? `full sales ${person.role} Acsess`
        : person.experience >= 3 && person.active === true
        ? `full  ${person.role} Acsess`
        : person.experience <= 3 && person.active === true
        ? `${person.role} limited acsee`
        : "no acsees in management"
      : "You are not authorized";
  console.log(acsess);
}
adminAcsess(person);
