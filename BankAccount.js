function createBankAccount(amount) {
  let bankBalance = amount;

  return {
    Deposit: function (dpAmount) {
      bankBalance = bankBalance + dpAmount;
      console.log("Total Deposited :", bankBalance);
    },
    withDrawn: function (wdAmount) {
      if (bankBalance > wdAmount) {
        bankBalance = bankBalance - wdAmount;
        console.log("Reamaining amount :", bankBalance);
      } else {
        console.log("Insuficinet Amount");
      }
    },
    getBalance: function () {
      console.log("Total Balnace :", bankBalance);
    },
  };
}
let myAccount = createBankAccount(1000);
myAccount.Deposit(5000);
myAccount.withDrawn(200);
myAccount.getBalance();
