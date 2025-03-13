// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function createOtpSystem() {
  let flag = false;
  let otp = 4;
  return {
    generateOtp: function () {
      data = Math.random(otp) * 10000;
      otp = Math.trunc(data);
      flag = true;
      return `Your Otp is ${otp}`;
    },
    getOtp: function () {
      if (flag === false) {
        //console.log("OTP expired"); /// Return message
        return `Otp Expired`;
      } else {
        //console.log(otp); // Return Otp
        flag = false;
        return otp;
      }
    },
  };
}
let OTP = createOtpSystem();
console.log(OTP.generateOtp());
console.log(OTP.getOtp());
console.log(OTP.getOtp());
console.log(OTP.generateOtp());
console.log(OTP.getOtp());
