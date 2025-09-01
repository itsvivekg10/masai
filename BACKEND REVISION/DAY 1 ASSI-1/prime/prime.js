function prime(n) {
  if (n < 2) {
    return "This is not prime";
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return "This is not prime";
    }
  }

  return "This is prime";
}
module.exports = prime