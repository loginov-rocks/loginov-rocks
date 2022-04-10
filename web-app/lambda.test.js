require('dotenv').config();

const { handler } = require('./lambda');

handler()
  .then((result) => {
    console.log('Result:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
