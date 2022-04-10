require('dotenv').config();

const { handler } = require('./index');

handler()
  .then((result) => {
    console.log('Result:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
