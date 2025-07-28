function createBankAccount(v) {
  let amount = v;

  return {
    deposit: function (depoAmount) {
      amount = amount + depoAmount;
      return amount;
    },

    withdraw: function (withdrawA) {
      if (amount > withdrawA) {
        amount = amount - withdrawA;
        return amount;
      } else {
        console.log("invalid maount");
      }
    },
  };
  console.log("this is total Amount", amount);
}
let cash = createBankAccount(100);
console.log(cash.deposit(800));
console.log(cash.withdraw(8));
