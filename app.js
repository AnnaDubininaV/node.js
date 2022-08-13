const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./utils/database');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// registers a middleware function for incoming requests
app.use((req, res, next) => {
  User.findById('62f6894447e5e5e94c1311e9')
    .then(({ name, email, cart, _id }) => {
      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
