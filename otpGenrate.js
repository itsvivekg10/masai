function createOtpSystem() {
  let flag = false;
  let otp = 4;
  return {
    generateOtp: function () {
      data = Math.random(otp) * 10000;
      otp = Math.trunc(data);
      flag = true;
    },
    getOtp: function () {
      if (flag === false) {
        console.log("OTP expired");
      } else {
        console.log(otp);
      }
      flag = false;
    },
  };
}
let OTP = createOtpSystem();
OTP.generateOtp();
OTP.getOtp();
OTP.getOtp();
OTP.generateOtp();
OTP.getOtp();
