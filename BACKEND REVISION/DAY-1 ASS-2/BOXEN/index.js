    const boxen = require('boxen');

const title = 'Hurray!!!';
const message = 'I am using my first external module!';

const classicBox = boxen(message, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: 'classic',
});

const singleDoubleBox = boxen(message, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: 'singleDouble',
});

const roundBox = boxen(message, {
  title,
  padding: 1,
  margin: 1,
  borderStyle: 'round',
});

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
