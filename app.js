const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// registers a middleware function for incoming requests
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     // at this point user is sequelized object with all sequelise methodth in it
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

// app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
