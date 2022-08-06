const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

// define existing models
const Product = require('./models/product');
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
  User.findByPk(1)
    .then((user) => {
      // at this point user is sequelized object with all sequelise methodth in it
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorController.get404);

// relate models (user that created a product)
// second arg - how this relation should be managed
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// npm start - runs the following lines
sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    // if !user we create dummy user
    if (!user) {
      User.create({ name: 'Ana', email: 'test@test,com' });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
