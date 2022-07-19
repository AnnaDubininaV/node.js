const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('first middlewar!!');
  res.send('<h1>Users route!!!</h1>');
});

app.use('/', (req, res, next) => {
  console.log('second middlewar!!');
  res.send('<h1>Default route!!!</h1>');
});

app.listen(3000);
